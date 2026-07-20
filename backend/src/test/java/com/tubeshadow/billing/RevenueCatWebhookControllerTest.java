package com.tubeshadow.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.billing.application.BillingEntitlementProvider.CapabilityGrant;
import com.tubeshadow.billing.application.BillingEntitlementProvider.ProviderSnapshot;
import com.tubeshadow.billing.domain.UserEntitlement.Capability;
import com.tubeshadow.billing.domain.UserEntitlement.Environment;
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

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Full-stack coverage of the RevenueCat webhook adapter (docs/MONETIZATION-DESIGN.md §8.2):
 * auth/HMAC gating, idempotent redelivery, retry-on-failure, and end-to-end snapshot application.
 * Uses {@link FakeBillingEntitlementProvider} in place of a real network call.
 */
@Transactional
class RevenueCatWebhookControllerTest extends SpringIntegrationTest {

    private static final String AUTH_VALUE = "test-webhook-secret";

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
    }

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired FakeBillingEntitlementProvider fakeProvider;

    @Test
    void missingAuthHeaderIsRejected() throws Exception {
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventBody("evt-1", UUID.randomUUID().toString())))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void wrongAuthHeaderIsRejected() throws Exception {
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", "not-the-secret")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventBody("evt-2", UUID.randomUUID().toString())))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void malformedEventIsRejected() throws Exception {
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"event\": {\"type\": \"RENEWAL\"}}")) // no id, no app_user_id
                .andExpect(status().isBadRequest());
    }

    @Test
    void eventForANonMimiAppUserIdIsAcceptedAsANoOp() throws Exception {
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventBody("evt-anon", "$RCAnonymousID:not-a-uuid")))
                .andExpect(status().isOk());
    }

    @Test
    void validEventFetchesAndAppliesTheSubscriberSnapshot() throws Exception {
        String email = "webhook-target@example.com";
        String token = signupAndLogin(email);
        UUID userId = currentUserId(token);
        fakeProvider.stub(userId.toString(), new ProviderSnapshot(userId.toString(),
                Instant.now(), List.of(new CapabilityGrant(Capability.AI_ACCESS, true, null, Environment.PRODUCTION))));

        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventBody("evt-3", userId.toString())))
                .andExpect(status().isOk());

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(true))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(true)); // AI implies Shadow
    }

    @Test
    void redeliveredEventIsIdempotentAndDoesNotRefetchTheProvider() throws Exception {
        UUID userId = currentUserId(signupAndLogin("webhook-dup@example.com"));
        fakeProvider.stub(userId.toString(), new ProviderSnapshot(userId.toString(),
                Instant.now(), List.of(new CapabilityGrant(Capability.SHADOW_ACCESS, true, null, Environment.PRODUCTION))));
        String body = eventBody("evt-dup", userId.toString());

        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk());
        int callsAfterFirst = fakeProvider.fetchCount();

        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk());

        org.assertj.core.api.Assertions.assertThat(fakeProvider.fetchCount()).isEqualTo(callsAfterFirst);
    }

    @Test
    void aFailedDeliveryLeavesTheEventRetryableAndRedeliveryReprocessesSuccessfully() throws Exception {
        UUID userId = currentUserId(signupAndLogin("webhook-retry@example.com"));
        fakeProvider.stub(userId.toString(), new ProviderSnapshot(userId.toString(),
                Instant.now(), List.of(new CapabilityGrant(Capability.SHADOW_ACCESS, true, null, Environment.PRODUCTION))));
        fakeProvider.failNextFetches(userId.toString(), 1);
        String body = eventBody("evt-retry", userId.toString());

        // First delivery: the provider fetch fails -> row marked FAILED, 500 so RevenueCat retries.
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().is5xxServerError());
        int callsAfterFirst = fakeProvider.fetchCount();

        // Redelivery of the SAME event id: a FAILED row is not treated as an idempotent no-op —
        // it retries processing, and this time the fake provider succeeds.
        mockMvc.perform(post("/api/billing/revenuecat/webhook")
                        .header("Authorization", AUTH_VALUE).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk());

        org.assertj.core.api.Assertions.assertThat(fakeProvider.fetchCount()).isEqualTo(callsAfterFirst + 1);
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .get("/api/auth/me").header("Authorization", "Bearer "
                                + issueTokenFor("webhook-retry@example.com")))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(true));
    }

    private String issueTokenFor(String email) throws Exception {
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"))))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }

    private String eventBody(String eventId, String appUserId) throws Exception {
        return objectMapper.writeValueAsString(Map.of(
                "api_version", "1.0",
                "event", Map.of(
                        "id", eventId,
                        "type", "RENEWAL",
                        "app_user_id", appUserId,
                        "environment", "PRODUCTION",
                        "event_timestamp_ms", Instant.now().toEpochMilli())));
    }

    private UUID currentUserId(String token) throws Exception {
        String me = mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(me).path("data").path("id").asText());
    }

    private String signupAndLogin(String email) throws Exception {
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email, "password", "passpass1", "displayName", "Webhook"))))
                .andExpect(status().isCreated());
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"))))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
