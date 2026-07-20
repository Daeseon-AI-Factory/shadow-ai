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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * PAY-2 §8.3: JWT-derived user id only. The rate limiter itself is covered separately by
 * {@link com.tubeshadow.billing.api.BillingSyncRateLimitInterceptorTest} — it is disabled in the
 * "integ" profile this class runs under (application-integ.yml).
 */
@Transactional
class BillingSyncControllerTest extends SpringIntegrationTest {

    @TestConfiguration
    static class FakeProviderConfig {
        @Bean
        @Primary
        FakeBillingEntitlementProvider fakeBillingEntitlementProvider() {
            return new FakeBillingEntitlementProvider();
        }
    }

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired FakeBillingEntitlementProvider fakeProvider;

    @Test
    void requiresAuthentication() throws Exception {
        mockMvc.perform(post("/api/billing/sync")).andExpect(status().is4xxClientError());
    }

    @Test
    void syncFetchesTheCallersOwnSnapshotAndReturnsTheMeShape() throws Exception {
        String token = signupAndLogin("sync-target@example.com");
        UUID userId = currentUserId(token);
        fakeProvider.stub(userId.toString(), new ProviderSnapshot(userId.toString(),
                Instant.now(), List.of(new CapabilityGrant(Capability.SHADOW_ACCESS, true, null, Environment.PRODUCTION))));

        mockMvc.perform(post("/api/billing/sync").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.shadow.active").value(true))
                .andExpect(jsonPath("$.data.ai.active").value(false));

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(true));
    }

    @Test
    void twoUsersSyncingOnlyEverAffectTheirOwnEntitlements() throws Exception {
        String tokenA = signupAndLogin("sync-a@example.com");
        String tokenB = signupAndLogin("sync-b@example.com");
        UUID userA = currentUserId(tokenA);
        UUID userB = currentUserId(tokenB);
        fakeProvider.stub(userA.toString(), new ProviderSnapshot(userA.toString(),
                Instant.now(), List.of(new CapabilityGrant(Capability.AI_ACCESS, true, null, Environment.PRODUCTION))));
        // userB has no stub -> FakeBillingEntitlementProvider defaults to an all-inactive snapshot.

        mockMvc.perform(post("/api/billing/sync").header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk());
        mockMvc.perform(post("/api/billing/sync").header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + tokenA))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(true));
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + tokenB))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(false));
    }

    // The two-tier rate limiter itself is unit-tested directly in
    // BillingSyncRateLimitInterceptorTest — tubeshadow.rate-limit.enabled is false in the "integ"
    // profile (application-integ.yml, same as ComposeRateLimitInterceptor's precedent), so the
    // bean does not exist in this full-stack test and a MockMvc-level 429 assertion here would be
    // vacuous.

    private UUID currentUserId(String token) throws Exception {
        String me = mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(me).path("data").path("id").asText());
    }

    private String signupAndLogin(String email) throws Exception {
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email, "password", "passpass1", "displayName", "Sync"))))
                .andExpect(status().isCreated());
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"))))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
