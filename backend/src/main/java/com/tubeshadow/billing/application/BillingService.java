package com.tubeshadow.billing.application;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.common.exception.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

/**
 * Applies entitlement decisions to users. The only writer of {@code users.plan}.
 *
 * <p>Idempotent by construction: setting a user to the same (plan, validUntil) twice is a harmless
 * overwrite, so a billing platform that retries a webhook delivery can't corrupt state.
 */
@Service
public class BillingService {

    private final UserRepository userRepository;
    private final EntitlementService entitlementService;

    public BillingService(UserRepository userRepository, EntitlementService entitlementService) {
        this.userRepository = userRepository;
        this.entitlementService = entitlementService;
    }

    @Transactional
    public User setPlan(UUID userId, String plan, Instant validUntil, String customerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND",
                        "No user for billing entitlement: " + userId));
        user.applyPlan(plan, validUntil, customerId);
        // PAY-1 bridge: access decisions read user_entitlements now, so a legacy plan decision must
        // also grant/revoke capabilities or this webhook would silently stop working. PAY-2 retires
        // the whole endpoint (docs/MONETIZATION-DESIGN.md §6.3 step 5).
        entitlementService.applyLegacyPlanDecision(userId, plan, validUntil);
        return userRepository.save(user);
    }
}
