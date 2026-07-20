package com.tubeshadow.billing.application;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * The single decision point for paid access (docs/MONETIZATION-DESIGN.md §7). Controllers and
 * services call {@link #requireShadow} / {@link #requireAi} — nothing else in product code may
 * decide entitlement.
 *
 * <p>DENY-BY-DEFAULT: a missing user, no entitlement rows, or an expired grant is blocked.
 *
 * <p>{@code AI_ALLOWED_EMAILS} survives as a well-isolated owner/tester compatibility adapter
 * (§7.4) until an explicit admin-grant procedure ships in PAY-2. The allowlist implies BOTH
 * capabilities — the owner must not lose the Shadow workflow the moment Shadow gates turn on.
 *
 * <p>Error codes: {@code SHADOW_REQUIRED} is the new typed reason; the AI gate keeps emitting
 * {@code AI_NOT_ALLOWED} because shipped mobile builds route exactly that code to their
 * invite-only screens (§7.1 compatibility alias — PAY-3 replaces it with the paywall).
 */
@Component
public class AccessPolicy {

    public static final String CODE_SHADOW_REQUIRED = "SHADOW_REQUIRED";
    public static final String CODE_AI_REQUIRED = "AI_NOT_ALLOWED";

    private final EntitlementService entitlements;
    private final UserRepository userRepository;
    private final Set<String> allowlist;

    @Autowired
    public AccessPolicy(EntitlementService entitlements, UserRepository userRepository,
                        @Value("${AI_ALLOWED_EMAILS:}") String allowedEmails) {
        this.entitlements = entitlements;
        this.userRepository = userRepository;
        this.allowlist = (allowedEmails == null || allowedEmails.isBlank())
                ? Set.of()
                : Arrays.stream(allowedEmails.split(","))
                    .map(s -> s.trim().toLowerCase())
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toUnmodifiableSet());
    }

    /** Gate for non-AI paid workflow writes (§7.2). Reads and user-data deletion never call this. */
    public void requireShadow(UUID userId) {
        if (!canUseShadow(userId)) {
            throw new BusinessException(HttpStatus.FORBIDDEN, CODE_SHADOW_REQUIRED,
                    "Shadow 훈련 도구는 유료 플랜에서 이용할 수 있습니다.");
        }
    }

    /** Gate for every path that can commit a model/realtime cost (§7.3). */
    public void requireAi(UUID userId) {
        if (!canUseAi(userId)) {
            throw new BusinessException(HttpStatus.FORBIDDEN, CODE_AI_REQUIRED,
                    "AI 기능은 유료 플랜에서 이용할 수 있습니다.");
        }
    }

    public boolean canUseShadow(UUID userId) {
        return userId != null
                && (entitlements.has(userId, Capability.SHADOW_ACCESS) || allowlisted(userId));
    }

    /** Non-throwing form for async paths that silently skip instead of erroring (§7.3). */
    public boolean canUseAi(UUID userId) {
        return userId != null
                && (entitlements.has(userId, Capability.AI_ACCESS) || allowlisted(userId));
    }

    /**
     * Snapshot as the user actually experiences access — §7.4: what /me reports must match what
     * the gates decide. The allowlist overlay grants both capabilities, so an allowlisted
     * owner/tester reads active (non-expiring) instead of a locked UI that contradicts every
     * succeeding request. PAY-2 replaces the overlay with explicit ADMIN_GRANT rows.
     */
    public EntitlementService.CapabilitySnapshot effectiveSnapshot(UUID userId) {
        EntitlementService.CapabilitySnapshot snapshot = entitlements.snapshot(userId);
        if (userId != null && !(snapshot.shadowActive() && snapshot.aiActive()) && allowlisted(userId)) {
            return new EntitlementService.CapabilitySnapshot(true, null, true, null);
        }
        return snapshot;
    }

    private boolean allowlisted(UUID userId) {
        if (allowlist.isEmpty()) {
            return false;
        }
        User user = userRepository.findById(userId).orElse(null);
        String email = user == null ? null : user.getEmail();
        return email != null && allowlist.contains(email.trim().toLowerCase());
    }
}
