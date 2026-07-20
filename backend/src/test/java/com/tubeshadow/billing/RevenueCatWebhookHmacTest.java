package com.tubeshadow.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.HexFormat;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Separate Spring context because HMAC verification is configured on (a different property set
 * than {@link RevenueCatWebhookControllerTest}). Signature format and computation
 * ({@code t=<unix_seconds>,v1=<hmac_sha256_hex>} over {@code "<t>.<raw body>"}) verified against
 * RevenueCat's own docs this session.
 */
@Transactional
class RevenueCatWebhookHmacTest extends SpringIntegrationTest {

    private static final String AUTH_VALUE = "test-webhook-secret";
    private static final String HMAC_SECRET = "test-hmac-secret";

    @TestConfiguration
    static class FakeProviderConfig {
        @Bean
        @Primary
        FakeBillingEntitlementProvider fakeBillingEntitlementProvider() {
            return new FakeBillingEntitlementProvider();
        }
    }

    @DynamicPropertySource
    static void revenueCatAuth(DynamicPropertyRegistry registry) {
        registry.add("tubeshadow.revenuecat.webhook-auth-header-value", () -> AUTH_VALUE);
        registry.add("tubeshadow.revenuecat.webhook-hmac-secret", () -> HMAC_SECRET);
    }

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void missingSignatureIsRejectedWhenHmacIsConfigured() throws Exception {
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventBody("evt-hmac-missing")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void tamperedBodyFailsSignatureVerification() throws Exception {
        String body = eventBody("evt-hmac-tampered");
        String validSignature = sign(body);

        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .header("X-RevenueCat-Webhook-Signature", validSignature)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body + " ")) // signature computed over the original body
                .andExpect(status().isUnauthorized());
    }

    @Test
    void validSignatureIsAccepted() throws Exception {
        String body = eventBody("evt-hmac-valid");

        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .header("X-RevenueCat-Webhook-Signature", sign(body))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk());
    }

    private String sign(String rawBody) throws Exception {
        long timestamp = Instant.now().getEpochSecond();
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(HMAC_SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] digest = mac.doFinal((timestamp + "." + rawBody).getBytes(StandardCharsets.UTF_8));
        return "t=" + timestamp + ",v1=" + HexFormat.of().formatHex(digest);
    }

    private String eventBody(String eventId) throws Exception {
        return objectMapper.writeValueAsString(Map.of(
                "api_version", "1.0",
                "event", Map.of(
                        "id", eventId,
                        "type", "RENEWAL",
                        "app_user_id", "$RCAnonymousID:no-mimi-account",
                        "environment", "PRODUCTION",
                        "event_timestamp_ms", Instant.now().toEpochMilli())));
    }
}
