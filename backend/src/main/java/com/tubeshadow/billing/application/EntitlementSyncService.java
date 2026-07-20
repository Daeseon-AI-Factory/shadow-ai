package com.tubeshadow.billing.application;

import com.tubeshadow.billing.application.BillingEntitlementProvider.CapabilityGrant;
import com.tubeshadow.billing.application.BillingEntitlementProvider.ProviderSnapshot;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Instant;
import java.util.UUID;

/**
 * Applies a fetched {@link ProviderSnapshot} to {@code user_entitlements} (docs/MONETIZATION-DESIGN.md
 * §6.1, §8.2). The Mimi user id IS the RevenueCat App User ID (§5.2) — no separate mapping table.
 *
 * <p>Writes go through a single atomic {@code INSERT ... ON CONFLICT ... DO UPDATE ... WHERE}
 * statement, deliberately NOT a JPA find-then-save. Two concurrent snapshot applications for a
 * capability with no existing row yet (e.g. RevenueCat redelivering the same event on two
 * in-flight requests, or a webhook racing a fresh {@code /sync} call right after purchase) both
 * hit "not present" under find-then-save with no row to lock — whichever INSERT commits first
 * wins regardless of which fetch was actually newer, silently able to persist stale data. The
 * upsert's {@code WHERE last_provider_event_at < EXCLUDED.last_provider_event_at} makes both the
 * create and the monotonic-update case atomic in the database, closing that race entirely (§6.1:
 * "webhook-triggered and /sync-triggered fetches can race").
 *
 * <p>Only {@code source = 'REVENUECAT'} rows are ever touched (hardcoded in the SQL), so this can
 * never clobber an {@code ADMIN_GRANT} or a stale {@code MIGRATION}/{@code LEGACY_WEBHOOK} row.
 */
@Service
public class EntitlementSyncService {

    private static final String UPSERT_SQL = """
            INSERT INTO user_entitlements
                (user_id, capability, source, environment, status, expires_at,
                 last_provider_event_at, last_verified_at, created_at, updated_at)
            VALUES (?, ?, 'REVENUECAT', ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (user_id, capability, source, environment)
            DO UPDATE SET
                status = EXCLUDED.status,
                expires_at = EXCLUDED.expires_at,
                last_provider_event_at = EXCLUDED.last_provider_event_at,
                last_verified_at = EXCLUDED.last_verified_at,
                updated_at = EXCLUDED.updated_at
            WHERE user_entitlements.last_provider_event_at IS NULL
               OR user_entitlements.last_provider_event_at < EXCLUDED.last_provider_event_at
            """;

    private final JdbcTemplate jdbc;
    private final Clock clock;

    @Autowired
    public EntitlementSyncService(JdbcTemplate jdbc) {
        this(jdbc, Clock.systemUTC());
    }

    EntitlementSyncService(JdbcTemplate jdbc, Clock clock) {
        this.jdbc = jdbc;
        this.clock = clock;
    }

    @Transactional
    public void apply(UUID userId, ProviderSnapshot snapshot) {
        for (Capability capability : Capability.values()) {
            applyOne(userId, capability, snapshot);
        }
    }

    private void applyOne(UUID userId, Capability capability, ProviderSnapshot snapshot) {
        CapabilityGrant grant = snapshot.grant(capability);
        Status status = grant.active() ? Status.ACTIVE : Status.INACTIVE;
        Instant now = Instant.now(clock);
        jdbc.update(UPSERT_SQL,
                userId,
                capability.name(),
                grant.environment().name(),
                status.name(),
                grant.expiresAt() == null ? null : Timestamp.from(grant.expiresAt()),
                Timestamp.from(snapshot.fetchedAt()),
                Timestamp.from(now),
                Timestamp.from(now),
                Timestamp.from(now));
    }
}
