package com.tubeshadow.billing.application;

import com.tubeshadow.billing.domain.UserEntitlement;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import com.tubeshadow.billing.repository.UserEntitlementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Central read model for business capabilities (docs/MONETIZATION-DESIGN.md §7.1). Access checks
 * consider ONLY rows in the server's configured billing environment: sandbox rows are stored for
 * testing/audit but never grant access on a production server (§6.1).
 *
 * <p>Capabilities are cumulative — an active {@code AI_ACCESS} implies Shadow (§3.1), so a
 * provider misconfiguration that grants only the AI entitlement cannot lock a paying AI user out
 * of the Shadow workflow.
 */
@Service
public class EntitlementService {

    private final UserEntitlementRepository repository;
    private final Environment environment;
    private final Clock clock;

    @Autowired
    public EntitlementService(UserEntitlementRepository repository,
                              @Value("${tubeshadow.billing.environment:PRODUCTION}") String environment) {
        this(repository, environment, Clock.systemUTC());
    }

    public EntitlementService(UserEntitlementRepository repository, String environment, Clock clock) {
        this.repository = repository;
        this.environment = Environment.valueOf(environment.trim().toUpperCase());
        this.clock = clock;
    }

    /**
     * Point-in-time capability view for one user. {@code shadowActive} is cumulative (AI implies
     * Shadow); each {@code expiresAt} is the latest expiry among the rows granting it, with null
     * meaning a non-expiring grant dominates.
     */
    public record CapabilitySnapshot(boolean shadowActive, Instant shadowExpiresAt,
                                     boolean aiActive, Instant aiExpiresAt) {
        public boolean has(Capability capability) {
            return capability == Capability.AI_ACCESS ? aiActive : shadowActive;
        }
    }

    @Transactional(readOnly = true)
    public CapabilitySnapshot snapshot(UUID userId) {
        Instant now = Instant.now(clock);
        List<UserEntitlement> rows = userId == null ? List.of() : repository.findByUserId(userId);

        boolean ai = false;
        boolean shadowOnly = false;
        Instant aiExpiry = null;
        Instant shadowOnlyExpiry = null;
        boolean aiNonExpiring = false;
        boolean shadowNonExpiring = false;

        for (UserEntitlement row : rows) {
            if (row.getEnvironment() != environment || !row.grantsAccessAt(now)) {
                continue;
            }
            if (row.getCapability() == Capability.AI_ACCESS) {
                ai = true;
                aiNonExpiring |= row.getExpiresAt() == null;
                aiExpiry = laterOf(aiExpiry, row.getExpiresAt());
            } else {
                shadowOnly = true;
                shadowNonExpiring |= row.getExpiresAt() == null;
                shadowOnlyExpiry = laterOf(shadowOnlyExpiry, row.getExpiresAt());
            }
        }

        Instant aiExpiresAt = aiNonExpiring ? null : aiExpiry;
        boolean shadow = shadowOnly || ai;
        Instant shadowExpiresAt;
        if ((shadowOnly && shadowNonExpiring) || (ai && aiNonExpiring)) {
            shadowExpiresAt = null;
        } else {
            shadowExpiresAt = laterOf(shadowOnlyExpiry, aiExpiresAt);
        }
        return new CapabilitySnapshot(shadow, shadowExpiresAt, ai, aiExpiresAt);
    }

    @Transactional(readOnly = true)
    public boolean has(UUID userId, Capability capability) {
        return snapshot(userId).has(capability);
    }

    private static Instant laterOf(Instant a, Instant b) {
        if (a == null) {
            return b;
        }
        if (b == null) {
            return a;
        }
        return a.isAfter(b) ? a : b;
    }
}
