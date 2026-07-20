package com.tubeshadow.billing.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.common.web.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Two-tier limiter for {@code POST /api/billing/sync} (docs/MONETIZATION-DESIGN.md §8.3): a
 * per-user bucket AND a shared aggregate bucket. Per-user alone does not bound cost — signup is
 * free, so K throwaway accounts times a per-user limit is still unbounded RevenueCat REST spend;
 * the aggregate bucket caps total provider calls this endpoint can trigger regardless of account
 * count.
 */
@Component
@ConditionalOnProperty(prefix = "tubeshadow.rate-limit", name = "enabled", havingValue = "true", matchIfMissing = true)
public class BillingSyncRateLimitInterceptor implements HandlerInterceptor {

    private static final long WINDOW_MS = 60_000;
    private static final String AGGREGATE_KEY = "__aggregate__";

    private final int maxPerUserPerMinute;
    private final int maxAggregatePerMinute;
    private final ObjectMapper objectMapper;
    private final Clock clock;
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Autowired
    public BillingSyncRateLimitInterceptor(ObjectMapper objectMapper,
                                           @Value("${tubeshadow.rate-limit.billing-sync-per-user-per-minute:5}") int maxPerUserPerMinute,
                                           @Value("${tubeshadow.rate-limit.billing-sync-aggregate-per-minute:120}") int maxAggregatePerMinute) {
        this(objectMapper, maxPerUserPerMinute, maxAggregatePerMinute, Clock.systemUTC());
    }

    BillingSyncRateLimitInterceptor(ObjectMapper objectMapper, int maxPerUserPerMinute,
                                    int maxAggregatePerMinute, Clock clock) {
        this.objectMapper = objectMapper;
        this.maxPerUserPerMinute = maxPerUserPerMinute;
        this.maxAggregatePerMinute = maxAggregatePerMinute;
        this.clock = clock;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long now = Instant.now(clock).toEpochMilli();
        if (!tryConsume(subjectKey(request), now) || !tryConsume(AGGREGATE_KEY, now)) {
            response.setStatus(429);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            objectMapper.writeValue(response.getOutputStream(),
                    ApiResponse.fail(new ApiResponse.ApiError("RATE_LIMITED",
                            "동기화 요청이 너무 잦습니다. 잠시 후 다시 시도해주세요.")));
            return false;
        }
        return true;
    }

    private boolean tryConsume(String key, long now) {
        int limit = AGGREGATE_KEY.equals(key) ? maxAggregatePerMinute : maxPerUserPerMinute;
        Bucket bucket = buckets.computeIfAbsent(key, k -> new Bucket(now));
        synchronized (bucket) {
            if (now - bucket.windowStartMs >= WINDOW_MS) {
                bucket.windowStartMs = now;
                bucket.count.set(0);
            }
            return bucket.count.incrementAndGet() <= limit;
        }
    }

    String subjectKey(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof AuthenticatedUser user) {
            return "u:" + user.id();
        }
        return "ip:" + request.getRemoteAddr();
    }

    private static final class Bucket {
        volatile long windowStartMs;
        final AtomicInteger count = new AtomicInteger(0);

        Bucket(long windowStartMs) {
            this.windowStartMs = windowStartMs;
        }
    }
}
