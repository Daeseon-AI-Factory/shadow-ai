import { describe, expect, it } from "vitest";
import {
  COLLOCATIONS,
  ENGLISH_PATTERNS,
  PATTERNS,
  PRACTICE_PACK_IDS,
  PRACTICE_PACK_SIZES,
  TOTAL_PRACTICE_CARDS,
  cardIndex,
  collocationKey,
  englishPatternKey,
  patternKey,
  selectMastery,
  selectPracticeRhythm,
  selectWeeklyRhythm,
  useMastery,
  type SrsCard,
} from "@shadow-ai/core";

const state = (cardKey: string, box: number): SrsCard => ({
  cardKey,
  box,
  dueDate: "2026-07-14",
  correctCount: 0,
  lapseCount: 0,
});

describe("selectMastery", () => {
  it("keeps box 3 learning and promotes box 4 to mastered", () => {
    const summary = selectMastery([
      state(englishPatternKey(0), 3),
      state(englishPatternKey(1), 4),
    ]);

    expect(summary.learning).toBe(1);
    expect(summary.mastered).toBe(1);
    expect(summary.byPack.englishPattern).toEqual({
      learning: 1,
      mastered: 1,
      total: ENGLISH_PATTERNS.length,
    });
  });

  it("aggregates states into their static packs", () => {
    const pattern = PATTERNS[0];
    const collocation = COLLOCATIONS[0];
    const summary = selectMastery([
      state(patternKey(pattern.id, 0), 4),
      state(collocationKey(collocation.id, 0), 2),
    ]);

    expect(summary.byPack.pattern.mastered).toBe(1);
    expect(summary.byPack.pattern.learning).toBe(0);
    expect(summary.byPack.collocation.mastered).toBe(0);
    expect(summary.byPack.collocation.learning).toBe(1);
    expect(summary.mastered).toBe(1);
    expect(summary.learning).toBe(1);
  });

  it("returns static totals and zero learned counts for empty state", () => {
    const summary = selectMastery([]);

    expect(summary).toMatchObject({
      mastered: 0,
      learning: 0,
      total: TOTAL_PRACTICE_CARDS,
    });
    for (const packId of PRACTICE_PACK_IDS) {
      expect(summary.byPack[packId]).toEqual({
        mastered: 0,
        learning: 0,
        total: PRACTICE_PACK_SIZES[packId],
      });
    }
  });

  it("leaves cards without SRS state in the implied new count", () => {
    const summary = selectMastery([state(englishPatternKey(0), 2)]);
    const pack = summary.byPack.englishPattern;
    const newCards = pack.total - pack.mastered - pack.learning;

    expect(pack.learning).toBe(1);
    expect(newCards).toBe(ENGLISH_PATTERNS.length - 1);
    expect(summary.total).toBe(cardIndex().size);
  });

  it("ignores unknown keys and de-duplicates repeated card state", () => {
    const known = englishPatternKey(0);
    const summary = selectMastery([
      state(known, 2),
      state(known, 4),
      state("ep:not-a-static-card", 4),
      state("tf:dynamic:card#0", 4),
    ]);

    expect(summary.mastered).toBe(1);
    expect(summary.learning).toBe(0);
  });

  it("exposes the same result through useMastery without a React dependency", () => {
    const states = [state(englishPatternKey(0), 4)];
    expect(useMastery(states)).toEqual(selectMastery(states));
  });
});

describe("selectPracticeRhythm", () => {
  it("keeps today's reps explicit in the display summary", () => {
    const progress = {
      date: "2026-07-14",
      reps: 12,
      streak: 5,
      longestStreak: 9,
      totalReps: 130,
    };
    const expected = {
      repsToday: 12,
      streak: 5,
      longestStreak: 9,
      totalReps: 130,
    };

    expect(selectPracticeRhythm(progress)).toEqual(expected);
    expect(selectWeeklyRhythm(progress)).toEqual(expected);
  });
});
