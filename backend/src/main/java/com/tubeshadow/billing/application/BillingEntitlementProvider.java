package com.tubeshadow.billing.application;

import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;

import java.time.Instant;
import java.util.List;

/**
 * Provider-neutral billing boundary (docs/MONETIZATION-DESIGN.md §5.3). Product code depends on
 * this interface, never on a vendor SDK type — RevenueCat is the first adapter
 * ({@link com.tubeshadow.billing.infrastructure.RevenueCatClient}), but a future replacement only
 * needs a new implementation.
 */
public interface BillingEntitlementProvider {

    /** Current subscriber state from the provider, fetched fresh — never trust a cached copy. */
    ProviderSnapshot fetchSnapshot(String externalUserId);

    /**
     * One capability as the provider currently reports it. {@code expiresAt} null = non-expiring.
     * {@code environment} is per-grant, not per-snapshot: a subscriber's purchase history can
     * contain an unrelated or long-expired sandbox entry alongside a genuine production
     * subscription, so environment must be read from the specific purchase backing THIS
     * capability, never inferred by scanning every purchase the subscriber has ever made.
     */
    record CapabilityGrant(Capability capability, boolean active, Instant expiresAt, Environment environment) {
    }

    /**
     * @param fetchedAt when THIS fetch happened — the monotonicity clock for
     *                  {@link EntitlementSyncService} (§6.1: a stale fetch must never overwrite a
     *                  newer one).
     */
    record ProviderSnapshot(String externalUserId, Instant fetchedAt, List<CapabilityGrant> grants) {

        public CapabilityGrant grant(Capability capability) {
            return grants.stream()
                    .filter(g -> g.capability() == capability)
                    .findFirst()
                    .orElse(new CapabilityGrant(capability, false, null, Environment.PRODUCTION));
        }
    }
}
