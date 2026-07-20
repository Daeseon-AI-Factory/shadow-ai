package com.tubeshadow.billing.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * One capability grant for one user from one source in one billing environment
 * (docs/MONETIZATION-DESIGN.md §6.1). Product code never sees vendor SKU strings — only
 * {@link Capability}. The composite key is deliberate: a RevenueCat snapshot write may only touch
 * {@code source = REVENUECAT} rows, so a store test purchase can never clobber an admin grant,
 * and sandbox rows can coexist with production rows without merging.
 */
@Entity
@Table(name = "user_entitlements")
@IdClass(UserEntitlement.Key.class)
public class UserEntitlement extends BaseEntity {

    public enum Capability { SHADOW_ACCESS, AI_ACCESS }

    /**
     * LEGACY_WEBHOOK is the PAY-1 bridge for the generic set-plan webhook — kept separate from
     * ADMIN_GRANT so a legacy plan decision can never overwrite or revoke a real operator grant
     * (PAY-2). Retired together with the webhook in PAY-2 (§6.3 step 5).
     */
    public enum Source { REVENUECAT, ADMIN_GRANT, MIGRATION, LEGACY_WEBHOOK }

    public enum Environment { SANDBOX, PRODUCTION }

    public enum Status { ACTIVE, INACTIVE }

    @Id
    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "capability", nullable = false, length = 40, updatable = false)
    private Capability capability;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false, length = 20, updatable = false)
    private Source source;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "environment", nullable = false, length = 20, updatable = false)
    private Environment environment;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status;

    /** Null = deliberately non-expiring (admin/migration grants only — see §6.1 rules). */
    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "provider_customer_id", length = 255)
    private String providerCustomerId;

    @Column(name = "last_provider_event_at")
    private Instant lastProviderEventAt;

    @Column(name = "last_verified_at", nullable = false)
    private Instant lastVerifiedAt;

    protected UserEntitlement() {
    }

    private UserEntitlement(UUID userId, Capability capability, Source source,
                            Environment environment, Status status, Instant expiresAt, Instant now) {
        this.userId = userId;
        this.capability = capability;
        this.source = source;
        this.environment = environment;
        this.status = status;
        this.expiresAt = expiresAt;
        this.lastVerifiedAt = now;
    }

    public static UserEntitlement of(UUID userId, Capability capability, Source source,
                                     Environment environment, Status status, Instant expiresAt,
                                     Instant now) {
        return new UserEntitlement(userId, capability, source, environment, status, expiresAt, now);
    }

    /** ACTIVE and unexpired right now. Expiry evaluation happens at read time, never by a job. */
    public boolean grantsAccessAt(Instant now) {
        return status == Status.ACTIVE && (expiresAt == null || expiresAt.isAfter(now));
    }

    public void update(Status status, Instant expiresAt, Instant now) {
        this.status = status;
        this.expiresAt = expiresAt;
        this.lastVerifiedAt = now;
    }

    public void deactivate(Instant now) {
        this.status = Status.INACTIVE;
        this.lastVerifiedAt = now;
    }

    public UUID getUserId() {
        return userId;
    }

    public Capability getCapability() {
        return capability;
    }

    public Source getSource() {
        return source;
    }

    public Environment getEnvironment() {
        return environment;
    }

    public Status getStatus() {
        return status;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public Instant getLastVerifiedAt() {
        return lastVerifiedAt;
    }

    /** Composite primary key — plain value object required by @IdClass. */
    public static class Key implements Serializable {
        private UUID userId;
        private Capability capability;
        private Source source;
        private Environment environment;

        public Key() {
        }

        public Key(UUID userId, Capability capability, Source source, Environment environment) {
            this.userId = userId;
            this.capability = capability;
            this.source = source;
            this.environment = environment;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) {
                return true;
            }
            if (!(o instanceof Key key)) {
                return false;
            }
            return Objects.equals(userId, key.userId) && capability == key.capability
                    && source == key.source && environment == key.environment;
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, capability, source, environment);
        }
    }
}
