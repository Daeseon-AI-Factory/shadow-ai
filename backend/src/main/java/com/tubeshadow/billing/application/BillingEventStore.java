package com.tubeshadow.billing.application;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

/**
 * Idempotency/audit ledger for provider webhook events (§6.2). Plain JDBC on purpose: the whole
 * point of this table is a race-safe "insert if not seen before" under concurrent webhook
 * redelivery, which {@code INSERT ... ON CONFLICT DO NOTHING} gives for free — a JPA
 * exists-then-insert round trip would reintroduce the race.
 */
@Repository
public class BillingEventStore {

    private final JdbcTemplate jdbc;

    public BillingEventStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** @return true if this event was newly recorded; false if it is a duplicate delivery. */
    public boolean recordIfNew(String provider, String providerEventId, String eventType,
                               String appUserId, String environment, Instant occurredAt, Instant receivedAt) {
        int rows = jdbc.update("""
                INSERT INTO billing_events
                    (provider, provider_event_id, event_type, app_user_id, environment,
                     occurred_at, received_at, processing_status, attempt_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'RECEIVED', 1)
                ON CONFLICT (provider, provider_event_id) DO NOTHING
                """,
                provider, providerEventId, eventType, appUserId, environment,
                Timestamp.from(occurredAt), Timestamp.from(receivedAt));
        return rows == 1;
    }

    /**
     * Status of a previously-seen event, for the redelivery path: {@code PROCESSED} means truly
     * done (skip); {@code RECEIVED} or {@code FAILED} means the last attempt never completed, so
     * redelivery should retry processing rather than silently no-op (real retry behavior, §6.2).
     */
    public Optional<String> statusOf(String provider, String providerEventId) {
        try {
            return Optional.of(jdbc.queryForObject(
                    "SELECT processing_status FROM billing_events WHERE provider = ? AND provider_event_id = ?",
                    String.class, provider, providerEventId));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public void markProcessed(String provider, String providerEventId) {
        jdbc.update("""
                UPDATE billing_events SET processing_status = 'PROCESSED'
                WHERE provider = ? AND provider_event_id = ?
                """, provider, providerEventId);
    }

    public void markFailed(String provider, String providerEventId, String errorCode) {
        jdbc.update("""
                UPDATE billing_events
                SET processing_status = 'FAILED', attempt_count = attempt_count + 1, last_error_code = ?
                WHERE provider = ? AND provider_event_id = ?
                """, errorCode, provider, providerEventId);
    }
}
