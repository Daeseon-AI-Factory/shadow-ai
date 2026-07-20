package com.tubeshadow.billing.infrastructure;

import com.tubeshadow.common.exception.BusinessException;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** §8.2/§8.3: the global budget shared by both the webhook and /sync provider-call paths. */
class RevenueCatCallBudgetTest {

    @Test
    void allowsUpToTheLimitThenThrows() {
        RevenueCatCallBudget budget = new RevenueCatCallBudget(3, Clock.fixed(Instant.now(), ZoneOffset.UTC));

        assertThatCode(budget::consumeOrThrow).doesNotThrowAnyException();
        assertThatCode(budget::consumeOrThrow).doesNotThrowAnyException();
        assertThatCode(budget::consumeOrThrow).doesNotThrowAnyException();

        assertThatThrownBy(budget::consumeOrThrow)
                .isInstanceOf(BusinessException.class)
                .satisfies(e -> org.assertj.core.api.Assertions.assertThat(((BusinessException) e).code())
                        .isEqualTo("REVENUECAT_BUDGET_EXCEEDED"));
    }

    @Test
    void resetsAfterTheWindowElapses() {
        Instant start = Instant.now();
        java.util.concurrent.atomic.AtomicReference<Instant> now = new java.util.concurrent.atomic.AtomicReference<>(start);
        Clock movingClock = new Clock() {
            @Override public ZoneOffset getZone() { return ZoneOffset.UTC; }
            @Override public Clock withZone(java.time.ZoneId zone) { return this; }
            @Override public Instant instant() { return now.get(); }
        };
        RevenueCatCallBudget budget = new RevenueCatCallBudget(1, movingClock);

        budget.consumeOrThrow();
        assertThatThrownBy(budget::consumeOrThrow).isInstanceOf(BusinessException.class);

        now.set(start.plus(61, ChronoUnit.SECONDS));

        assertThatCode(budget::consumeOrThrow).doesNotThrowAnyException();
    }
}
