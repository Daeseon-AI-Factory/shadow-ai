-- PAY-1 capability core: provider-neutral entitlements replace the users.plan single-column gate.
-- One row per (user, capability, source, environment); a capability is active when ANY row in the
-- server's billing environment is ACTIVE and unexpired. The composite key lets sandbox and
-- production state — and provider rows vs admin/migration grants — coexist without overwriting
-- each other. See docs/MONETIZATION-DESIGN.md §6.
CREATE TABLE user_entitlements (
    user_id                 UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    capability              VARCHAR(40)  NOT NULL,
    source                  VARCHAR(20)  NOT NULL,
    environment             VARCHAR(20)  NOT NULL DEFAULT 'PRODUCTION',
    status                  VARCHAR(20)  NOT NULL,
    expires_at              TIMESTAMP,
    provider_customer_id    VARCHAR(255),
    last_provider_event_at  TIMESTAMP,
    last_verified_at        TIMESTAMP    NOT NULL,
    created_at              TIMESTAMP    NOT NULL,
    updated_at              TIMESTAMP,
    PRIMARY KEY (user_id, capability, source, environment),
    CONSTRAINT chk_ue_capability  CHECK (capability IN ('SHADOW_ACCESS', 'AI_ACCESS')),
    CONSTRAINT chk_ue_source      CHECK (source IN ('REVENUECAT', 'ADMIN_GRANT', 'MIGRATION', 'LEGACY_WEBHOOK')),
    CONSTRAINT chk_ue_environment CHECK (environment IN ('SANDBOX', 'PRODUCTION')),
    CONSTRAINT chk_ue_status      CHECK (status IN ('ACTIVE', 'INACTIVE'))
);

CREATE INDEX idx_user_entitlements_user ON user_entitlements (user_id);

-- Backfill (§6.3 step 2): every currently non-free user keeps the capability set they already
-- had — old 'pro' means BOTH capabilities, never Shadow-only. Expiry is copied verbatim;
-- effectiveness is evaluated at read time, so an already-lapsed 'pro' backfills as an ACTIVE row
-- with a past expiry and reads as inactive — exactly how effectivePlan() treated it.
INSERT INTO user_entitlements
    (user_id, capability, source, environment, status, expires_at, last_verified_at, created_at)
SELECT u.id, c.capability, 'MIGRATION', 'PRODUCTION', 'ACTIVE', u.plan_valid_until, now(), now()
FROM users u
CROSS JOIN (VALUES ('SHADOW_ACCESS'), ('AI_ACCESS')) AS c(capability)
WHERE u.plan <> 'free';
