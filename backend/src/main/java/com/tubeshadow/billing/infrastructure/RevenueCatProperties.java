package com.tubeshadow.billing.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * RevenueCat adapter config (docs/MONETIZATION-DESIGN.md §9, §16). {@code apiKey} is the secret
 * (server-side) key — required to read a subscriber's full entitlement state, per RevenueCat's
 * "Get Subscriber" docs. {@code webhookAuthHeaderValue} is the value configured in the RevenueCat
 * dashboard for the webhook's Authorization header; {@code webhookHmacSecret} enables the optional
 * {@code X-RevenueCat-Webhook-Signature} check ("if the selected account/configuration supports
 * it", §8.2) — blank disables HMAC verification without disabling the endpoint.
 */
@ConfigurationProperties(prefix = "tubeshadow.revenuecat")
public record RevenueCatProperties(String apiKey, String baseUrl,
                                   String webhookAuthHeaderValue, String webhookHmacSecret) {
}
