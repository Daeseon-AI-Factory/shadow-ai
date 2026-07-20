package com.tubeshadow.billing;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.billing.application.EntitlementService;
import com.tubeshadow.billing.domain.UserEntitlement;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import com.tubeshadow.billing.domain.UserEntitlement.Source;
import com.tubeshadow.billing.domain.UserEntitlement.Status;
import com.tubeshadow.billing.repository.UserEntitlementRepository;
import com.tubeshadow.common.exception.BusinessException;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.catchThrowableOfType;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/** PAY-1 acceptance matrix at the policy layer: Free / Shadow / AI (docs/MONETIZATION-DESIGN.md §14). */
class AccessPolicyTest {

    private static final Instant NOW = Instant.parse("2026-07-13T12:00:00Z");
    private final Clock clock = Clock.fixed(NOW, ZoneOffset.UTC);
    private final UserEntitlementRepository entitlementRepo = mock(UserEntitlementRepository.class);
    private final UserRepository users = mock(UserRepository.class);

    @Test
    void freeUserIsBlockedFromShadowWithATypedReason() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of());

        BusinessException error = catchThrowableOfType(
                () -> policy("").requireShadow(userId), BusinessException.class);

        assertThat(error.status().value()).isEqualTo(403);
        assertThat(error.code()).isEqualTo(AccessPolicy.CODE_SHADOW_REQUIRED);
    }

    @Test
    void shadowSubscriberGetsShadowButNotAi() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(
                row(userId, Capability.SHADOW_ACCESS, Status.ACTIVE, NOW.plusSeconds(3600))));

        assertThatCode(() -> policy("").requireShadow(userId)).doesNotThrowAnyException();
        BusinessException error = catchThrowableOfType(
                () -> policy("").requireAi(userId), BusinessException.class);
        assertThat(error.code()).isEqualTo(AccessPolicy.CODE_AI_REQUIRED);
    }

    @Test
    void aiSubscriberGetsBothCapabilitiesCumulatively() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(
                row(userId, Capability.AI_ACCESS, Status.ACTIVE, null)));

        assertThatCode(() -> policy("").requireShadow(userId)).doesNotThrowAnyException();
        assertThatCode(() -> policy("").requireAi(userId)).doesNotThrowAnyException();
    }

    @Test
    void inactiveAndExpiredRowsFailClosed() {
        UUID inactive = UUID.randomUUID();
        when(entitlementRepo.findByUserId(inactive)).thenReturn(List.of(
                row(inactive, Capability.SHADOW_ACCESS, Status.INACTIVE, null)));
        UUID expired = UUID.randomUUID();
        when(entitlementRepo.findByUserId(expired)).thenReturn(List.of(
                row(expired, Capability.SHADOW_ACCESS, Status.ACTIVE, NOW)));

        assertThat(policy("").canUseShadow(inactive)).isFalse();
        assertThat(policy("").canUseShadow(expired)).isFalse();
    }

    @Test
    void allowlistImpliesShadowAsWellAsAi() {
        User owner = User.createNew("owner@example.com", "hash", "Owner");
        when(users.findById(owner.getId())).thenReturn(Optional.of(owner));
        when(entitlementRepo.findByUserId(owner.getId())).thenReturn(List.of());

        assertThatCode(() -> policy("owner@example.com").requireShadow(owner.getId()))
                .doesNotThrowAnyException();
        assertThatCode(() -> policy("owner@example.com").requireAi(owner.getId()))
                .doesNotThrowAnyException();
    }

    @Test
    void snapshotReportsPerCapabilityStateForTheMeEndpoint() {
        UUID userId = UUID.randomUUID();
        Instant expiry = NOW.plusSeconds(3600);
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(
                row(userId, Capability.SHADOW_ACCESS, Status.ACTIVE, expiry)));

        EntitlementService.CapabilitySnapshot snapshot =
                new EntitlementService(entitlementRepo, "PRODUCTION", clock).snapshot(userId);

        assertThat(snapshot.shadowActive()).isTrue();
        assertThat(snapshot.shadowExpiresAt()).isEqualTo(expiry);
        assertThat(snapshot.aiActive()).isFalse();
        assertThat(snapshot.aiExpiresAt()).isNull();
    }

    private UserEntitlement row(UUID userId, Capability capability, Status status, Instant expiresAt) {
        return UserEntitlement.of(userId, capability, Source.REVENUECAT,
                Environment.PRODUCTION, status, expiresAt, NOW);
    }

    private AccessPolicy policy(String allowedEmails) {
        EntitlementService entitlements = new EntitlementService(entitlementRepo, "PRODUCTION", clock);
        return new AccessPolicy(entitlements, users, allowedEmails);
    }
}
