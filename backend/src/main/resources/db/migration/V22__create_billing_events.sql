-- PAY-2 idempotency/audit ledger (docs/MONETIZATION-DESIGN.md §6.2). One row per provider event;
-- a webhook redelivery hits the same (provider, provider_event_id) and is a harmless no-op insert.
--
-- No FK to users: app_user_id is a raw provider identifier (may be a RevenueCat anonymous id that
-- never mapped to a Mimi account) and this table is a billing audit trail, so account deletion
-- deliberately does NOT cascade here — unlike user_entitlements, which does.
CREATE TABLE billing_events (
    provider           VARCHAR(20)  NOT NULL,
    provider_event_id  VARCHAR(255) NOT NULL,
    event_type         VARCHAR(60)  NOT NULL,
    app_user_id        VARCHAR(255) NOT NULL,
    environment        VARCHAR(20)  NOT NULL,
    occurred_at        TIMESTAMP    NOT NULL,
    received_at        TIMESTAMP    NOT NULL,
    processing_status  VARCHAR(20)  NOT NULL DEFAULT 'RECEIVED',
    attempt_count       INTEGER      NOT NULL DEFAULT 1,
    last_error_code    VARCHAR(60),
    payload_hash       VARCHAR(64),
    PRIMARY KEY (provider, provider_event_id),
    CONSTRAINT chk_be_environment CHECK (environment IN ('SANDBOX', 'PRODUCTION')),
    CONSTRAINT chk_be_status      CHECK (processing_status IN ('RECEIVED', 'PROCESSED', 'FAILED'))
);

CREATE INDEX idx_billing_events_app_user ON billing_events (app_user_id);
