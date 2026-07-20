package com.tubeshadow.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class BillingControllerTest extends SpringIntegrationTest {

    private static final String SECRET = "test-billing-secret";

    @DynamicPropertySource
    static void billingSecret(DynamicPropertyRegistry registry) {
        registry.add("tubeshadow.billing.webhook-secret", () -> SECRET);
    }

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void rejectsMissingSecret() throws Exception {
        UUID userId = signup("nosecret@example.com").userId();
        mockMvc.perform(post("/api/billing/webhook")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(userId, "pro", null)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void rejectsWrongSecret() throws Exception {
        UUID userId = signup("wrongsecret@example.com").userId();
        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", "not-the-secret")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(userId, "pro", null)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void setsProAndMeReflectsIt() throws Exception {
        Account acct = signup("upgrade@example.com");

        // before: free
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.plan").value("free"));

        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(acct.userId(), "pro", "2999-01-01T00:00:00Z")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.plan").value("pro"));

        // after: /me shows pro AND the PAY-1 capability bridge granted both entitlements
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.plan").value("pro"))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(true))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(true));
    }

    @Test
    void legacyDecisionSupersedesTheMigrationBackfill() throws Exception {
        Account acct = signup("supersede@example.com");
        // Simulate a V21-backfilled user: non-expiring MIGRATION rows for both capabilities.
        grantPaidCapabilities("supersede@example.com");
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(true));

        // Operator shortens the entitlement to an already-lapsed date. The stale backfill row must
        // NOT keep granting via the latest-expiry rule.
        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(acct.userId(), "pro", "2000-01-01T00:00:00Z")))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.plan").value("free"))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(false))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(false));
    }

    @Test
    void downgradeToFreeRevokesCapabilities() throws Exception {
        Account acct = signup("downgrade@example.com");

        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(acct.userId(), "pro", null)))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(true));

        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(acct.userId(), "free", null)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.plan").value("free"))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(false))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(false));
    }

    @Test
    void expiredProReadsAsFreeOnMe() throws Exception {
        Account acct = signup("expired@example.com");

        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(acct.userId(), "pro", "2000-01-01T00:00:00Z"))) // already lapsed
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + acct.token()))
                .andExpect(jsonPath("$.data.plan").value("free"))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(false));
    }

    @Test
    void unknownUserIs404() throws Exception {
        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(UUID.randomUUID(), "pro", null)))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidPlan() throws Exception {
        UUID userId = signup("badplan@example.com").userId();
        mockMvc.perform(post("/api/billing/webhook")
                        .header("X-Billing-Secret", SECRET)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(webhookBody(userId, "enterprise", null)))
                .andExpect(status().isBadRequest());
    }

    private String webhookBody(UUID userId, String plan, String validUntil) throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("userId", userId.toString());
        body.put("plan", plan);
        if (validUntil != null) {
            body.put("planValidUntil", validUntil);
        }
        return objectMapper.writeValueAsString(body);
    }

    private record Account(UUID userId, String token) {}

    private Account signup(String email) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "email", email, "password", "passpass1", "displayName", "Billing User"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        String loginBody = objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"));
        String resp = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(loginBody))
                .andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(resp).path("data").path("accessToken").asText();
        String me = mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andReturn().getResponse().getContentAsString();
        UUID userId = UUID.fromString(objectMapper.readTree(me).path("data").path("id").asText());
        return new Account(userId, token);
    }
}
