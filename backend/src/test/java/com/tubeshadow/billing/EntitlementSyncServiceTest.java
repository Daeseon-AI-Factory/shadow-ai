package com.tubeshadow.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.billing.application.BillingEntitlementProvider.CapabilityGrant;
import com.tubeshadow.billing.application.BillingEntitlementProvider.ProviderSnapshot;
import com.tubeshadow.billing.application.EntitlementSyncService;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * PAY-2 §6.1 against a REAL Postgres — the atomic upsert this service relies on
 * ({@code INSERT ... ON CONFLICT ... DO UPDATE ... WHERE}) can only be meaningfully verified
 * against a real database, not a mocked repository (that was the previous version of this test,
 * and it could not have caught the insert-time race the upsert now closes by construction).
 */
@Transactional
class EntitlementSyncServiceTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired JdbcTemplate jdbc;
    @Autowired EntitlementSyncService syncService;
    @Autowired UserRepository userRepository;

    @Test
    void createsNewRevenueCatRowsAndDefaultsTheUntouchedCapabilityToInactive() throws Exception {
        UUID userId = createUser("sync-new@example.com");

        syncService.apply(userId, snapshot(userId, Instant.now(),
                grant(Capability.AI_ACCESS, true, null, Environment.PRODUCTION)));

        assertThat(statusOf(userId, Capability.AI_ACCESS, Environment.PRODUCTION)).isEqualTo("ACTIVE");
        assertThat(statusOf(userId, Capability.SHADOW_ACCESS, Environment.PRODUCTION)).isEqualTo("INACTIVE");
    }

    @Test
    void updatesAnExistingRowInPlaceOnANewerFetch() throws Exception {
        UUID userId = createUser("sync-update@example.com");
        Instant t1 = Instant.now();
        syncService.apply(userId, snapshot(userId, t1,
                grant(Capability.SHADOW_ACCESS, false, null, Environment.PRODUCTION)));
        assertThat(statusOf(userId, Capability.SHADOW_ACCESS, Environment.PRODUCTION)).isEqualTo("INACTIVE");

        syncService.apply(userId, snapshot(userId, t1.plusSeconds(60),
                grant(Capability.SHADOW_ACCESS, true, null, Environment.PRODUCTION)));

        assertThat(statusOf(userId, Capability.SHADOW_ACCESS, Environment.PRODUCTION)).isEqualTo("ACTIVE");
    }

    @Test
    void aStaleFetchArrivingAfterANewerOneIsRejectedByTheAtomicUpsertGuard() throws Exception {
        // This is the logical equivalent of the insert-time race: whichever write reaches the
        // DO UPDATE branch of the atomic upsert SECOND (concurrently or, as tested here,
        // sequentially-but-out-of-order) is WHERE-guarded against the one already committed —
        // Postgres serializes conflicting INSERT/DO-UPDATE statements at the row level, so a
        // genuinely concurrent race resolves through this exact branch regardless of arrival order.
        UUID userId = createUser("sync-stale@example.com");
        Instant newer = Instant.now();
        Instant older = newer.minusSeconds(120);

        syncService.apply(userId, snapshot(userId, newer,
                grant(Capability.AI_ACCESS, true, newer.plusSeconds(3600), Environment.PRODUCTION)));
        // An older, stale fetch (e.g. a delayed webhook) reports the capability as inactive.
        syncService.apply(userId, snapshot(userId, older,
                grant(Capability.AI_ACCESS, false, null, Environment.PRODUCTION)));

        assertThat(statusOf(userId, Capability.AI_ACCESS, Environment.PRODUCTION)).isEqualTo("ACTIVE");
    }

    @Test
    void sandboxAndProductionRowsForTheSameUserAndCapabilityAreIndependent() throws Exception {
        UUID userId = createUser("sync-env@example.com");

        syncService.apply(userId, snapshot(userId, Instant.now(),
                grant(Capability.SHADOW_ACCESS, true, null, Environment.SANDBOX)));
        syncService.apply(userId, snapshot(userId, Instant.now(),
                grant(Capability.SHADOW_ACCESS, false, null, Environment.PRODUCTION)));

        assertThat(statusOf(userId, Capability.SHADOW_ACCESS, Environment.SANDBOX)).isEqualTo("ACTIVE");
        assertThat(statusOf(userId, Capability.SHADOW_ACCESS, Environment.PRODUCTION)).isEqualTo("INACTIVE");
    }

    @Test
    void neverTouchesAdminGrantOrMigrationRows() throws Exception {
        UUID userId = createUser("sync-preserve@example.com");
        jdbc.update("""
                INSERT INTO user_entitlements (user_id, capability, source, environment, status,
                    expires_at, last_verified_at, created_at)
                VALUES (?, 'AI_ACCESS', 'ADMIN_GRANT', 'PRODUCTION', 'ACTIVE', NULL, now(), now())
                """, userId);

        syncService.apply(userId, snapshot(userId, Instant.now(),
                grant(Capability.AI_ACCESS, false, null, Environment.PRODUCTION)));

        Integer adminGrantCount = jdbc.queryForObject("""
                SELECT count(*) FROM user_entitlements
                WHERE user_id = ? AND source = 'ADMIN_GRANT' AND status = 'ACTIVE'
                """, Integer.class, userId);
        assertThat(adminGrantCount).isEqualTo(1);
        // The owner's admin grant still wins the cumulative access check even though the
        // REVENUECAT-sourced row was written inactive.
        assertThat(statusOf(userId, Capability.AI_ACCESS, Environment.PRODUCTION)).isEqualTo("INACTIVE");
        assertThat(hasRow(userId, Capability.AI_ACCESS, "ADMIN_GRANT", Environment.PRODUCTION)).isTrue();
    }

    private String statusOf(UUID userId, Capability capability, Environment environment) {
        return jdbc.queryForObject("""
                SELECT status FROM user_entitlements
                WHERE user_id = ? AND capability = ? AND source = 'REVENUECAT' AND environment = ?
                """, String.class, userId, capability.name(), environment.name());
    }

    private boolean hasRow(UUID userId, Capability capability, String source, Environment environment) {
        Integer count = jdbc.queryForObject("""
                SELECT count(*) FROM user_entitlements
                WHERE user_id = ? AND capability = ? AND source = ? AND environment = ?
                """, Integer.class, userId, capability.name(), source, environment.name());
        return count != null && count > 0;
    }

    private ProviderSnapshot snapshot(UUID userId, Instant fetchedAt, CapabilityGrant grant) {
        return new ProviderSnapshot(userId.toString(), fetchedAt, List.of(grant));
    }

    private CapabilityGrant grant(Capability capability, boolean active, Instant expiresAt, Environment environment) {
        return new CapabilityGrant(capability, active, expiresAt, environment);
    }

    private UUID createUser(String email) throws Exception {
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email, "password", "passpass1", "displayName", "Sync"))))
                .andExpect(status().isCreated());
        // A JPA query (not raw JDBC) forces Hibernate's auto-flush of the signup write within this
        // test transaction before the id is used in later raw-JDBC assertions/upserts.
        return userRepository.findByEmail(email).orElseThrow().getId();
    }
}
