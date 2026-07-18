// Client-side mastery selectors over the static practice packs and the user's persisted SRS state.
// This module stays React-free so @shadow-ai/core remains usable by both web and native clients.

import type { PracticeProgress, SrsCard } from "./api/practice";
import { AI_CODING } from "./ai-coding";
import { COLLOCATIONS } from "./collocations";
import { ENGLISH_PATTERNS } from "./english-patterns";
import { IT_PATTERNS } from "./it-patterns";
import { IT_TERMS } from "./it-terms";
import { PATTERNS } from "./patterns";
import { PHRASAL_500 } from "./phrasal-500";
import { VERB_PACK } from "./phrasal-verbs";
import { cardIndex, type CardInfo } from "./practice-cards";

export type PracticePackId = CardInfo["kind"];

export const PRACTICE_PACK_IDS = [
  "pattern",
  "collocation",
  "verb",
  "englishPattern",
  "phrasal500",
  "itPattern",
  "itTerm",
  "aiCoding",
] as const satisfies readonly PracticePackId[];

/** Static card totals for every persisted SRS pack. Dynamic transform/interview cards are excluded. */
export const PRACTICE_PACK_SIZES = {
  pattern: PATTERNS.reduce((total, pack) => total + pack.items.length, 0),
  collocation: COLLOCATIONS.reduce((total, pack) => total + pack.items.length, 0),
  verb: VERB_PACK.reduce((total, pack) => total + pack.items.length, 0),
  englishPattern: ENGLISH_PATTERNS.length,
  phrasal500: PHRASAL_500.length,
  itPattern: IT_PATTERNS.length,
  itTerm: IT_TERMS.length,
  aiCoding: AI_CODING.length,
} as const satisfies Readonly<Record<PracticePackId, number>>;

export const TOTAL_PRACTICE_CARDS = PRACTICE_PACK_IDS.reduce(
  (total, packId) => total + PRACTICE_PACK_SIZES[packId],
  0,
);

export interface MasteryCounts {
  mastered: number;
  learning: number;
  total: number;
}

export type MasteryByPack = Record<PracticePackId, MasteryCounts>;

export interface MasterySummary extends MasteryCounts {
  byPack: MasteryByPack;
}

function emptyByPack(): MasteryByPack {
  const result = {} as MasteryByPack;
  for (const packId of PRACTICE_PACK_IDS) {
    result[packId] = {
      mastered: 0,
      learning: 0,
      total: PRACTICE_PACK_SIZES[packId],
    };
  }
  return result;
}

/**
 * Join persisted SRS state to the static packs. Cards with no state are new; their count is
 * `total - mastered - learning`. Unknown/dynamic card keys do not inflate static-pack mastery.
 */
export function selectMastery(srsStates: readonly SrsCard[]): MasterySummary {
  const byPack = emptyByPack();
  const staticCards = cardIndex();
  const stateByCardKey = new Map(srsStates.map((state) => [state.cardKey, state]));

  for (const state of stateByCardKey.values()) {
    const packId = staticCards.get(state.cardKey)?.kind;
    if (!packId) continue;

    if (state.box >= 4) {
      byPack[packId].mastered += 1;
    } else if (state.box >= 1 && state.box <= 3) {
      byPack[packId].learning += 1;
    }
  }

  return {
    mastered: PRACTICE_PACK_IDS.reduce((total, packId) => total + byPack[packId].mastered, 0),
    learning: PRACTICE_PACK_IDS.reduce((total, packId) => total + byPack[packId].learning, 0),
    total: TOTAL_PRACTICE_CARDS,
    byPack,
  };
}

/**
 * Hook-shaped selector for React consumers. It deliberately delegates to the pure selector without
 * importing React, preserving @shadow-ai/core's dependency-free, platform-agnostic contract.
 */
export function useMastery(srsStates: readonly SrsCard[]): MasterySummary {
  return selectMastery(srsStates);
}

export interface PracticeRhythmSummary {
  repsToday: number;
  streak: number;
  longestStreak: number;
  totalReps: number;
}

export type WeeklyRhythmSummary = PracticeRhythmSummary;

/**
 * Normalize PracticeProgress for a compact rhythm display. `reps` is a daily count in the current
 * API; a true seven-day count cannot be derived without history, so the output names it explicitly.
 */
export function selectPracticeRhythm(progress: PracticeProgress): PracticeRhythmSummary {
  return {
    repsToday: progress.reps,
    streak: progress.streak,
    longestStreak: progress.longestStreak,
    totalReps: progress.totalReps,
  };
}

export const selectWeeklyRhythm = selectPracticeRhythm;
