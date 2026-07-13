package com.tubeshadow.practice;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.application.AiGate;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AiGateTest {

    private static final Instant NOW = Instant.parse("2026-07-13T12:00:00Z");
    private final Clock clock = Clock.fixed(NOW, ZoneOffset.UTC);
    private final UserRepository users = mock(UserRepository.class);

    @Test
    void blocksAFreeUserWhenThereIsNoOverride() {
        User user = user("free@example.com");
        when(users.findById(user.getId())).thenReturn(Optional.of(user));

        BusinessException error = org.assertj.core.api.Assertions.catchThrowableOfType(
                () -> gate("").assertEntitled(user.getId()), BusinessException.class);

        assertThat(error.status().value()).isEqualTo(403);
        assertThat(error.code()).isEqualTo("AI_NOT_ALLOWED");
    }

    @Test
    void allowsAnActivePaidPlanWithOrWithoutAnExpiry() {
        User expiring = user("paid-expiring@example.com");
        expiring.applyPlan("pro", NOW.plusSeconds(60), null);
        when(users.findById(expiring.getId())).thenReturn(Optional.of(expiring));

        User noExpiry = user("paid-no-expiry@example.com");
        noExpiry.applyPlan("pro", null, null);
        when(users.findById(noExpiry.getId())).thenReturn(Optional.of(noExpiry));

        assertThatCode(() -> gate("").assertEntitled(expiring.getId())).doesNotThrowAnyException();
        assertThatCode(() -> gate("").assertEntitled(noExpiry.getId())).doesNotThrowAnyException();
    }

    @Test
    void blocksAnExpiredPaidPlan() {
        User user = user("expired@example.com");
        user.applyPlan("pro", NOW, null);
        when(users.findById(user.getId())).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> gate("").assertEntitled(user.getId()))
                .isInstanceOf(BusinessException.class);
    }

    @Test
    void allowlistRemainsACaseInsensitiveOwnerOverrideForAFreeUser() {
        User user = user("owner@example.com");
        when(users.findById(user.getId())).thenReturn(Optional.of(user));

        assertThatCode(() -> gate(" Owner@Example.com ").assertEntitled(user.getId()))
                .doesNotThrowAnyException();
    }

    @Test
    void missingOrNullUserIdFailsClosed() {
        UUID missing = UUID.randomUUID();
        when(users.findById(missing)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> gate("owner@example.com").assertEntitled(missing))
                .isInstanceOf(BusinessException.class);
        assertThatThrownBy(() -> gate("owner@example.com").assertEntitled(null))
                .isInstanceOf(BusinessException.class);
    }

    private User user(String email) {
        return User.createNew(email, "hash", "AI User");
    }

    private AiGate gate(String allowedEmails) {
        return new AiGate(users, allowedEmails, clock);
    }
}
