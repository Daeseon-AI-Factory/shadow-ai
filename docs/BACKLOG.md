# MiMi — Engineering Backlog & Codex Handoff

> Audited 2026-07-13 from live code (real `file:line`, real integration points). Ordered by launch impact.
> **IDs (L1–L7, F1–F6, O1–O8, bug rows) are stable handles — assign work to Codex by ID.**
> Effort: S ≈ hours, M ≈ a day, L ≈ multi-day. Ship the 🔴 tier first.

## Parallelization plan (run these 4 tracks at once — each on its own branch)

Tracks own **disjoint file sets**, so 4 Codex tasks can run in parallel with clean merges. Inside a track, do items **in order** (dependencies). Paste one block per Codex task.

**Merge order:** land Track A's L1 first (L2/others depend on the timeout); other tracks touch different files so order is free. `docs/i18n-messages.ts` is a shared append point (Tracks A/B/D add strings) — resolve tiny append conflicts at merge.

<details><summary><b>Track A — Auth &amp; reliability</b> · branch <code>codex/track-a</code> · items L1 → L2 → L7</summary>

> Read `docs/BACKLOG.md`. Work **only on Track A**: implement **L1, then L2, then L7** in that order. Touch **only** these files: `packages/core/src/api/client.ts`, `mobile/src/app/_layout.tsx`, `mobile/src/lib/auth-store.ts`, `mobile/src/lib/secure-token.ts`, `mobile/src/lib/query-client.ts`, `mobile/src/app/(tabs)/index.tsx`, `mobile/src/app/onboarding.tsx`, and i18n strings. **Do NOT touch `sparring.tsx`, `PracticeController`, or the mutation screens — other tracks own them.** Follow the "Ground rules". After each item run its **Verify** steps. Commit on branch `codex/track-a` and add the `docs/troubleshooting.md` + `content/logs/shadow-ai/*.mdx` entries per `CLAUDE.md`.
</details>

<details><summary><b>Track B — Sparring</b> · branch <code>codex/track-b</code> · items L5 → F3 → F4 (→ L3)</summary>

> Read `docs/BACKLOG.md`. Work **only on Track B**: implement **L5, then F3, then F4**, then **L3** (403 UX for the sparring/compose paths) in that order. Touch **only**: `mobile/src/app/sparring.tsx`, `packages/core/src/practice-srs.ts` (F3 helper), the API-error shape in `packages/core/src/api/client.ts` **for L3's error-code detection only** (coordinate: Track A owns the rest of that file — keep your change to an exported error type/constant), and i18n strings. **Do NOT touch `_layout.tsx`, backend, or mutation screens.** Follow "Ground rules", run each **Verify**, branch `codex/track-b`, log per `CLAUDE.md`.
</details>

<details><summary><b>Track C — Backend</b> · branch <code>codex/track-c</code> · items F5, then F1 → F2 → F6</summary>

> Read `docs/BACKLOG.md`. Work **only on Track C** (backend): do **F5** first (isolated, `ClaudeClient`), then **F1 → F2 → F6** in order (all touch `PracticeController` so keep them sequential). Touch **only** `backend/**` (`PracticeController`, `CompositionService`, `practice/prompt/*`, `AiGate`, `SparringClient`, `ClaudeClient`, DTOs) plus the small client calls each feature needs in `mobile/src/app/sparring.tsx`/interview screens **only if unavoidable — prefer leaving client wiring as a follow-up note**. **DB migrations need explicit owner approval — do not create one without it (F6 credit ledger is out of scope; boolean plan-gating only).** Follow "Ground rules", run each **Verify** (`./gradlew test`), branch `codex/track-c`, log per `CLAUDE.md`.
</details>

<details><summary><b>Track D — Action feedback &amp; theming</b> · branch <code>codex/track-d</code> · items L4 → L6</summary>

> Read `docs/BACKLOG.md`. Work **only on Track D**: implement **L4, then L6**. Touch **only**: `mobile/src/app/video/[id].tsx`, `mobile/src/app/(tabs)/review.tsx`, `mobile/src/app/(tabs)/videos.tsx`, `mobile/src/components/drill-runner.tsx`, `mobile/src/components/interview-drill.tsx`, the form inputs in `login/signup/settings/import/compose/videos`, the shared theme hook, and i18n strings. **Do NOT touch `sparring.tsx`, `_layout.tsx`, `client.ts`, or backend.** Follow "Ground rules", run each **Verify**, branch `codex/track-d`, log per `CLAUDE.md`.
</details>

**Owner coordination:** while you (or Claude) are editing a track's files, don't also assign that track to Codex — same-file edits collide with a running agent too. Split by track: "this track = Codex, that track = me".

---

## Ground rules for the implementer

- **Stack:** backend = Java 21 / Spring Boot 3, pkg `com.tubeshadow`; mobile = Expo v56 / React Native (read the versioned Expo docs first, per `mobile/AGENTS.md`); shared logic in `packages/core` (TS strict, no `any`).
- **Secrets** never hardcoded — env / `~/.secrets` only; client bundles never carry keys.
- **DB schema changes** need a Flyway migration under `backend/src/main/resources/db/migration` **and** explicit owner approval (`CLAUDE.md` §5).
- **Every non-trivial change** gets a `docs/troubleshooting.md` entry + dated `content/logs/shadow-ai/*.mdx` in the same commit.
- **AI features are gated** (see F6) — any new AI endpoint must call the gate.

---

## 🔴 Launch blockers (7) — first impression + cost safety

### L1 — Global request timeout · reliability · S
- **Problem:** the only `fetch()` has no timeout/AbortController — a slow/dead backend makes every spinner spin forever.
- **Files:** `packages/core/src/api/client.ts:53–74` (choke point); optional per-call `timeoutMs` via `FetchOptions` (`client.ts:36–41`).
- **Build:** internal `AbortController` + `setTimeout(~15s)` (compose with caller signal), clear in `finally`, map abort to typed `ApiError` (code `TIMEOUT`, status 408). Longer ceiling (~60s) for voice/transcribe uploads.
- **Verify:** backend unreachable → rejects within ~15s (not infinite); normal call still succeeds, timer cleared; uploads don't abort mid-transfer.
- **Gotcha:** prerequisite for L2.

### L2 — Fix "slow login": startup crash-guard + silent token validation · auth/ux · M
- **Problem:** (a) `loadToken().then(hydrate)` has no `.catch` — keychain error → stuck on boot spinner forever. (b) expired token hydrates as logged-in → renders Home → 3 authed queries → 401 → bounce to `/login` (visible splash→spinner→home-flash→login jump = "느림").
- **Files:** `mobile/src/app/_layout.tsx:35–37, :24–27, :55–60`; `mobile/src/lib/auth-store.ts`; `secure-token.ts`; `(tabs)/index.tsx:29–36`.
- **Build:** `.catch(()=>hydrate(null))`; before showing authed UI, if token exists validate silently via `authApi.me()` (bounded by L1 timeout) — success→proceed, 401→signOut+go straight to `/login` with splash up (no Home flash); hold native splash via `expo-splash-screen`. Keep the 401 handler as the mid-session fallback.
- **Verify:** expired-token cold start → splash→login, no Home flash; valid-token → splash→Home; locked keychain → still reaches login, never a permanent boot spinner.

### L3 — Graceful "AI is invite-only" screen instead of raw 403 · ux · S
- **Problem:** AI endpoints return `403 AI_NOT_ALLOWED` (deny-by-default); public users tapping grading/sparring hit a raw error.
- **Files:** detect `AI_NOT_ALLOWED` in the API error shape (`packages/core/src/api/client.ts`); surface in `sparring.tsx`, `compose.tsx`, `interview-drill.tsx`, `drill-runner.tsx` compose paths.
- **Build:** map `AI_NOT_ALLOWED` → localized "AI 대화·채점은 아직 초대제 — 대기 신청" panel; keep non-AI features usable.
- **Verify:** non-allowlisted → friendly panel; allowlisted unaffected.

### L4 — `onError` feedback on core mutations · ux · M
- **Problem:** primary actions fail silently.
- **Sites:** `video/[id].tsx:63–73` (makeClip), `(tabs)/review.tsx:55–61` (grade), `(tabs)/videos.tsx:51–54` (delete), `drill-runner.tsx:46–55` & `interview-drill.tsx:75–82` (grade fire-and-forget → SRS progress silently lost).
- **Build:** `onError` → localized toast/Alert; for grades, re-queue or surface retry.
- **Verify:** each failure shows a clear message + retry; a failed grade doesn't silently advance.

### L5 — Sparring: connect-timeout, cancel, friendly errors · sparring/ux · S
- **Problem:** mint-but-never-`connected` → stuck on bare "Connecting…"; raw error strings shown verbatim.
- **Files:** `mobile/src/app/sparring.tsx:114–127, :267–272, :123/:167–173/:235/:283`.
- **Build:** ~12s connect timeout → reset to idle w/ friendly message + explicit Cancel button; map raw errors to localized copy, log raw.
- **Verify:** kill WebView mid-connect → back to idle+retry within ~12s; no raw error text to user.

### L6 — Dark-mode inputs + visible pressed states · theming · M
- **Problem:** (a) form inputs hardcode `#fff`/`#111827` → white boxes in dark mode; (b) no `Pressable` has a pressed state → taps feel dead.
- **Sites:** inputs `login.tsx:115`, `signup.tsx:128`, `settings.tsx:319`, `import.tsx:161`, `compose.tsx:148`, `videos.tsx:308`; Pressables app-wide.
- **Build:** theme-driven input colors via `useTheme()`; shared pressed-opacity / `android_ripple`.
- **Verify:** dark mode → no white boxes; every primary button reacts to touch.

### L7 — Free-tier onboarding path · ux/growth · M
- **Problem:** free experience = YouTube shadow + drills + SRS (zero cost), but no guided path; Home empty-state shows "Import a video" with no context.
- **Files:** `mobile/src/app/onboarding.tsx`; Home empty-state in `(tabs)/index.tsx`.
- **Build:** short first-run flow into a working free loop (shadow → drill → review); frame AI as invite-only upgrade (ties to L3).
- **Verify:** brand-new account reaches a first successful shadow/drill without a gated feature or dead end.

---

## 🟡 Moat & monetization (6)

### F1 — End-of-session sparring report → feed misses into SRS · backend+mobile · M
- **Why:** closes the loop; today hits are graded live but **misses are never recorded** and there's no summary.
- **Current:** sparring is **mint-only** — audio+transcript flow app↔OpenAI over WebRTC; **the backend never sees the transcript**. Client must capture the transcript from the Realtime data channel and POST it back.
- **Build:** new `POST /api/practice/sparring/report` on `PracticeController` (gate `aiGate.assertAllowed(user.email())`), body = user turns + target list → `CompositionService.sparringReport(transcript, targets)` following the `ai.complete(SYSTEM,user,~800)` → `stripFence` → `readTree` pattern + new `practice/prompt/SparringReportPrompt.java` (strict JSON: used/missed targets, corrections, recurring mistakes). Feed misses to SRS via the existing `POST /api/practice/srs/grade {cardKey, correct:false}` (`PracticeSrsService.grade` upserts → miss creates/demotes card to box 1, due tomorrow).
- **Verify:** report lists said vs missed + ≥1 correction from strict JSON; a missed target shows as due next session; aborted/`connecting` sessions produce no report/grades.
- **Gotcha:** `cardKey` is client-owned (≤120 chars) — map labels to the app's key scheme, or keep report read-only and let the app call grade per miss. A hard miss resets to box 1 + `lapseCount++` (maybe too harsh for "AI didn't elicit it" — product call; softer grade = backend change).

### F2 — JD-tailored mock interview · backend+mobile · M
- **Current:** `POST /api/practice/interview/mock` → `CompositionService.mockNext(history, seed)` → `MockInterviewPrompt` (strict JSON `{"question":…}`). No JD field.
- **Build:** add optional size-capped `jobDescription` to `MockNextRequest`; thread → `mockNext(history, seed, jd)` → `MockInterviewPrompt.userMessage(history, seed, jd)` (prepend "The role: <JD>…"). Keep `SYSTEM` stable + the `{"question":…}` contract. Mobile: JD paste field.
- **Verify:** with JD → questions reference the stack; without → unchanged; parser + `aiGate` intact.

### F3 — "New expressions I'm learning" sparring mode · mobile · S
- **Current:** `sparring.tsx:86–106` picks due-first from cards with existing state, skips never-seen (`if(!st) continue`). "Learning" = state exists but low box & not-yet-due (`st.box<=1 && st.dueDate>today`) — dropped today. All fields on `SrsCard` (`box,dueDate,correctCount,lapseCount`).
- **Build:** add `'learning'` topic/mode; branch `targets` useMemo to prioritize low-`box` (asc by box, then correctCount), backfill with `fresh` (`!st`). Optional shared `partitionLearning` in `practice-srs.ts`. No backend change.
- **Verify:** learning mode injects recently-added/low-box; due mode unchanged.

### F4 — Finer topic scoping (verb group / particle) · mobile · S
- **Build:** let a topic drill into a sub-group (Base verbs → put/take/get); scope `poolFor` to it. Reuse `verbs.tsx` axis picker pattern. Files: `sparring.tsx` TOPICS + `poolFor`.
- **Verify:** sub-group selection yields targets only from it.

### F5 — Cost: prompt caching + mini-model routing · backend · S
- **Current:** `SparringPrompt.build` already stable-prefix/variable-last, but sent as one opaque `instructions` string. `ClaudeClient.complete()` (text path for F1/F2) does **not** apply `cache_control` (only `analyzeClip` does).
- **Build:** add `cache_control:{type:ephemeral}` to the system block in `ClaudeClient.complete()`; expose `SPARRING_MODEL=gpt-realtime-mini` as cheaper default for casual chat (`tubeshadow.sparring.model`).
- **Verify:** shared-prefix text calls show cache hits/lower input cost; realtime works on mini.

### F6 — Replace email allowlist with plan-based entitlement · backend · M
- **Finding:** billing + entitlement plumbing **already exists, just not enforced.** `User` has `plan` (free|pro), `planValidUntil`, `billingCustomerId`, `effectivePlan(now)` (expired pro→free). Webhook `POST /api/billing/webhook` (X-Billing-Secret, `BillingService.setPlan`) is built + permit-listed. But `effectivePlan` is only in `MeResponse` — **no endpoint enforces plan**; gating is still the email allowlist.
- **Build:** `AiGate.assertEntitled(userId)` loads `User` via `UserRepository`, checks `!"free".equals(effectivePlan(now))`; swap **both** enforcement points — `AiGate.assertAllowed` in `PracticeController` **and** the duplicate `SparringClient.assertAllowed`. Keep email allowlist as owner/tester override.
- **Later:** per-minute credit ledger = net-new entity/repo/Flyway migration (needs approval); boolean plan-gating ships first.
- **Verify:** free user blocked, pro (or allowlisted owner) allowed, expired pro degrades to blocked without a data change; both general AI + sparring honor it.

---

## 🟢 Infra, quality & ops (8)

- **O1 — Single-source Caddyfile + `deploy.sh` · infra · M.** Prevents the recurrence of the outage where a parallel edit dropped `api.mimi`/`jjan`/`beside` blocks. One canonical Caddyfile (all 6 vhosts) + a deploy script replacing manual git-archive/scp/build. Refs: `infrastructure/ncp/box/{docker-compose.yml,Caddyfile}`, `infrastructure/ncp-migration-runbook.md`. Verify: `caddy validate` passes; all 6 hosts non-000 after reload.
- **O2 — Cleanup · ops · S.** Repoint/remove `api-ncp.jjan.daeseon.ai` (still → dead NCP 223.130.161.55); delete `cutover-verify-*`/`gate-test-*`/`aigate-test-*` accounts left in prod DB.
- **O3 — Uptime + OpenAI cost monitoring · infra · M.** Health/alert on 6 vhosts; daily realtime-minutes/token-spend readout.
- **O4 — Test coverage · quality · M.** Vitest for `packages/core` SRS/partition + drill-mode logic (sparring-detect already covered); commit k6 scripts under `scripts/` (run on demand, not CI).
- **O5** — semantic clustering of sparring targets (embeddings) when pool outgrows pack scoping.
- **O6** — persona-per-topic (dev standup / interviewer / friend).
- **O7** — expand developer-vertical content (interview-question bank, more IT/AI-coding packs).
- **O8** — "MiMi → Canada offer" journey as launch content.

---

## Reliability & UX bug register (24) — exhaustive, from the audit

Rows tagged (Lx) roll up into a launch-blocker card.

| Location | Problem | Sev | Fix |
|---|---|---|---|
| `core/api/client.ts:68` | No request timeout — every spinner can hang forever | high | AbortController + ~15s (L1) |
| `_layout.tsx:36` | Token load no `.catch` — keychain error bricks boot | high | `.catch(()=>hydrate(null))` (L2) |
| `_layout.tsx:24 / auth-store:20` | Expired token hydrates as logged-in → login flash | med | silent `me()` validation (L2) |
| `(tabs)/index.tsx:29–55` | Home no error branch → infinite spinner, false "Import" CTA | med | error/retry; don't infer empty from failure |
| `gym.tsx:48–52` | `seeds` fetch no error branch — silently empty | low | `ErrorState` on `seeds.isError` |
| `player/[clipId].tsx:58–63` | Analysis polls every 3s forever while PENDING | med | cap polls; "try later" |
| `video/[id].tsx:63–73` | "Clip this line" no `onError` — dead button | high | onError Alert (L4) |
| `(tabs)/review.tsx:55–61` | Grade `respond` no `onError` — buttons look dead | med | onError toast (L4) |
| `(tabs)/videos.tsx:51–54` | Delete video no `onError` — silent after confirm | med | onError Alert (L4) |
| `drill-runner.tsx:46–55 · interview-drill.tsx:75–82` | Grade fire-and-forget → SRS progress silently lost | med | onError toast / re-queue (L4) |
| `onboarding.tsx:25–28` | `finish()` nav swallowed if storage throws | low | navigate in `finally` |
| `mic-input.tsx:45 · record-panel.tsx:43 · shadow-feedback.tsx:22` | Audio upload/STT no timeout — spins forever | med | per-upload timeout (L1) |
| `sparring.tsx:123,167,235,283` | Raw error strings shown verbatim | med | localized copy; log raw (L5) |
| `sparring.tsx:114–127,267` | "Connecting" no timeout/cancel | med | connect timeout + Cancel (L5) |
| `import.tsx:86,124` | Device-transcript fallback opaque; silent server retry | low | user-facing note |
| inputs: `login/signup/settings/import/compose/videos` | Hardcoded `#fff`/`#111827` — white boxes in dark mode | med | theme-driven colors (L6) |
| app-wide Pressables | No pressed state — taps feel unresponsive | med | pressed opacity / ripple (L6) |
| `signup.tsx:40,87 · settings.tsx:188` | Disabled submit gives no reason (password ≥8) | low | "8+ characters" helper |
| `discover · deck-screen · pattern-run · video/[id]` | Bare `ActivityIndicator`, no text/retry | low | labelled loading + L1 timeout |
| `video/[id].tsx:317` | Hardcoded `'A–B'` bypasses i18n | low | route through `t()` |

**Already solid (don't re-litigate):** `videos`, `review`, `player`, `discover`, deck screens, `pattern-run`, `weak` have real `ErrorState`+retry & `EmptyState` CTAs; in-session 401 centralized (`query-client.ts:16`); mic-permission has "open Settings" recovery; most tap targets ~44px with a11y roles.
