package com.tubeshadow.billing.infrastructure;

import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Global cap on RevenueCat REST calls for this process, shared by every caller of
 * {@link RevenueCatClient#fetchSnapshot} — both the webhook adapter and {@code /api/billing/sync}
 * funnel through the same client instance, so gating here satisfies docs/MONETIZATION-DESIGN.md
 * §8.2/§8.3's "share a global provider-call budget ... with /api/billing/sync" without either
 * caller needing to know about the other.
 *
 * <p>This is a budget, not a full circuit breaker — no half-open/backoff state machine, just a
 * fixed-window cap that fails closed once exceeded. Both callers already treat a thrown exception
 * from {@code fetchSnapshot} as a retryable failure (webhook: mark FAILED + 5xx, so RevenueCat
 * redelivers later; sync: the {@link BusinessException}'s 503 status propagates to the client),
 * which is the backpressure behavior the design calls for.
 */
@Component
public class RevenueCatCallBudget {

    private static final long WINDOW_MS = 60_000;

    private final int maxCallsPerWindow;
    private final Clock clock;
    private final AtomicLong windowStartMs;
    private final AtomicInteger count = new AtomicInteger(0);

    @Autowired
    public RevenueCatCallBudget(@Value("${tubeshadow.revenuecat.max-calls-per-minute:200}") int maxCallsPerWindow) {
        this(maxCallsPerWindow, Clock.systemUTC());
    }

    RevenueCatCallBudget(int maxCallsPerWindow, Clock clock) {
        this.maxCallsPerWindow = maxCallsPerWindow;
        this.clock = clock;
        this.windowStartMs = new AtomicLong(Instant.now(clock).toEpochMilli());
    }

    /** @throws BusinessException (503) if the shared budget is exhausted for the current window. */
    public void consumeOrThrow() {
        long now = Instant.now(clock).toEpochMilli();
        long start = windowStartMs.get();
        if (now - start >= WINDOW_MS && windowStartMs.compareAndSet(start, now)) {
            count.set(0);
        }
        if (count.incrementAndGet() > maxCallsPerWindow) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "REVENUECAT_BUDGET_EXCEEDED",
                    "RevenueCat call budget exhausted for this window — try again shortly");
        }
    }
}
