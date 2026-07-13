// Client-side spaced-repetition helpers. The card content is static (bundled), the SRS state
// lives on the account; here we join them to build the day's session: everything DUE today,
// plus a capped trickle of NEW cards. "today" is the learner's local date.

import type { SrsCard } from "./api/practice";

export const NEW_PER_DAY = 12;

export interface Keyed {
  key: string; // stable card key, e.g. "pat:on-depend-on#0"
}

export function localToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Split a static deck into cards due today vs never-seen, using the user's SRS states. */
export function partition<T extends Keyed>(all: T[], states: SrsCard[], today: string) {
  const byKey = new Map(states.map((s) => [s.cardKey, s]));
  const due: T[] = [];
  const fresh: T[] = [];
  for (const e of all) {
    const st = byKey.get(e.key);
    if (!st) fresh.push(e);
    else if (st.dueDate <= today) due.push(e);
  }
  return { due, fresh };
}

/** Split out low-box cards that are still being learned but are not due yet. Learning cards keep
 * a deterministic weakest-first order (box, then successful recalls); never-seen cards preserve
 * deck order so callers can choose whether to shuffle the backfill. */
export function partitionLearning<T extends Keyed>(all: T[], states: SrsCard[], today: string) {
  const byKey = new Map(states.map((s) => [s.cardKey, s]));
  const learning: { item: T; state: SrsCard; order: number }[] = [];
  const fresh: T[] = [];
  all.forEach((item, order) => {
    const state = byKey.get(item.key);
    if (!state) fresh.push(item);
    else if (state.box <= 1 && state.dueDate > today) learning.push({ item, state, order });
  });
  learning.sort(
    (a, b) =>
      a.state.box - b.state.box ||
      a.state.correctCount - b.state.correctCount ||
      a.order - b.order,
  );
  return { learning: learning.map(({ item }) => item), fresh };
}

/** The day's session: all due cards (shuffled) + up to NEW_PER_DAY new ones. */
export function buildSession<T extends Keyed>(all: T[], states: SrsCard[], today: string): T[] {
  const { due, fresh } = partition(all, states, today);
  return [...shuffle(due), ...shuffle(fresh).slice(0, NEW_PER_DAY)];
}

/** A focused HARD-CAPPED daily set of `target` cards — due reviews first (retention of what's
 *  already learned), then new cards to fill up to `target`. For the "오늘의 30" loop: never more
 *  than `target` a day, so it stays doable but relentless. */
export function buildDailySession<T extends Keyed>(
  all: T[],
  states: SrsCard[],
  today: string,
  target = 30,
): T[] {
  const { due, fresh } = partition(all, states, today);
  const reviews = shuffle(due).slice(0, target);
  const newCards = shuffle(fresh).slice(0, Math.max(0, target - reviews.length));
  return shuffle([...reviews, ...newCards]);
}
