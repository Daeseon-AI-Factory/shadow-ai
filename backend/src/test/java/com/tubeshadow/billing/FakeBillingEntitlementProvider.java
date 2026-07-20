package com.tubeshadow.billing;

import com.tubeshadow.billing.application.BillingEntitlementProvider;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Test double for {@link BillingEntitlementProvider} — stands in for {@code RevenueCatClient} in
 * full-stack webhook/sync tests so they never make a real network call. The wire-format contract
 * (JSON field parsing) is covered separately by {@code RevenueCatClientParseTest} against
 * docs-accurate fixtures; this fake covers the application-level contract
 * ("what does the app do with a snapshot").
 */
public class FakeBillingEntitlementProvider implements BillingEntitlementProvider {

    private final Map<String, ProviderSnapshot> canned = new ConcurrentHashMap<>();
    private final Map<String, Integer> failuresRemaining = new ConcurrentHashMap<>();
    private final AtomicInteger fetchCount = new AtomicInteger(0);

    public void stub(String externalUserId, ProviderSnapshot snapshot) {
        canned.put(externalUserId, snapshot);
    }

    /** The next {@code count} fetches for this user throw, simulating a transient provider failure. */
    public void failNextFetches(String externalUserId, int count) {
        failuresRemaining.put(externalUserId, count);
    }

    public int fetchCount() {
        return fetchCount.get();
    }

    @Override
    public ProviderSnapshot fetchSnapshot(String externalUserId) {
        fetchCount.incrementAndGet();
        Integer remaining = failuresRemaining.get(externalUserId);
        if (remaining != null && remaining > 0) {
            failuresRemaining.put(externalUserId, remaining - 1);
            throw new RuntimeException("simulated RevenueCat fetch failure");
        }
        return canned.getOrDefault(externalUserId,
                new ProviderSnapshot(externalUserId, java.time.Instant.now(), List.of()));
    }
}
