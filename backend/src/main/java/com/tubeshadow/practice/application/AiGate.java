package com.tubeshadow.practice.application;

import com.tubeshadow.billing.application.AccessPolicy;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Thin compatibility facade kept so the eleven existing PracticeController call sites (and their
 * tests) survive PAY-1 unchanged. The actual decision moved to {@link AccessPolicy#requireAi}:
 * capability rows in {@code user_entitlements}, not {@code users.plan}, plus the owner/tester
 * email override. Same 403 {@code AI_NOT_ALLOWED} contract as before.
 */
@Component
public class AiGate {

    private final AccessPolicy accessPolicy;

    public AiGate(AccessPolicy accessPolicy) {
        this.accessPolicy = accessPolicy;
    }

    /** Throw 403 unless the user may commit AI cost. Delegates to {@link AccessPolicy#requireAi}. */
    public void assertEntitled(UUID userId) {
        accessPolicy.requireAi(userId);
    }
}
