package com.tubeshadow.billing.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.billing.application.BillingEntitlementProvider;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

/**
 * First {@link BillingEntitlementProvider} adapter — RevenueCat's REST subscriber endpoint
 * (docs/MONETIZATION-DESIGN.md §9). Field names below are taken from RevenueCat's public API
 * reference (GET /subscribers/{app_user_id}), verified against the docs this session — not
 * guessed.
 */
@Component
@EnableConfigurationProperties(RevenueCatProperties.class)
public class RevenueCatClient implements BillingEntitlementProvider {

    /** RevenueCat entitlement identifiers — fixed per §9.1, never a free-form config value. */
    private static final String RC_ENTITLEMENT_SHADOW = "shadow_access";
    private static final String RC_ENTITLEMENT_AI = "ai_access";

    private final RevenueCatProperties props;
    private final ObjectMapper objectMapper;
    private final RevenueCatCallBudget budget;
    private final RestClient http;
    private final Clock clock;

    @Autowired
    public RevenueCatClient(RevenueCatProperties props, ObjectMapper objectMapper, RevenueCatCallBudget budget) {
        this(props, objectMapper, budget, Clock.systemUTC());
    }

    RevenueCatClient(RevenueCatProperties props, ObjectMapper objectMapper, RevenueCatCallBudget budget, Clock clock) {
        this.props = props;
        this.objectMapper = objectMapper;
        this.budget = budget;
        this.clock = clock;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(15));
        this.http = RestClient.builder().requestFactory(factory).baseUrl(props.baseUrl()).build();
    }

    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    @Override
    public ProviderSnapshot fetchSnapshot(String externalUserId) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "REVENUECAT_NOT_CONFIGURED",
                    "RevenueCat is not configured");
        }
        budget.consumeOrThrow();
        String raw;
        try {
            raw = http.get()
                    .uri("/subscribers/{id}", externalUserId)
                    .header("Authorization", "Bearer " + props.apiKey())
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "REVENUECAT_FETCH_FAILED",
                    "Failed to fetch RevenueCat subscriber snapshot: " + e.getMessage());
        }
        return parseSnapshot(externalUserId, raw);
    }

    /** Package-visible for parser unit tests — exercised against docs-accurate fixture JSON. */
    ProviderSnapshot parseSnapshot(String externalUserId, String responseBody) {
        JsonNode root;
        try {
            root = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "REVENUECAT_PARSE_FAILED",
                    "Could not parse RevenueCat subscriber response");
        }
        JsonNode subscriber = root.path("subscriber");
        Instant fetchedAt = root.hasNonNull("request_date_ms")
                ? Instant.ofEpochMilli(root.path("request_date_ms").asLong())
                : Instant.now(clock);

        List<CapabilityGrant> grants = List.of(
                parseEntitlement(subscriber, RC_ENTITLEMENT_SHADOW, Capability.SHADOW_ACCESS),
                parseEntitlement(subscriber, RC_ENTITLEMENT_AI, Capability.AI_ACCESS));

        return new ProviderSnapshot(externalUserId, fetchedAt, grants);
    }

    private CapabilityGrant parseEntitlement(JsonNode subscriber, String rcEntitlementId, Capability capability) {
        JsonNode entitlement = subscriber.path("entitlements").path(rcEntitlementId);
        if (entitlement.isMissingNode()) {
            return new CapabilityGrant(capability, false, null, Environment.PRODUCTION);
        }
        Instant expiresAt = parseInstant(entitlement.path("expires_date").asText(null));
        // grantsAccessAt-style check at parse time too: RevenueCat can include a just-lapsed
        // entitlement in this map, so presence alone must not mean active.
        boolean active = expiresAt == null || expiresAt.isAfter(Instant.now(clock));
        String productIdentifier = entitlement.path("product_identifier").asText(null);
        return new CapabilityGrant(capability, active, expiresAt, detectEnvironment(subscriber, productIdentifier));
    }

    /**
     * Environment for ONE capability, read from the specific subscription that grants it
     * ({@code subscriber.subscriptions[product_identifier].is_sandbox}) — never inferred by
     * scanning every subscription in the payload. A subscriber's purchase history can contain an
     * unrelated or long-expired sandbox test purchase alongside a genuine production
     * subscription; treating any sandbox entry anywhere as poisoning the whole snapshot would
     * mistag a real paying production subscriber as SANDBOX, making them invisible to production
     * access checks (§6.1) the moment they'd ever made a test purchase.
     */
    private Environment detectEnvironment(JsonNode subscriber, String productIdentifier) {
        if (productIdentifier == null || productIdentifier.isBlank()) {
            // A promotional/non-subscription grant has no purchase to inspect.
            return Environment.PRODUCTION;
        }
        JsonNode subscription = subscriber.path("subscriptions").path(productIdentifier);
        if (subscription.isMissingNode()) {
            return Environment.PRODUCTION;
        }
        return subscription.path("is_sandbox").asBoolean(false) ? Environment.SANDBOX : Environment.PRODUCTION;
    }

    private Instant parseInstant(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return Instant.parse(value);
        } catch (Exception e) {
            return null;
        }
    }
}
