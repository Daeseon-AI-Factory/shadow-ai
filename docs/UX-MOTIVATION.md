# MiMi — Motivation & Usability Spec (ruthless edition)

> The redesign (R1–R4) made it *look* right. This makes people *keep coming back*. Language learning is a
> retention game, and retention is driven by a handful of real behavioral-design + usability laws — applied
> with restraint, not crammed. Developer audience: **no Duolingo cheese, no dark patterns.**
>
> **Key fact:** the data to show "how much have I done / mastered" already exists — this is mostly a
> *presentation layer*, not new backend.

## Data that already exists (reuse — don't rebuild)
- `GET /api/practice/progress` → `PracticeProgress { reps, streak, longestStreak, totalReps, date }`.
- `GET /api/practice/srs` → `SrsCard[] { cardKey, box(0–6), dueDate, correctCount, lapseCount }`. **Mastery is derivable**: `box >= 4` ≈ "mastered", `box 1–3` ≈ "learning", `!state` ≈ "new".
- Pack sizes are static in `@shadow-ai/core` (1,956 verbs, etc.).
- Sparring session report (used/missed targets) — F1 backend endpoint exists.
So "익힘 128/340", weekly reps, streak, per-pack mastery are all **computable client-side today**.

## Ground rules
- Expo v56 / RN, tokens via `useTheme()` (R1). Reuse `Card`/`Chip`/`PrimaryButton`. Log per `CLAUDE.md`.
- **Doherty threshold (<400ms):** grading uses **optimistic UI** — advance immediately, reconcile with the server; never make the user wait on a spinner to feel progress.
- No new DB migration without approval. v1 = client-side computation over existing endpoints.

---

## ✅ BUILD — the core motivation layer

### M1 — Progress & mastery visibility (the missing layer the owner flagged)
**Concept:** people need to see *how far they've come*. Absent today entirely.
- **Home:** a **mastery summary** — one ring or bar: "익힘 **128** / 340" (mastered = `box>=4`), plus "이번 주 **N**회 · 🔥 **streak**". Small, above the fold, under the streak card.
- **Practice (each pack card):** a thin progress bar + "128/340 익힘" per pack. (This IS goal-gradient — see M2.)
- **Data:** new client selector `useMastery()` in `packages/core` — from `srsStates` + pack sizes returns `{ mastered, learning, total, byPack }`. No backend change. (Optional later: a cached aggregate endpoint if the client compute is heavy.)
- **Accept:** Home shows a real mastered/total number that goes up after grading; each pack shows its own progress; light + dark.

### M2 — Goal-gradient (motivation rises as the goal nears)
**Concept:** effort accelerates near completion (Kivetz 2006). MiMi has zero session-progress feedback.
- **Drill / "오늘의 30":** a **session progress bar** (`X / N`) that fills as you go; in the last ~20% it **emphasizes** ("3장 남음!" bolder + accent). Files: `drill-runner.tsx`, `(tabs)/index.tsx` Today loop.
- **Per-pack bars** double as goal-gradient toward pack mastery.
- **Endowed progress** (Nunes & Drèze 2006): the daily goal ring starts **slightly pre-filled** (e.g., a free warm-up card auto-counts, or yesterday's overflow) so it's never a cold 0/30.
- **Accept:** a visible bar advances every card; the last few cards read as "almost there"; the daily ring never starts at literal zero.

### M3 — Peak-end session close (end on achievement)
**Concept:** people judge an experience by its peak and its **end** (Kahneman). Today sessions just dump back to Home.
- After a **drill** or **sparring** session: a short **summary moment** — "오늘 **12** 연습 · **3** 마스터 · 🔥 **15**일". One tasteful screen, then back. For sparring, use the F1 report (said vs missed).
- **Accept:** finishing a session shows a satisfying summary before returning; it names something the user achieved.

### M4 — Streak, tastefully (loss aversion without anxiety)
- Streak already on Home (R3 ink card). Add **ONE** gentle at-risk nudge **only** when it's late in the day AND today's goal isn't met ("🔥 15일 스트릭 — 오늘 아직이에요"). Not a notification storm, not guilt.
- **Accept:** the nudge shows only when genuinely at risk; never nags a user who already practiced.

### M5 — Ease laws (this is usability, not gamification — always on)
- **Hick's law** (fewer choices): entry screens lead with **one** smart-default action ("Start today's session") before the full menu. The redesign started this; enforce it.
- **Fitts's law** (big targets): primary actions large (sparring tab ✓); grade buttons comfortably tappable.
- **Doherty (<400ms):** optimistic UI on grade/progress; skeletons over spinners; rely on L1 timeout so nothing hangs.
- **Accept:** primary action is obvious within 1s of landing; grading feels instant; no dead spinners.

## 🟡 BUILD LIGHT — a little, meaningfully
### M6 — Milestones (a few, quiet)
- Celebrate only meaningful thresholds: **100 mastered**, streak **7 / 30 / 100**, **first sparring**. A brief confetti/scale moment, then gone. **No badge grid, no XP economy.**
- **Accept:** crossing a threshold shows one quiet celebration; there is no persistent badge wall.

## ❌ DO NOT BUILD (off-brand / dark patterns for a dev-premium tool)
- Random variable-reward spam (loot-box mechanics).
- Streak-anxiety pressure, guilt copy, or push-notification storms.
- Leaderboards / social comparison (no social layer).
- XP / coins / mascot gamification.

---

## Codex tracks (disjoint, parallel)
- **U1 — Data layer:** `useMastery()` + progress selectors in `packages/core` (over `srsStates`/`progress`/pack sizes). Land first (others consume it). Vitest for the selector.
- **U2 — Home motivation surface:** mastery summary + weekly reps + at-risk streak nudge. `(tabs)/index.tsx`.
- **U3 — Session goal-gradient + peak-end:** session progress bar + endowed start + end-of-session summary. `drill-runner.tsx`, sparring `done` phase, Today loop.
- **U4 — Practice per-pack progress + milestones:** per-pack bars + the light milestone moment. `(tabs)/practice.tsx`, a `<MilestoneToast>` component.
Merge: U1 first, then U2/U3/U4. Base: `integration/tracks`.

## Global acceptance
- `npx tsc --noEmit` clean; light + dark.
- A returning user can, within one screen, see **how much they've mastered, their streak, and what's left today** — the "얼마나 했고 성취했는지" gap is closed.
- Grading/progress feels instant (optimistic).
- Zero manipulative mechanics from the ❌ list.
