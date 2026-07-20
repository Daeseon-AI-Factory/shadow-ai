package com.tubeshadow.auth.api.dto;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.billing.application.EntitlementService;

import java.time.Instant;
import java.util.UUID;

/** Typed body for GET /api/auth/me (replaces an untyped Map → documented in OpenAPI, type-safe). */
public record MeResponse(UUID id, String email, String displayName, Instant createdAt,
                         String plan, Instant planValidUntil, Entitlements entitlements) {

    public record EntitlementState(boolean active, Instant expiresAt) {
    }

    /** Additive block per docs/MONETIZATION-DESIGN.md §8.1 — old clients ignore unknown fields. */
    public record Entitlements(EntitlementState shadow, EntitlementState ai) {
    }

    public static MeResponse from(User user, EntitlementService.CapabilitySnapshot snapshot) {
        // Legacy mapping (§6.3 step 3): the old binary field reports 'pro' ONLY while AI_ACCESS is
        // active. A Shadow-only subscriber reads as legacy 'free' — shipped clients use the field
        // solely for the PRO badge, and 'pro' would wrongly imply AI on not-yet-updated builds.
        String legacyPlan = snapshot.aiActive() ? "pro" : "free";
        return new MeResponse(user.getId(), user.getEmail(), user.getDisplayName(), user.getCreatedAt(),
                legacyPlan, snapshot.aiExpiresAt(),
                new Entitlements(
                        new EntitlementState(snapshot.shadowActive(), snapshot.shadowExpiresAt()),
                        new EntitlementState(snapshot.aiActive(), snapshot.aiExpiresAt())));
    }
}
