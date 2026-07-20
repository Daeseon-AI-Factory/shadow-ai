package com.tubeshadow.billing.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.billing.application.BillingEntitlementProvider;
import com.tubeshadow.billing.application.BillingEventStore;
import com.tubeshadow.billing.application.EntitlementSyncService;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
import com.tubeshadow.billing.infrastructure.RevenueCatProperties;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.common.exception.UnauthorizedException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;
import java.util.UUID;

/**
 * RevenueCat's own webhook adapter (docs/MONETIZATION-DESIGN.md §8.2) — replaces the generic
 * payment-agnostic {@code /api/billing/webhook} retired in this track (§6.3 step 5). No JWT (the
 * caller is RevenueCat's server, not a Mimi user); gated by the dashboard-configured Authorization
 * header value and, if configured, HMAC-SHA256 request signing.
 *
 * <p>Per RevenueCat's own guidance, this NEVER trusts the event payload's entitlement data — it
 * only uses the event to identify who changed, then re-fetches the current subscriber snapshot
 * and applies that (§8.2, §9). This sidesteps writing bespoke state-transition logic per event
 * type ({@code INITIAL_PURCHASE}, {@code RENEWAL}, {@code CANCELLATION}, ...).
 */
@RestController
@RequestMapping("/api/billing/revenuecat")
@Tag(name = "Billing", description = "RevenueCat webhook (header/HMAC-gated, no JWT)")
@EnableConfigurationProperties(RevenueCatProperties.class)
public class RevenueCatWebhookController {

    private static final Logger log = LoggerFactory.getLogger(RevenueCatWebhookController.class);
    private static final String PROVIDER = "REVENUECAT";
    /** RevenueCat clock-skew/replay tolerance for the HMAC timestamp — matches its own dashboard docs. */
    private static final long HMAC_TIMESTAMP_TOLERANCE_SECONDS = 300;

    private final BillingEventStore eventStore;
    private final BillingEntitlementProvider provider;
    private final EntitlementSyncService syncService;
    private final RevenueCatProperties props;
    private final ObjectMapper objectMapper;

    public RevenueCatWebhookController(BillingEventStore eventStore, BillingEntitlementProvider provider,
                                       EntitlementSyncService syncService, RevenueCatProperties props,
                                       ObjectMapper objectMapper) {
        this.eventStore = eventStore;
        this.provider = provider;
        this.syncService = syncService;
        this.props = props;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/webhook")
    @Operation(summary = "RevenueCat entitlement event — verifies auth/HMAC, fetches a fresh snapshot, applies it")
    public ResponseEntity<Void> webhook(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestHeader(value = "X-RevenueCat-Webhook-Signature", required = false) String signatureHeader,
            HttpServletRequest request) throws IOException {

        byte[] rawBody = request.getInputStream().readAllBytes();
        verifyAuthHeader(authHeader);
        verifyHmacIfConfigured(signatureHeader, rawBody);

        JsonNode event;
        String providerEventId;
        String eventType;
        String appUserId;
        String environment;
        Instant occurredAt;
        try {
            event = objectMapper.readTree(rawBody).path("event");
            providerEventId = requireText(event, "id");
            eventType = requireText(event, "type");
            appUserId = requireText(event, "app_user_id");
            environment = requireText(event, "environment");
            occurredAt = Instant.ofEpochMilli(event.path("event_timestamp_ms").asLong());
        } catch (Exception e) {
            // Malformed body: no reliable event id to key a billing_events row on, so this can't be
            // recorded in the idempotency ledger — logged instead, so operators have SOME
            // visibility into repeated bad deliveries. Fails closed either way: rejected without
            // granting access, per §8.2's "record a retryable failure ... on malformed input".
            log.warn("Rejected malformed RevenueCat webhook body: {}", e.getMessage());
            throw new BusinessException(HttpStatus.BAD_REQUEST, "REVENUECAT_MALFORMED_EVENT",
                    "Could not parse RevenueCat webhook event");
        }

        boolean isNew = eventStore.recordIfNew(PROVIDER, providerEventId, eventType, appUserId,
                environment, occurredAt, Instant.now());
        if (!isNew && "PROCESSED".equals(eventStore.statusOf(PROVIDER, providerEventId).orElse(null))) {
            // Truly done already — idempotent no-op. A RECEIVED/FAILED row falls through and
            // retries processing below, so a redelivery after a crash/error is not silently lost.
            return ResponseEntity.ok().build();
        }

        UUID mimiUserId;
        try {
            mimiUserId = UUID.fromString(appUserId);
        } catch (IllegalArgumentException e) {
            // Not one of ours (e.g. an anonymous RevenueCat-generated id) — nothing to sync to.
            eventStore.markProcessed(PROVIDER, providerEventId);
            return ResponseEntity.ok().build();
        }

        try {
            BillingEntitlementProvider.ProviderSnapshot snapshot = provider.fetchSnapshot(appUserId);
            syncService.apply(mimiUserId, snapshot);
            eventStore.markProcessed(PROVIDER, providerEventId);
        } catch (Exception e) {
            log.warn("RevenueCat webhook processing failed for event {}: {}", providerEventId, e.getMessage());
            eventStore.markFailed(PROVIDER, providerEventId, e.getClass().getSimpleName());
            // 5xx so RevenueCat retries delivery; statusOf() above will read FAILED next time and
            // retry processing rather than treating the redelivery as an idempotent no-op.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok().build();
    }

    private void verifyAuthHeader(String provided) {
        String expected = props.webhookAuthHeaderValue();
        if (expected == null || expected.isBlank()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "REVENUECAT_WEBHOOK_NOT_CONFIGURED",
                    "RevenueCat webhook auth is not configured");
        }
        byte[] expectedBytes = expected.getBytes(StandardCharsets.UTF_8);
        byte[] actualBytes = provided == null ? new byte[0] : provided.getBytes(StandardCharsets.UTF_8);
        if (!MessageDigest.isEqual(expectedBytes, actualBytes)) {
            throw new UnauthorizedException("REVENUECAT_BAD_AUTH", "Invalid RevenueCat webhook authorization");
        }
    }

    /**
     * {@code X-RevenueCat-Webhook-Signature: t=<unix_seconds>,v1=<hmac_sha256_hex>} over
     * {@code "<t>.<raw body>"}, per RevenueCat's HMAC docs. Optional — a blank configured secret
     * skips this without disabling the endpoint (§8.2: HMAC only "if the selected
     * account/configuration supports it").
     */
    private void verifyHmacIfConfigured(String signatureHeader, byte[] rawBody) {
        String secret = props.webhookHmacSecret();
        if (secret == null || secret.isBlank()) {
            return;
        }
        if (signatureHeader == null || signatureHeader.isBlank()) {
            throw new UnauthorizedException("REVENUECAT_MISSING_SIGNATURE", "Missing HMAC signature header");
        }
        String timestampPart = null;
        String signaturePart = null;
        for (String part : signatureHeader.split(",")) {
            String[] kv = part.split("=", 2);
            if (kv.length != 2) {
                continue;
            }
            if ("t".equals(kv[0])) {
                timestampPart = kv[1];
            } else if ("v1".equals(kv[0])) {
                signaturePart = kv[1];
            }
        }
        if (timestampPart == null || signaturePart == null) {
            throw new UnauthorizedException("REVENUECAT_BAD_SIGNATURE_FORMAT", "Malformed HMAC signature header");
        }
        long timestampSeconds;
        try {
            timestampSeconds = Long.parseLong(timestampPart);
        } catch (NumberFormatException e) {
            throw new UnauthorizedException("REVENUECAT_BAD_SIGNATURE_FORMAT", "Malformed HMAC timestamp");
        }
        long skewSeconds = Math.abs(Instant.now().getEpochSecond() - timestampSeconds);
        if (skewSeconds > HMAC_TIMESTAMP_TOLERANCE_SECONDS) {
            throw new UnauthorizedException("REVENUECAT_STALE_SIGNATURE", "HMAC timestamp outside tolerance");
        }

        byte[] signedPayload = (timestampPart + "." + new String(rawBody, StandardCharsets.UTF_8))
                .getBytes(StandardCharsets.UTF_8);
        String computed = hmacSha256Hex(secret, signedPayload);
        if (!MessageDigest.isEqual(
                computed.getBytes(StandardCharsets.UTF_8), signaturePart.getBytes(StandardCharsets.UTF_8))) {
            throw new UnauthorizedException("REVENUECAT_BAD_SIGNATURE", "HMAC signature mismatch");
        }
    }

    private String hmacSha256Hex(String secret, byte[] payload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return HexFormat.of().formatHex(mac.doFinal(payload));
        } catch (Exception e) {
            throw new IllegalStateException("HMAC computation failed", e);
        }
    }

    private String requireText(JsonNode node, String field) {
        String value = node.path(field).asText(null);
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("missing field: " + field);
        }
        return value;
    }
}
