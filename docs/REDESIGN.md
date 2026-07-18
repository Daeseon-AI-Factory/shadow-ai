# MiMi — Visual Redesign Spec (Codex handoff)

> Direction pitch (mockups): the published redesign artifact. This file is the implementable spec.
> **Thesis:** quiet, developer-grade study surfaces + ONE loud button. AI Sparring stops being a buried
> card and becomes the app's center of gravity — its own top-level tab, its own color, its own room.
> It's a **reskin + one IA move**, NOT a rewrite: reuse `Colors` tokens, `expo-router` tabs, `useTheme()`.

## Ground rules
- Expo v56 / React Native (read the versioned docs, `mobile/AGENTS.md`). TS strict.
- **All color through tokens** (`src/constants/theme.ts` → `useTheme()`), never hardcoded hex in screens. Light + dark must both hold.
- No new heavy deps. Reanimated is already present for micro-interactions.
- Log per `CLAUDE.md` (troubleshooting + mdx) per commit.

---

## 0. Design tokens — reassign meaning (do this first; everything depends on it)

`src/constants/theme.ts` already has blue + teal + coral. Keep the values, **give each a single meaning** and add the missing states.

| Token (add/rename) | Light | Dark | Meaning |
|---|---|---|---|
| `primary` (keep) | `#2B86F0` | `#4F9BFF` | the app / study surface |
| `live` (was `coral`) | `#FF5A3C` | `#FF6F54` | **sparring / mic-on / recording** |
| `liveSoft` | `#FFE6DF` | `#2A1712` | live chip bg |
| `mint` (was `accent`) | `#17C3B2` | `#2AD3C2` | **a target the learner actually said (graded ✓)** |
| `amber` (add) | `#F5A623` | `#F2B23C` | streak |
| `ink` (add) | `#0A1420` | `#0A1420` | studio ground (sparring room, streak card) |
| `pressed` (add) | rgba overlay | rgba overlay | pressed-state overlay |

**Acceptance:** one color = one meaning across the app. Grep shows no raw `#fff`/`#111827`/`#208AEF`/`#096AE8` in screens — all via `useTheme()`.

---

## 1. Information architecture — Sparring becomes a center top-level tab ⭐ (the headline change)

`src/app/(tabs)/_layout.tsx` currently: Home · Library · Review · Practice · Me (5). Sparring is buried at `src/app/sparring.tsx` (pushed from Practice).

**New tab bar (5, re-cast):** `Today · Practice · [ Sparring ] · Review · Me`
- **Move `sparring` INTO the tab group** — create `src/app/(tabs)/sparring.tsx` (move/re-export the existing screen) so it's a real tab, not a pushed route. Keep the old route working or redirect.
- **Sparring = a raised CENTER tab**, visually distinct: `live` (coral) rounded-square icon (mic `waveform`/`mic.fill`), lifted ~16px above the bar, coral label. Everything else uses `primary` when active. Implement via a custom `tabBarButton` for the sparring screen (expo-router `Tabs.Screen` `options.tabBarButton`).
- **Free the slot:** fold **Library** into Home as a "My clips" tile/row (Home links to the existing videos screen). Remove Library from the tab bar (keep the screen reachable).

**Acceptance:** Sparring is a bottom-tab, center, coral, raised, one tap from anywhere. Library no longer a tab but still reachable from Home. Existing deep links to sparring still work.

---

## 2. Sparring screen — the hero (its own "studio" room)

`src/app/(tabs)/sparring.tsx` (moved). Keep ALL current logic (topic scoping, learning mode, connect-timeout, invite-only panel, hit detection, SRS grading) — this is **visual only**.

- **Dark "studio" ground** (`ink` radial gradient) even in light mode — signals you left the study surface and entered a conversation.
- Mode toggle (chat / interview) as two pills at top.
- Topic chips row (existing TOPICS) — selected chip in `primary`; keep verb/particle sub-scope.
- **Big central mic** (`live` circle with a soft glow ring) = "Tap to start talking". Animate the glow while connecting/live (Reanimated pulse; respect reduced-motion).
- **Planted target chips**: neutral by default → turn **`mint` with ✓** when said (this already fires on hit detection — just restyle). A subtle live waveform while the session is active.
- Invite-only (403) panel: keep, but styled as a calm coral-accented card, not a raw error.

**Acceptance:** opening Sparring feels like a distinct place (dark room); mic is the obvious primary; saying a target flips its chip to mint live; all existing behavior intact; light/dark both legible.

---

## 3. Home / Today — `src/app/(tabs)/index.tsx`

- **Streak on an `ink` gradient card** (day count big, tabular-nums, amber flame, "N due today").
- **Sparring hero card directly under the streak**: coral-accented, a live waveform, "Start talking" → jumps to the Sparring tab with today's due expressions. (Home promotes the moat.)
- **Quiet tiles below**: "Today's 30" (reviews), "My clips" (folds in Library), "Weak spots". Even grid, one accent per tile.
- Keep the existing queries (`me`/`streak`/`recent`) + the new L1/L2 states.

**Acceptance:** streak + one-tap sparring are above the fold; Library is reachable as a tile; the screen reads calm with a single coral focal point.

---

## 4. Practice — `src/app/(tabs)/practice.tsx`

- **Even card grid**, one accent icon per pack, consistent metadata line (`count · N due`). Deliberately calm (energy budget goes to Sparring).
- Remove the old "sparring" card from here (it's a tab now).
- Keep all pack routes.

## 5. Review · Me · shared components

- **Review:** grade buttons (Again/Hard/Good/Easy) get real weight + `mint`/`amber`/`live` semantic coloring; card flip micro-interaction.
- **Me (settings):** section cards, the L6 themed inputs.
- **Shared:** one `<Card>`, `<Chip>`, `<PrimaryButton>` / `<TalkButton>` (coral) with **pressed state** (opacity/scale via `Pressable` `({pressed})` or Reanimated) + focus ring. This kills the "taps feel dead" issue app-wide.

**Acceptance:** every interactive surface reacts to touch; components are token-driven and reused, not re-styled per screen.

---

## Files (primary)
- `src/constants/theme.ts` (tokens), `src/hooks/use-theme.ts`
- `src/app/(tabs)/_layout.tsx` (tab bar + center sparring button)
- `src/app/(tabs)/sparring.tsx` (moved from `src/app/sparring.tsx`) + route redirect
- `src/app/(tabs)/index.tsx`, `practice.tsx`, `review.tsx`, `settings.tsx`
- `src/components/` — new `card.tsx`, `chip.tsx`, `talk-button.tsx`, pressed-state helper
- `src/components/themed-text.tsx` (type scale: display 800 / section 750 / body / mono labels)

## Parallelization (4 tracks, disjoint files — run at once)
- **R1 — Tokens + shared components** (`theme.ts`, `themed-text`, `components/*`). **Land first** — others depend on it.
- **R2 — IA + tab bar + Sparring move** (`(tabs)/_layout.tsx`, move `sparring.tsx`, redirect). ⭐ the headline.
- **R3 — Home + Practice** (`index.tsx`, `practice.tsx`).
- **R4 — Review + Me + drill/review components** (`review.tsx`, `settings.tsx`, grade UI).
Merge order: R1 → then R2/R3/R4 (mostly disjoint; small conflicts in i18n only).

## Global acceptance
- `npx tsc --noEmit` clean; iOS + Android bundle.
- Light AND dark both legible; no hardcoded hex in screens.
- Sparring is a center coral tab, one tap from anywhere, feels like a distinct room.
- Every button/card has a visible pressed state.
- All existing behavior (auth, SRS, sparring logic, gating) unchanged — this is skin + IA only.
