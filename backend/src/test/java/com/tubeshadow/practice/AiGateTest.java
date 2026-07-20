package com.tubeshadow.practice;

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
import com.tubeshadow.practice.application.AiGate;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.catchThrowableOfType;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * PAY-1: AiGate is now a facade over AccessPolicy/EntitlementService — these tests keep the same
 * behavioral guarantees the old users.plan gate had (deny-by-default, expiry fails closed, owner
 * allowlist, stable AI_NOT_ALLOWED code) but drive them through capability rows.
 */
class AiGateTest {

    private static final Instant NOW = Instant.parse("2026-07-13T12:00:00Z");
    private final Clock clock = Clock.fixed(NOW, ZoneOffset.UTC);
    private final UserEntitlementRepository entitlementRepo = mock(UserEntitlementRepository.class);
    private final UserRepository users = mock(UserRepository.class);

    @Test
    void blocksAUserWithNoEntitlementRows() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of());

        BusinessException error = catchThrowableOfType(
                () -> gate("").assertEntitled(userId), BusinessException.class);

        assertThat(error.status().value()).isEqualTo(403);
        assertThat(error.code()).isEqualTo("AI_NOT_ALLOWED");
    }

    @Test
    void allowsAnActiveAiEntitlementWithOrWithoutAnExpiry() {
        UUID expiring = UUID.randomUUID();
        when(entitlementRepo.findByUserId(expiring)).thenReturn(List.of(
                aiRow(expiring, NOW.plusSeconds(60))));
        UUID noExpiry = UUID.randomUUID();
        when(entitlementRepo.findByUserId(noExpiry)).thenReturn(List.of(
                aiRow(noExpiry, null)));

        assertThatCode(() -> gate("").assertEntitled(expiring)).doesNotThrowAnyException();
        assertThatCode(() -> gate("").assertEntitled(noExpiry)).doesNotThrowAnyException();
    }

    @Test
    void blocksAnExpiredAiEntitlement() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(aiRow(userId, NOW)));

        assertThatThrownBy(() -> gate("").assertEntitled(userId))
                .isInstanceOf(BusinessException.class);
    }

    @Test
    void blocksAShadowOnlyUserFromAi() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(
                UserEntitlement.of(userId, Capability.SHADOW_ACCESS, Source.REVENUECAT,
                        Environment.PRODUCTION, Status.ACTIVE, null, NOW)));

        BusinessException error = catchThrowableOfType(
                () -> gate("").assertEntitled(userId), BusinessException.class);

        assertThat(error.code()).isEqualTo("AI_NOT_ALLOWED");
    }

    @Test
    void sandboxRowsNeverGrantAccessOnAProductionServer() {
        UUID userId = UUID.randomUUID();
        when(entitlementRepo.findByUserId(userId)).thenReturn(List.of(
                UserEntitlement.of(userId, Capability.AI_ACCESS, Source.REVENUECAT,
                        Environment.SANDBOX, Status.ACTIVE, null, NOW)));

        assertThatThrownBy(() -> gate("").assertEntitled(userId))
                .isInstanceOf(BusinessException.class);
    }

    @Test
    void allowlistRemainsACaseInsensitiveOwnerOverrideForAUserWithoutRows() {
        User user = User.createNew("owner@example.com", "hash", "AI User");
        when(users.findById(user.getId())).thenReturn(Optional.of(user));
        when(entitlementRepo.findByUserId(user.getId())).thenReturn(List.of());

        assertThatCode(() -> gate(" Owner@Example.com ").assertEntitled(user.getId()))
                .doesNotThrowAnyException();
    }

    @Test
    void missingOrNullUserIdFailsClosed() {
        UUID missing = UUID.randomUUID();
        when(entitlementRepo.findByUserId(missing)).thenReturn(List.of());
        when(users.findById(missing)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> gate("owner@example.com").assertEntitled(missing))
                .isInstanceOf(BusinessException.class);
        assertThatThrownBy(() -> gate("owner@example.com").assertEntitled(null))
                .isInstanceOf(BusinessException.class);
    }

    private UserEntitlement aiRow(UUID userId, Instant expiresAt) {
        return UserEntitlement.of(userId, Capability.AI_ACCESS, Source.REVENUECAT,
                Environment.PRODUCTION, Status.ACTIVE, expiresAt, NOW);
    }

    private AiGate gate(String allowedEmails) {
        EntitlementService entitlements = new EntitlementService(entitlementRepo, "PRODUCTION", clock);
        return new AiGate(new AccessPolicy(entitlements, users, allowedEmails));
    }
}
