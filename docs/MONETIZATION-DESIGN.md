# Mimi monetization and entitlement design

> Status: implementation specification, 2026-07-18 (America/Toronto)
>
> Repository snapshot inspected: `main` at `d33ec70c2a19adfede957c96cabb9724f37894d5`
>
> Scope: one Mimi app, iOS and Android in-app subscriptions, Spring JWT retained
>
> This document authorizes no store submission, production deployment, dependency installation,
> database migration, or paid-provider call by itself.

For the PAY track only, this document supersedes the binary `free/pro` target and the unresolved
D1/D2 notes in `docs/HANDOFF-2026-07-15.md`. The 2026-05 web MoR/PG memo remains historical context
for a future web sales track; it is not the mobile checkout design.

## 0. Read this first

The product does **not** sell access to YouTube videos. It sells Mimi's independent learning
workflow around a video:

> **Select and repeat a range, record a take, compare it with the original, save it, and review it
> again before it is forgotten.**

AI is a separate upper layer that explains, transcribes, grades, generates, and holds live speaking
sessions. The app remains one binary and exposes three access states:

```text
Free Preview  -> experience the method
Shadow        -> use the complete non-AI training workflow
AI            -> use Shadow plus model-backed coaching
```

The owner explicitly confirmed the paid object as Mimi's repeat, record, compare, save, and review
tools. This is the non-negotiable product boundary for every implementation track.

### 0.1 Decision status

| Decision | Status | Implementation consequence |
| --- | --- | --- |
| Charge for Mimi tools, not YouTube viewing | **OWNER CONFIRMED** | Never describe the subscription as payment to watch YouTube content. |
| One app with Free Preview, Shadow, and AI | **IMPLEMENTATION DEFAULT** | Do not create separate free/AI binaries or duplicate stores. |
| Mobile purchase rail | **IMPLEMENTATION DEFAULT: Apple/Google IAP through RevenueCat** | No Lemon Squeezy, Paddle, Stripe, Toss, or web checkout link inside the mobile app. |
| Authentication | **IMPLEMENTATION DEFAULT: keep Spring JWT** | Use the existing Mimi user UUID as the external billing App User ID. Do not migrate to Supabase for this track. |
| Free Preview shape | **DEFAULT, OWNER MAY OVERRIDE BEFORE PAY-3** | Use a fixed guided sample and a non-paid normal playback path; do not implement a permanent ad-funded full tier. |
| Shadow monthly price | **EXAMPLE, NOT APPROVED SKU PRICE** | `KRW 8,800` is a pricing hypothesis only. Never hardcode it in the app. |
| Shadow annual price | **EXAMPLE, NOT APPROVED SKU PRICE** | Targeting a 5,000-won-range monthly equivalent is a hypothesis only. |
| AI price and fair-use limit | **OPEN** | Do not activate a public AI product until model cost and a configurable safety limit are set. |
| YouTube caption acquisition for paid public use | **OPEN LAUNCH GATE** | Current scraping-based path must not be silently treated as commercially cleared. |

If the owner tells a development agent only `진행`, the implementation defaults above apply. Exact
store price, introductory offer, trial duration, and AI quota still require explicit values before
real products are activated.

## 1. Goals and non-goals

### 1.1 Goals

1. Let a learner understand Mimi's method before paying.
2. Sell the complete non-AI shadowing workflow independently of AI.
3. Sell AI as a clear upper tier without making non-AI users subsidize model use.
4. Enforce paid access on the backend, including asynchronous AI work.
5. Keep purchase state consistent across iOS, Android, reinstalls, and multiple devices.
6. Preserve account deletion, data export, and access to already-created user data after expiry.
7. Keep the payment provider replaceable: product code consumes business capabilities, not vendor
   SKU strings.

### 1.2 Non-goals for the first monetization release

- Separate Mimi Free and Mimi AI apps.
- Ads, interstitials on every session, rewarded ads, or an ad-removal SKU.
- Mobile web checkout or an in-app link to an external checkout.
- Supabase authentication migration.
- AI credit packs, consumable tokens, team plans, family plans, or lifetime products.
- My Voice, new writing games, discover feed work, or unrelated UX redesign.
- Claiming that the current YouTube caption extraction is legally or contractually cleared.
- Production deployment or store submission without the release gates in section 15.

## 2. Verified repository state

The following statements were read directly from the repository snapshot named above.

1. `V18__user_plan.sql` allows only `free` and `pro`.
2. `User.effectivePlan(now)` treats every non-`free` value as paid while it is unexpired; a non-free
   row with no expiry is treated as non-expiring.
3. `AiGate.assertEntitled(userId)` permits every effective non-free plan and an owner/tester email
   override.
4. All `AiGate.assertEntitled` call sites are currently in `PracticeController`.
5. `ClipAnalysisService.onClipCreated` starts model-backed analysis after a clip is created, and
   `ClipAnalysisController.regenerate` starts it again, but neither path calls `AiGate`.
6. `/api/billing/webhook` accepts a generic `{userId, plan, planValidUntil, customerId}` decision
   after a shared-secret check. It is a skeleton, not a RevenueCat event adapter.
7. `mobile/package.json` does not contain `react-native-purchases` or another IAP SDK.
8. Mobile Settings renders only `FREE` or `PRO`; Speaking and Write translate `AI_NOT_ALLOWED` into
   invite-only screens.
9. Mimi authentication is the repository's Spring Security JWT flow, and `/api/auth/me` already
   returns the user's UUID.
10. `BLOCKERS.md` records the arbitrary-public-video caption path as watch-HTML / timedtext
    extraction with commercial Terms-of-Service risk.

Consequences:

- Adding `shadow` to the existing `plan` check without changing `AiGate` would grant AI to Shadow.
- Changing only the mobile UI would be bypassable because protected APIs would not share the same
  capability policy.
- Gating only `PracticeController` would still allow automatic and regenerated clip analysis to
  spend model capacity.
- A retried identical generic webhook is harmless, but a simple overwrite does not by itself prove
  safe handling of old events arriving after new ones.

Historical memory references:

- `startup-mpvru0xh-kj5n/work_item/agent-5e459c48b90e04fe`
- `startup-mpvru0xh-kj5n/structure/agent-b16c016668805ea3`
- `startup-mpvru0xh-kj5n/change/6d397985ff6c8c465f009c70cbb4b965b36ad68f`

## 3. Product packages

### 3.1 Capability names

Business code uses two cumulative capabilities:

```text
SHADOW_ACCESS
AI_ACCESS
```

The derived display tier is:

```text
AI_ACCESS active       -> AI
SHADOW_ACCESS active   -> Shadow
neither active         -> Free Preview
```

`AI_ACCESS` does not implicitly bypass the need to record `SHADOW_ACCESS` in provider configuration.
The AI products should grant both capabilities so dashboards and backend snapshots remain explicit.

### 3.2 Feature matrix

| Capability or action | Free Preview | Shadow | AI |
| --- | :---: | :---: | :---: |
| Sign up, sign in, account deletion, privacy/terms | Yes | Yes | Yes |
| Normal embedded video playback | Yes | Yes | Yes |
| Fixed guided Mimi sample | Limited | Yes | Yes |
| Precise range selection and repeat controls | Sample only | Yes | Yes |
| Playback speed as a Mimi training control | Sample only | Yes | Yes |
| Create and edit personal clips | No | Yes | Yes |
| Personal clip library and search | Existing data read-only | Yes | Yes |
| On-device shadowing recording and original/take A/B | Sample only | Yes | Yes |
| Save/upload recordings | No | Yes | Yes |
| Dictation and reorder using already-held transcript data | Sample only | Yes | Yes |
| SRS queue, grading, streak, and review scheduling | No new progress | Yes | Yes |
| Non-AI practice packs | Limited sample | Yes | Yes |
| Read AI material generated while previously entitled | Existing data only | Existing data only | Yes |
| Generate/regenerate clip analysis and translations | No | No | Yes |
| STT pronunciation/transcription check | No | No | Yes |
| AI writing check, mix, story, transforms, scenario check | No | No | Yes |
| AI mock interview and live Speaking/Sparring | No | No | Yes |
| Data export and deletion | Yes | Yes | Yes |
| Purchase restore and subscription management | Yes | Yes | Yes |

The table separates **reading already-created user assets** from **creating new paid work**. Expiry
must not trap a learner's account or prevent deletion/export. Cached AI explanations created during
an active AI subscription remain readable because reading them causes no new model call; new AI
generation remains locked.

### 3.3 Free Preview default

The default preview is not a normal permanent free plan and not an ad tier. It consists of:

- a fixed, rights-reviewed sample that demonstrates line selection, loop, recording, and A/B;
- a normal non-paid playback path that does not claim to sell the embedded video;
- clear locked states on personal Shadow tools and AI actions;
- no arbitrary permanent quota encoded into application constants.

If the owner later chooses a store-managed introductory trial, add it to the store catalog without
changing the business capability model. Do not implement both a complex app-side time trial and a
store trial in the first release.

## 4. Policy boundary

### 4.1 Mobile payments

Mimi unlocks digital app functionality. The mobile implementation therefore uses Apple In-App
Purchase and Google Play Billing, with RevenueCat as the initial cross-platform adapter.

- Apple App Review Guideline 3.1.1 says unlocking app features or functionality must use IAP.
- Google Play's Payments policy says Play-distributed apps charging for in-app features,
  subscriptions, or app functionality must use Play Billing unless a named program exception
  applies.

Implementation rule: mobile UI must not include a Lemon Squeezy, Paddle, Stripe, Toss, or other web
checkout button/link. Region-specific alternative billing is a separate legal/operational project,
not a shortcut inside this track.

### 4.2 YouTube boundary

The paywall sells Mimi's independent tools, not playback of YouTube content. Product copy, paywall
copy, App Review notes, and support answers must use that distinction consistently.

YouTube's current developer policy says an API client must not charge users to watch content in an
embedded player and separately prohibits scraping YouTube applications or obtaining scraped
YouTube data. The repository's current caption path remains an explicit public-paid-launch gate.

Do not write `YouTube Premium`, `paid YouTube access`, `unlock this video`, or equivalent copy.
Do not claim that using a third-party transcript vendor automatically resolves the underlying
rights or policy question.

Before public paid launch, select and verify one permitted caption/content route, such as:

- owner-controlled or licensed videos and captions;
- user-authorized content where the relevant API permission permits caption access;
- a manual-range workflow with user-provided transcript text;
- another route reviewed against the then-current YouTube terms and the actual implementation.

This document is product/engineering design, not legal advice.

## 5. Architecture

```text
Mimi Spring JWT login
        |
        | /api/auth/me -> stable Mimi user UUID
        v
RevenueCat SDK identified with that UUID
        |
        +---------- Apple App Store product
        +---------- Google Play product
        |
        +--> CustomerInfo: immediate client purchase/restore feedback
        |
        +--> authenticated RevenueCat webhook
                    |
                    v
           server fetches current subscriber snapshot
                    |
                    v
        user_entitlements + billing_events
                    |
                    v
               AccessPolicy
          /                         \
 requireShadow(userId)       requireAi(userId, feature)
          |                         |
 non-AI training APIs       every model-backed sync/async path
```

### 5.1 Sources of truth

| Concern | Source of truth |
| --- | --- |
| Was a store purchase validated? | Apple/Google as normalized by RevenueCat |
| What should the app show immediately after purchase? | RevenueCat `CustomerInfo`, then server refresh |
| May a protected backend action run? | Mimi backend entitlement snapshot and `AccessPolicy` |
| Which store SKU maps to which capability? | RevenueCat product/entitlement configuration |
| What does product code understand? | `SHADOW_ACCESS` and `AI_ACCESS`, never vendor product IDs |

The client is not the security authority. A modified client cannot grant itself a backend
capability. The backend is not a card processor and stores no payment credentials.

### 5.2 Authentication decision

Retain Mimi's Spring JWT. Configure or log into RevenueCat only after `/api/auth/me` provides the
stable user UUID. Use that UUID as the custom App User ID; never use email, a hardcoded ID, or a
device advertising identifier.

This direct integration does not require Supabase. If a separate shared platform is chosen later
and that platform requires Supabase tokens, that is a different integration and a new D2 decision.

Authenticated purchases only are the default. Account switching, logout, reinstall, and restore
must be tested explicitly because RevenueCat can otherwise create or merge anonymous identities.

### 5.3 Provider boundary

Backend business logic depends on a provider-neutral interface, for example:

```text
BillingEntitlementProvider
  fetchSnapshot(externalUserId)
  -> active capabilities, expiries, environment, provider event cursor
```

The first adapter is RevenueCat. No controller, `AiGate` replacement, clip service, or mobile
feature should compare Apple/Google SKU strings directly. Provider API keys and entitlement names
are environment/config values, not hardcoded secrets.

## 6. Persistence design

Reserve the next Flyway version after the current `V20`; verify again immediately before creating
the migration so parallel work does not reuse the same number.

### 6.1 `user_entitlements`

Proposed columns:

```text
user_id                 UUID FK users(id)
capability              VARCHAR  // SHADOW_ACCESS | AI_ACCESS
status                  VARCHAR  // ACTIVE | INACTIVE
expires_at              TIMESTAMP NULL
source                  VARCHAR  // REVENUECAT | ADMIN_GRANT | MIGRATION
provider_customer_id    VARCHAR NULL
environment             VARCHAR NULL  // SANDBOX | PRODUCTION for provider rows
last_provider_event_at  TIMESTAMP NULL
last_verified_at        TIMESTAMP NOT NULL
created_at              TIMESTAMP NOT NULL
updated_at              TIMESTAMP NOT NULL
PRIMARY KEY (user_id, capability)
```

Rules:

- `expires_at = null` is allowed only for a deliberately non-expiring admin/migration grant. A
  missing subscription expiry must not accidentally create lifetime access.
- Production and sandbox state must never be merged blindly.
- Account deletion must cascade through this table and its regression test.
- Access checks use a caller-provided/testable `Clock`, not scattered `Instant.now()` calls.

### 6.2 `billing_events`

Proposed columns:

```text
provider                VARCHAR
provider_event_id       VARCHAR
event_type              VARCHAR
app_user_id             VARCHAR
environment             VARCHAR
occurred_at             TIMESTAMP
received_at             TIMESTAMP
processing_status       VARCHAR  // RECEIVED | PROCESSED | FAILED
attempt_count           INTEGER
last_error_code         VARCHAR NULL
payload_hash            VARCHAR NULL
PRIMARY KEY (provider, provider_event_id)
```

Store only what is required for idempotency, audit, and retry. Do not log provider secrets or dump
raw receipts into application logs. A unique provider event ID handles duplicate deliveries; the
fresh provider snapshot, rather than applying event deltas directly, prevents an old cancellation
event from overwriting a newer renewal.

### 6.3 Migration from `users.plan`

Use a compatibility phase:

1. Create the new tables and capability service.
2. Backfill currently effective `pro` users as both `SHADOW_ACCESS` and `AI_ACCESS` with the existing
   expiry and `MIGRATION` source.
3. Make `/api/auth/me` return new entitlement data while retaining old `plan` fields temporarily.
4. Change every access decision to the new `AccessPolicy`.
5. Remove production writes through the generic set-plan endpoint.
6. Remove or deprecate `users.plan`, `plan_valid_until`, and `billing_customer_id` only in a later,
   separately verified migration after every client has moved.

Never reinterpret old `pro` as Shadow-only; existing entitled testers must retain the capability
set they already had.

## 7. Backend access policy

### 7.1 Required services

```text
EntitlementService
  snapshot(userId, now)
  has(userId, capability, now)

AccessPolicy
  requireShadow(userId)
  requireAi(userId, feature)
```

Recommended error contract:

```text
403 SHADOW_REQUIRED
403 AI_REQUIRED
```

Keep `AI_NOT_ALLOWED` as a temporary client compatibility alias if needed, but new UI should map a
typed access reason to the correct paywall rather than an invite-only screen.

### 7.2 Shadow enforcement points

Enforce on backend operations that create or advance the paid personal workflow, including:

- personal clip create/update;
- recording upload/create;
- creation or grading of paid review/SRS progress;
- server-backed paid practice progression;
- any new server endpoint introduced for paid Shadow tools.

Do not block account deletion, export, subscription management, or deletion of user-owned data.
Read-only access to previously saved assets follows the matrix in section 3.

Purely local controls still need a client paywall for product behavior, but their server-adjacent
effects must remain protected so a patched client cannot persist paid work.

### 7.3 AI enforcement points

Every path that can call a configured model or allocate paid realtime capacity must call
`requireAi` before the cost is committed. This includes:

- all eleven current `PracticeController` AI routes;
- automatic analysis in `ClipAnalysisService.onClipCreated`;
- `ClipAnalysisController.regenerate`;
- future retry/requeue/admin paths that can reach `AiAnalysisClient`;
- STT upload/transcription;
- realtime session minting and reports.

For Shadow users creating a clip, do not leave an eternal `PENDING` analysis row. Either create no
analysis row or store an explicit non-pending locked state. The mobile analysis tab should show an
AI upgrade explanation, not a spinner.

### 7.4 Owner/tester access

Replace the email allowlist's role as a hidden pseudo-plan with an explicit admin-grant source or a
well-isolated compatibility adapter. Production access behavior must be inspectable in the same
entitlement snapshot the user sees. Never expose a client control that can create an admin grant.

## 8. Billing API contract

### 8.1 `GET /api/auth/me`

Add a backward-compatible entitlement block:

```json
{
  "entitlements": {
    "shadow": {
      "active": true,
      "expiresAt": "2026-08-18T00:00:00Z"
    },
    "ai": {
      "active": false,
      "expiresAt": null
    }
  }
}
```

Do not return payment receipts or provider secrets. The client derives its badge from this block.

### 8.2 RevenueCat webhook

Introduce a provider-specific adapter endpoint instead of teaching the existing generic webhook to
trust arbitrary client-shaped plan updates.

Requirements:

- verify the configured authorization header on every request;
- enable and verify RevenueCat HMAC signing if the selected account/configuration supports it;
- parse the event ID, app user ID, environment, event type, and occurrence time;
- insert the event idempotently;
- fetch the current subscriber snapshot from RevenueCat;
- map provider entitlements to `SHADOW_ACCESS` and `AI_ACCESS` transactionally;
- record a retryable failure without granting access on malformed/unverified input;
- never accept a caller-supplied Mimi `userId + capability` decision from the mobile client.

RevenueCat recommends fetching the subscriber snapshot after webhook events rather than writing
different state-transition logic for every event type. Follow that snapshot model.

### 8.3 Authenticated sync

Add a rate-limited authenticated endpoint for purchase/restore convergence:

```text
POST /api/billing/sync
Authorization: Bearer <Mimi JWT>
```

The server derives the user ID from the JWT, fetches that user's provider snapshot, updates local
entitlements, and returns the same entitlement shape as `/me`. It never accepts an arbitrary target
user ID. Use it after a client purchase or restore so UI does not wait only for webhook delivery.

## 9. RevenueCat and store catalog

### 9.1 Entitlements

Create two RevenueCat entitlements corresponding to the business capabilities:

```text
shadow_access
ai_access
```

An AI product grants both. RevenueCat supports one product unlocking multiple entitlements.

### 9.2 Product identifiers

The following are placeholders until App Store Connect and Play Console reserve the real IDs:

```text
mimi_shadow_monthly
mimi_shadow_annual
mimi_ai_monthly
mimi_ai_annual
```

Rules:

- monthly and annual products for the same tier grant the same capability set;
- the app displays localized store-returned price strings, never a hardcoded KRW value;
- changing an Offering must not require an app update;
- sandbox and production products are visibly separated during validation;
- no public AI Offering becomes active until price, fair-use rule, and cost guard are approved.

## 10. Mobile implementation

### 10.1 SDK lifecycle

- Add the RevenueCat React Native SDK only after dependency approval.
- Expo IAP requires a native development build; Expo Go is not a valid purchase test surface.
- Use separate public SDK keys per iOS and Android configuration.
- Initialize identity only after the authenticated Mimi UUID is known.
- Prevent purchase UI from operating under an unintended anonymous user.
- Clear all user-scoped query and purchase presentation state on account switch.
- Test reinstall, restore, logout/login, and switching between two Mimi accounts.

### 10.2 Client modules

Recommended layers:

```text
mobile/src/lib/billing/config.ts          // public keys and provider config, no secret
mobile/src/lib/billing/client.ts          // provider adapter
mobile/src/lib/billing/use-entitlements.ts
mobile/src/components/paywall/*
mobile/src/app/paywall.tsx                // route or modal host
```

Names may adapt to existing repository conventions, but provider calls must not be scattered across
feature screens.

### 10.3 Paywall entry points

Show a paywall at a high-intent action, not on every app launch:

- after completing the guided sample;
- when a Free Preview user first attempts a personal Shadow tool;
- when a Free/Shadow user taps an AI action;
- from the plan card in Settings.

The paywall receives a reason (`shadow_tool`, `ai_analysis`, `speaking`, `write`, etc.) and opens the
appropriate tier explanation. Replace invite-only copy only when purchase and restore are actually
functional in the build.

### 10.4 Required paywall states

- offerings loading;
- localized products available;
- no offering/product returned;
- purchase pending/deferred;
- user cancelled without an error alert;
- store/network failure with retry;
- purchase succeeded but backend sync is pending;
- restore succeeded with entitlement;
- restore found no purchase;
- already entitled;
- subscription expired or billing issue, using provider-returned state.

### 10.5 Required copy

Shadow promise:

> Repeat the exact range you choose, record your take, compare it with the original, save useful
> clips, and review them again before you forget.

AI promise:

> Everything in Shadow, plus AI explanations, transcription feedback, speaking sparring, and
> writing checks.

Avoid copy that says or implies that Mimi sells the YouTube video itself. All strings go through
the existing Korean/English i18n system and all colors use theme tokens.

### 10.6 Settings

Replace the binary `FREE/PRO` badge with:

- Free Preview, Shadow, or AI;
- renewal/expiry information when the provider exposes it safely;
- Restore Purchases;
- Manage Subscription using the correct purchase platform route;
- Terms, Privacy, support contact, data export, and account deletion;
- a copyable non-sensitive support identifier.

## 11. Expiry, cancellation, restore, and account deletion

### 11.1 Cancellation and expiry

- Cancellation normally leaves capability active until the verified paid period ends.
- On expiry, new Shadow or AI work is blocked according to the feature matrix.
- Previously saved clips, recordings, cached AI output, export, and deletion remain reachable.
- A temporary provider/network outage must not create lifetime access; any grace behavior must come
  from explicit provider state or an approved bounded server policy.

### 11.2 Restore

- Restore is visible from the paywall and Settings.
- Successful restore triggers authenticated backend sync before protected APIs are considered
  current.
- A restore on one Mimi account must not silently grant a second Mimi account access. Account
  transfer policy must be chosen and tested in RevenueCat before release.

### 11.3 Account deletion

Account deletion must remove local entitlement/event rows associated with the user and follow the
existing user-data cascade tests. Store subscription cancellation is a distinct platform action;
the UI must explain that distinction rather than claiming account deletion automatically cancels a
store subscription unless that behavior has been verified.

## 12. AI usage safety

Entitlement answers **who may call AI**; it does not answer **how much they may spend**.

Before activating a public AI product:

1. measure per-feature provider usage and cost with real provider responses;
2. define a configurable fair-use limit or budget guard;
3. meter by stable user ID and feature without storing raw learner audio/text unnecessarily;
4. return a typed limit error distinct from `AI_REQUIRED`;
5. keep owner/test traffic separable from paid-customer usage;
6. add an operational kill switch that disables new paid AI calls without disabling Shadow.

No exact quota belongs in this document until cost evidence exists.

## 13. Observability and product evidence

Do not add a new analytics vendor as part of entitlement plumbing. First record privacy-conscious
server/client events through the existing logging/metrics boundary:

```text
preview_started
preview_completed
paywall_viewed {reason, offered_tier}
purchase_started {tier, period, platform}
purchase_result {success|cancelled|failed|pending}
restore_result
entitlement_sync_result
shadow_tool_blocked
ai_action_blocked
paid_shadow_session_completed
paid_ai_action_completed {feature}
```

Never log JWTs, receipts, raw audio, full transcripts, provider secrets, or a store account email.

Verification levels remain separate:

- **Function:** purchase, restore, sync, access checks, and expiry behave as specified.
- **Quality:** paywall and training flow are legible, honest, localized, and recover from failures.
- **Product/workflow:** learners complete the preview, buy, and repeatedly use Shadow or AI.

A passing unit test establishes only function-level evidence.

## 14. Development tracks and dependencies

Work on one track at a time unless the owner explicitly authorizes parallel work. Every developer
starts from the current `main`, reads `CLAUDE.md`, `ROADMAP.md`, `BLOCKERS.md`, the current handoff,
and this document, and preserves unrelated user changes.

### PAY-1 — Capability core and AI-hole closure

**May start now.**

Targets:

- next Flyway migration (re-check that `V21` is still free);
- entitlement domain/repository/service/access policy;
- `User`/`MeResponse` compatibility;
- replacement of `AiGate` decisions;
- `ClipAnalysisService` automatic analysis gate;
- analysis regenerate gate;
- backend tests and account-deletion cascade test.

Acceptance:

- Free cannot create paid Shadow state or cause any model call.
- Shadow can use non-AI paid APIs and cannot cause any model call.
- AI can use both sets.
- Expired entitlements fail closed at the correct boundary.
- Existing effective `pro` users migrate to both capabilities.
- Previously generated assets remain readable as specified.
- Full backend tests pass.

### PAY-2 — Provider adapter and server sync

Depends on PAY-1 and RevenueCat project credentials/configuration supplied by the owner.

Targets:

- provider-neutral billing adapter;
- RevenueCat snapshot client;
- authenticated/HMAC webhook adapter;
- idempotent event persistence and retry behavior;
- authenticated `/api/billing/sync` with rate limiting;
- contract/integration tests with mocked provider HTTP.

No live purchase or production webhook is required for unit/integration completion.

### PAY-3 — Mobile SDK, paywall, restore, and Settings

Depends on PAY-1 API contract; real store testing also depends on PAY-2 and catalog setup.

Targets:

- approved RevenueCat React Native dependency and native config;
- authenticated billing client layer;
- entitlement query/cache;
- Shadow and AI paywall states;
- invite-only replacement;
- restore/manage subscription/Settings;
- i18n and theme-token compliance.

Acceptance:

- iOS and Android development builds compile.
- Store prices come from offerings.
- No external checkout link exists.
- Account switch and sign-out do not show the previous user's entitlement.
- `tsc` and relevant lint checks pass.

### PAY-4 — Store catalog and sandbox end to end

Owner action plus engineering verification.

- reserve exact iOS and Google product IDs;
- set approved localized prices and periods;
- attach products to the correct RevenueCat entitlements;
- configure sandbox/production webhooks and secrets;
- exercise buy, cancel, pending, renew, expire, refund/revoke, restore, reinstall, and account switch;
- verify both stores independently on physical devices or valid store test surfaces.

### PAY-5 — AI cost guard

Depends on measured provider use and the owner's approved fair-use policy.

- per-user/feature usage meter;
- configurable limit and typed limit response;
- budget/kill switch;
- monitoring and owner/test separation;
- no public AI Offering until this gate passes.

### PAY-6 — Policy and release packet

Depends on the YouTube caption/content launch gate and completed PAY-1 through PAY-5 for the sold
tiers.

- update App Store and Play metadata to disclose paid features accurately;
- update App Review notes and provide a fully entitled demo account;
- update privacy/terms/support/refund/subscription copy;
- capture new screenshots from the exact release build;
- run iOS and Android product-workflow smoke tests;
- submit only through the repository's approved release process.

## 15. Release gates

Public paid release is not a single build result. All applicable gates must pass:

### Function gates

- [ ] Capability migration and backfill verified on a production-like database copy.
- [ ] Free/Shadow/AI backend matrix covered by tests.
- [ ] Automatic clip analysis and regenerate cannot bypass AI access.
- [ ] Duplicate and out-of-order webhook scenarios converge to the latest provider snapshot.
- [ ] Purchase, restore, expiry, refund/revoke, reinstall, and account switch pass on iOS.
- [ ] The same scenarios pass on Android.
- [ ] Account deletion and data export remain available after expiry.

### Quality gates

- [ ] Paywall Korean and English copy is readable in light/dark mode on iOS and Android.
- [ ] Displayed price and period come from the store and match the selected product.
- [ ] Cancel/pending/network errors do not strand or falsely unlock the user.
- [ ] Free Preview demonstrates the independent Mimi tool value without claiming paid YouTube access.
- [ ] Existing data remains understandable after downgrade.

### Product/workflow gates

- [ ] A new user can complete the guided preview without founder assistance.
- [ ] A test purchaser can complete purchase, use a paid tool, reinstall, and restore.
- [ ] Shadow users understand why AI actions require a different tier.
- [ ] Initial preview/paywall/purchase/retention evidence is collected before declaring pricing
      validated.

### Policy/owner gates

- [ ] Owner approves exact Shadow and AI prices and introductory offer.
- [ ] Owner approves the AI fair-use rule.
- [ ] YouTube caption/content route is reviewed against the implementation and current terms.
- [ ] Store agreements, tax/banking, product records, and review contact data are complete.
- [ ] No web checkout link or unapproved alternative billing path is present in mobile.

## 16. Required owner inputs

These do not block PAY-1. They block the named later steps.

| Input | Blocks |
| --- | --- |
| RevenueCat project and iOS/Android public SDK configuration | PAY-2/PAY-3 live integration |
| RevenueCat backend secret/API access and webhook auth/HMAC values | PAY-2/PAY-4 |
| App Store Connect and Play product IDs | PAY-4 |
| Exact monthly/annual prices and any introductory offer | PAY-4 |
| AI price and fair-use/budget limit | PAY-5 and public AI sale |
| Free Preview override, if different from the fixed-sample default | PAY-3 |
| Caption/content policy route | PAY-6 public paid release |
| Store review demo credentials entered privately, never committed | PAY-6 |

## 17. Developer handoff and DONE_CANDIDATE format

Each track reports:

```text
DONE_CANDIDATE — PAY-N

Changed files
- ...

Function verification
- exact command
- exact exit/result

Quality verification
- exact device/surface and observed result

Product/workflow verification
- exact real flow tested, or [unverified]

Required invariants
- Free cannot persist paid Shadow work
- Shadow cannot trigger model/realtime cost
- AI can use both capability sets
- purchase state comes from provider/server, not client claims
- no external mobile checkout link

Remaining [unverified]
- ...
```

Every non-trivial implementation commit follows the repository's dual-log rule:

- `docs/troubleshooting.md`
- `content/logs/shadow-ai/<date>-<slug>.mdx`

Do not call a track complete because only unit tests passed. Store sandbox and real user workflow are
separate verification levels.

## 18. Official references checked on 2026-07-18

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play Payments policy: https://support.google.com/googleplay/android-developer/answer/9858738
- RevenueCat customer identity: https://www.revenuecat.com/docs/customers/identifying-customers
- RevenueCat entitlements: https://www.revenuecat.com/docs/getting-started/entitlements
- RevenueCat webhooks: https://www.revenuecat.com/docs/integrations/webhooks
- Expo in-app purchases: https://docs.expo.dev/guides/in-app-purchases/
- YouTube Developer Policies: https://developers.google.com/youtube/terms/developer-policies

Policies and SDK behavior can change. Re-open the official sources at implementation and release
time rather than treating this dated review as permanent legal or technical truth.
