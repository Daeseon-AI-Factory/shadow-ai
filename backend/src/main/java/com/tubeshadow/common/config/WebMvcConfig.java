package com.tubeshadow.common.config;

import com.tubeshadow.auth.security.AuthRateLimitFilter;
import com.tubeshadow.auth.security.CurrentUserArgumentResolver;
import com.tubeshadow.billing.api.BillingSyncRateLimitInterceptor;
import com.tubeshadow.practice.api.ComposeRateLimitInterceptor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final CurrentUserArgumentResolver currentUserArgumentResolver;
    private final ObjectProvider<AuthRateLimitFilter> rateLimitInterceptor;
    private final ObjectProvider<ComposeRateLimitInterceptor> composeRateLimitInterceptor;
    private final ObjectProvider<BillingSyncRateLimitInterceptor> billingSyncRateLimitInterceptor;

    public WebMvcConfig(CurrentUserArgumentResolver currentUserArgumentResolver,
                        ObjectProvider<AuthRateLimitFilter> rateLimitInterceptor,
                        ObjectProvider<ComposeRateLimitInterceptor> composeRateLimitInterceptor,
                        ObjectProvider<BillingSyncRateLimitInterceptor> billingSyncRateLimitInterceptor) {
        this.currentUserArgumentResolver = currentUserArgumentResolver;
        this.rateLimitInterceptor = rateLimitInterceptor;
        this.composeRateLimitInterceptor = composeRateLimitInterceptor;
        this.billingSyncRateLimitInterceptor = billingSyncRateLimitInterceptor;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(currentUserArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        AuthRateLimitFilter rate = rateLimitInterceptor.getIfAvailable();
        if (rate != null) {
            registry.addInterceptor(rate).addPathPatterns("/api/auth/signup", "/api/auth/login");
        }
        // The AI composition check is the one authed endpoint that costs a provider call — guard it
        // per-user so a loop can't run up the bill (the auth limiter above only covers signup/login).
        ComposeRateLimitInterceptor compose = composeRateLimitInterceptor.getIfAvailable();
        if (compose != null) {
            // Every /compose/* endpoint costs a provider call (transforms generation, transform-check,
            // and the original compose check), so all must be behind the per-user bill guard.
            registry.addInterceptor(compose).addPathPatterns(
                    "/api/practice/compose/check",
                    "/api/practice/compose/mix",
                    "/api/practice/compose/story",
                    "/api/practice/compose/transforms",
                    "/api/practice/compose/transform-check",
                    "/api/practice/scenario/check",
                    "/api/practice/interview/check",
                    "/api/practice/interview/mock",
                    "/api/practice/sparring/report",
                    "/api/practice/transcribe");
        }
        // /api/billing/sync triggers a live RevenueCat REST call — bound both per-user and
        // aggregate spend (§8.3).
        BillingSyncRateLimitInterceptor billingSync = billingSyncRateLimitInterceptor.getIfAvailable();
        if (billingSync != null) {
            registry.addInterceptor(billingSync).addPathPatterns("/api/billing/sync");
        }
    }
}
