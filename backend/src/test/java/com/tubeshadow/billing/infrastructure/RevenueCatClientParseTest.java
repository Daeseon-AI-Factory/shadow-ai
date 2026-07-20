package com.tubeshadow.billing.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.billing.application.BillingEntitlementProvider.CapabilityGrant;
import com.tubeshadow.billing.application.BillingEntitlementProvider.ProviderSnapshot;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Parser tests for the RevenueCat "Get Subscriber" response. Fixture field names
 * (subscriber.entitlements.{id}.expires_date, subscriber.entitlements.{id}.product_identifier,
 * subscriber.subscriptions.{id}.is_sandbox, request_date_ms) are taken from RevenueCat's public
 * API reference, verified against the docs this session — not guessed.
 */
class RevenueCatClientParseTest {

    private static final Instant NOW = Instant.parse("2026-07-20T12:00:00Z");
    // Effectively unlimited so these parser tests never trip the shared call budget — that
    // behavior has its own dedicated unit test (RevenueCatCallBudgetTest).
    private final RevenueCatClient client = new RevenueCatClient(
            new RevenueCatProperties("secret", "http://unused", "auth", ""),
            new ObjectMapper(), new RevenueCatCallBudget(Integer.MAX_VALUE, Clock.fixed(NOW, ZoneOffset.UTC)),
            Clock.fixed(NOW, ZoneOffset.UTC));

    @Test
    void parsesAnActiveExpiringEntitlement() {
        String body = subscriberJson("""
                "shadow_access": {
                  "expires_date": "2026-08-18T00:00:00Z",
                  "grace_period_expires_date": null,
                  "product_identifier": "mimi_shadow_monthly",
                  "purchase_date": "2026-07-18T00:00:00Z"
                }
                """, "");

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        CapabilityGrant shadow = snapshot.grant(Capability.SHADOW_ACCESS);
        assertThat(shadow.active()).isTrue();
        assertThat(shadow.expiresAt()).isEqualTo(Instant.parse("2026-08-18T00:00:00Z"));
        assertThat(snapshot.grant(Capability.AI_ACCESS).active()).isFalse();
    }

    @Test
    void nullExpiresDateMeansNonExpiring() {
        String body = subscriberJson("""
                "ai_access": {
                  "expires_date": null,
                  "grace_period_expires_date": null,
                  "product_identifier": "promo_lifetime",
                  "purchase_date": "2026-01-01T00:00:00Z"
                }
                """, "");

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        CapabilityGrant ai = snapshot.grant(Capability.AI_ACCESS);
        assertThat(ai.active()).isTrue();
        assertThat(ai.expiresAt()).isNull();
    }

    @Test
    void anAlreadyLapsedEntitlementStillPresentInTheMapIsInactive() {
        String body = subscriberJson("""
                "shadow_access": {
                  "expires_date": "2026-01-01T00:00:00Z",
                  "grace_period_expires_date": null,
                  "product_identifier": "mimi_shadow_monthly",
                  "purchase_date": "2025-12-01T00:00:00Z"
                }
                """, "");

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.grant(Capability.SHADOW_ACCESS).active()).isFalse();
    }

    @Test
    void missingEntitlementIsInactive() {
        String body = subscriberJson("", "");

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.grant(Capability.SHADOW_ACCESS).active()).isFalse();
        assertThat(snapshot.grant(Capability.AI_ACCESS).active()).isFalse();
    }

    @Test
    void environmentComesFromTheEntitlementsOwnSubscriptionNotAnyOtherSubscription() {
        String body = subscriberJson("""
                "ai_access": {"expires_date": null, "grace_period_expires_date": null, "product_identifier": "mimi_ai_monthly", "purchase_date": "2026-01-01T00:00:00Z"}
                """, """
                "mimi_ai_monthly": {
                  "is_sandbox": true,
                  "expires_date": null,
                  "store": "APP_STORE",
                  "original_purchase_date": "2026-01-01T00:00:00Z",
                  "purchase_date": "2026-01-01T00:00:00Z"
                }
                """);

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.grant(Capability.AI_ACCESS).environment()).isEqualTo(Environment.SANDBOX);
    }

    @Test
    void aMixedSandboxAndProductionSubscriberIsNotMistaggedEntirelySandbox() {
        // Regression for the bug this fix closes: a subscriber with an unrelated (or long-expired)
        // sandbox test purchase AND a genuine, currently active production subscription must NOT
        // have their real paid entitlement written under SANDBOX (invisible to production access
        // checks, §6.1). Environment must be read from the SPECIFIC product backing each
        // entitlement, not by scanning every subscription the subscriber has ever made.
        String body = subscriberJson("""
                "shadow_access": {"expires_date": null, "grace_period_expires_date": null, "product_identifier": "mimi_shadow_monthly", "purchase_date": "2026-07-01T00:00:00Z"}
                """, """
                "mimi_shadow_monthly": {
                  "is_sandbox": false,
                  "expires_date": null,
                  "store": "APP_STORE",
                  "original_purchase_date": "2026-07-01T00:00:00Z",
                  "purchase_date": "2026-07-01T00:00:00Z"
                },
                "mimi_shadow_monthly_test_leftover": {
                  "is_sandbox": true,
                  "expires_date": "2026-01-01T00:00:00Z",
                  "store": "APP_STORE",
                  "original_purchase_date": "2025-12-01T00:00:00Z",
                  "purchase_date": "2025-12-01T00:00:00Z"
                }
                """);

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.grant(Capability.SHADOW_ACCESS).environment()).isEqualTo(Environment.PRODUCTION);
    }

    @Test
    void anEntitlementWhoseProductHasNoMatchingSubscriptionDefaultsToProduction() {
        String body = subscriberJson("""
                "ai_access": {"expires_date": null, "grace_period_expires_date": null, "product_identifier": "promo_grant_no_subscription", "purchase_date": "2026-01-01T00:00:00Z"}
                """, "");

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.grant(Capability.AI_ACCESS).environment()).isEqualTo(Environment.PRODUCTION);
    }

    @Test
    void fetchedAtComesFromRequestDateMs() {
        String body = """
                {
                  "request_date": "2026-07-19T00:00:00Z",
                  "request_date_ms": 1784505600000,
                  "subscriber": { "entitlements": {}, "subscriptions": {} }
                }""";

        ProviderSnapshot snapshot = client.parseSnapshot("user-1", body);

        assertThat(snapshot.fetchedAt()).isEqualTo(Instant.ofEpochMilli(1784505600000L));
    }

    private String subscriberJson(String entitlementsBody, String subscriptionsBody) {
        return """
                {
                  "request_date": "2026-07-20T12:00:00Z",
                  "request_date_ms": %d,
                  "subscriber": {
                    "entitlements": { %s },
                    "subscriptions": { %s }
                  }
                }""".formatted(NOW.toEpochMilli(), entitlementsBody, subscriptionsBody);
    }
}
