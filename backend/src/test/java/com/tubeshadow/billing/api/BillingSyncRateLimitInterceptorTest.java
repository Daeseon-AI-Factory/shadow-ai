package com.tubeshadow.billing.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tubeshadow.auth.security.AuthenticatedUser;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Direct unit test (not @SpringIntegrationTest): {@code tubeshadow.rate-limit.enabled=false} in
 * the "integ" profile (application-integ.yml, same precedent as ComposeRateLimitInterceptorTest),
 * so this bean never exists in a full-stack test context.
 */
class BillingSyncRateLimitInterceptorTest {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    private final Clock clock = Clock.fixed(Instant.parse("2026-07-20T00:00:00Z"), ZoneOffset.UTC);

    @AfterEach
    void clearContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void perUserLimitBlocksAfterTheConfiguredCeiling() throws Exception {
        authAs(UUID.randomUUID());
        var interceptor = new BillingSyncRateLimitInterceptor(objectMapper, 3, 1000, clock);

        for (int i = 0; i < 3; i++) {
            MockHttpServletResponse res = new MockHttpServletResponse();
            assertThat(interceptor.preHandle(request(), res, new Object())).isTrue();
        }

        MockHttpServletResponse blocked = new MockHttpServletResponse();
        assertThat(interceptor.preHandle(request(), blocked, new Object())).isFalse();
        assertThat(blocked.getStatus()).isEqualTo(429);
        assertThat(blocked.getContentAsString()).contains("RATE_LIMITED");
    }

    @Test
    void differentUsersHaveIndependentPerUserBuckets() throws Exception {
        var interceptor = new BillingSyncRateLimitInterceptor(objectMapper, 1, 1000, clock);

        authAs(UUID.randomUUID());
        interceptor.preHandle(request(), new MockHttpServletResponse(), new Object());

        authAs(UUID.randomUUID());
        MockHttpServletResponse res = new MockHttpServletResponse();
        assertThat(interceptor.preHandle(request(), res, new Object())).isTrue();
    }

    @Test
    void aggregateLimitBlocksAcrossDifferentUsersEvenUnderTheirOwnPerUserCeiling() throws Exception {
        // Per-user ceiling is generous (100); aggregate is the binding constraint — this is the
        // gap a per-user-only limiter leaves: K throwaway accounts each under their own cap can
        // still exhaust the shared RevenueCat REST budget (§8.3).
        var interceptor = new BillingSyncRateLimitInterceptor(objectMapper, 100, 2, clock);

        authAs(UUID.randomUUID());
        assertThat(interceptor.preHandle(request(), new MockHttpServletResponse(), new Object())).isTrue();
        authAs(UUID.randomUUID());
        assertThat(interceptor.preHandle(request(), new MockHttpServletResponse(), new Object())).isTrue();

        authAs(UUID.randomUUID()); // a third, still-fresh user
        MockHttpServletResponse blocked = new MockHttpServletResponse();
        assertThat(interceptor.preHandle(request(), blocked, new Object())).isFalse();
        assertThat(blocked.getStatus()).isEqualTo(429);
    }

    private void authAs(UUID id) {
        var principal = new AuthenticatedUser(id, id + "@example.com", 0);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(principal, null, List.of()));
    }

    private MockHttpServletRequest request() {
        MockHttpServletRequest r = new MockHttpServletRequest("POST", "/api/billing/sync");
        r.setServletPath("/api/billing/sync");
        r.setRemoteAddr("9.9.9.9");
        return r;
    }
}
