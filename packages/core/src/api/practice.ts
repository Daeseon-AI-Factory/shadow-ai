import { apiClient } from "./client";

export interface PracticeProgress {
  date: string; // the local date this reflects (YYYY-MM-DD)
  reps: number; // reps done today
  streak: number; // live day streak (0 if it has lapsed)
  longestStreak: number;
  totalReps: number;
}

// Spaced-repetition (Leitner) state for one drill card. The client computes "due"
// (dueDate <= today) and "new" (a card key with no state) against its own local date.
export interface SrsCard {
  cardKey: string;
  box: number;
  dueDate: string; // YYYY-MM-DD
  correctCount: number;
  lapseCount: number;
}

// Grading a card also counts as a rep today, so the streak comes back in the same response.
export interface GradeResult {
  card: SrsCard;
  progress: PracticeProgress;
}

// AI verdict on a composition ("영작") attempt.
export interface ComposeFeedback {
  ok: boolean; // grammatical, natural, AND uses the target correctly
  usesTarget: boolean;
  feedback: string;
  better: string;
}

// Cross-pack "조합" result: 2-4 chunks combined into ONE coherent sentence (말이 되게).
export interface MixResult {
  sentence: string; // the combined English sentence
  gloss: string; // natural Korean translation
  usedAll: boolean; // did every chunk fit naturally
  note: string; // if usedAll is false, what didn't fit
}

// Daily "스토리 합성" result: today's chunks woven into one short coherent passage (외우기/쉐도잉용).
export interface StoryResult {
  story: string; // the short English paragraph
  gloss: string; // natural Korean translation of the whole paragraph
  note: string; // if some chunks didn't fit
}

// Lenient verdict on a scenario answer — responding to a real-world situation in English.
export interface ScenarioFeedback {
  ok: boolean; // understandable AND appropriate for the situation
  fits: boolean; // does it actually respond to the situation
  feedback: string;
  better: string;
}

// Lenient verdict on a spoken interview/code explanation — passes when the CORE is understandable.
export interface InterviewFeedback {
  ok: boolean;
  score: number;
  feedback: string;
  better: string;
}

// Whisper transcript of an uploaded audio clip (dev-jargon-aware).
export interface TranscribeResult {
  text: string;
}

// Ephemeral OpenAI Realtime credential for a voice sparring session (single session, short TTL —
// the server-side API key never reaches the client). `model` names the realtime model to call.
export interface SparringSession {
  clientSecret: string;
  model: string;
}
export interface SparringTarget {
  label: string; // the English chunk to elicit
  ko?: string; // Korean gloss
}

export interface SparringReportTarget {
  cardKey: string;
  label: string;
  ko?: string | null;
}

export interface SparringReportedTarget {
  cardKey: string;
  label: string;
  ko: string | null;
}

export interface SparringCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export interface SparringReport {
  usedTargets: SparringReportedTarget[];
  missedTargets: SparringReportedTarget[];
  corrections: SparringCorrection[];
  recurringMistakes: string[];
}

// One turn of the AI mock interview; empty history asks for the opening question.
export interface MockTurn {
  role: "interviewer" | "candidate";
  text: string;
}
export interface MockNext {
  question: string;
}

export const practiceApi = {
  progress: (localDate: string) =>
    apiClient.get<PracticeProgress>("/api/practice/progress", { query: { localDate } }),
  srsStates: () => apiClient.get<SrsCard[]>("/api/practice/srs"),
  grade: (cardKey: string, correct: boolean, localDate: string) =>
    apiClient.post<GradeResult>("/api/practice/srs/grade", { cardKey, correct, localDate }),
  composeCheck: (target: string, gloss: string, sentence: string) =>
    apiClient.post<ComposeFeedback>("/api/practice/compose/check", { target, gloss, sentence }),
  // Cross-pack "조합": combine 2-4 chunks into one coherent sentence (the AI flags when they can't fit).
  composeMix: (chunks: string[]) =>
    apiClient.post<MixResult>("/api/practice/compose/mix", { chunks }),
  // Daily "스토리 합성": weave today's chunks (3-20) into one short coherent passage.
  composeStory: (chunks: string[]) =>
    apiClient.post<StoryResult>("/api/practice/compose/story", { chunks }),
  // Lenient grade of a scenario answer — respond to a real-world situation; sample is one good option.
  scenarioCheck: (situation: string, koreanHint: string, sample: string, answer: string) =>
    apiClient.post<ScenarioFeedback>("/api/practice/scenario/check", { situation, koreanHint, sample, answer }),
  // Lenient grade of a spoken explanation — `question` is the code/topic, `answer` is what the learner said.
  interviewCheck: (question: string, answer: string, precision?: boolean) =>
    apiClient.post<InterviewFeedback>("/api/practice/interview/check", { question, answer, precision }),
  // Next interviewer question in the AI mock interview (opener on empty history, else a follow-up).
  mockNext: (history: MockTurn[], seed?: number) =>
    apiClient.post<MockNext>("/api/practice/interview/mock", { history, seed }),
  // Mint a realtime voice sparring session — targets are the learner's due cards to elicit.
  sparringSession: (mode: 'chat' | 'interview', targets: SparringTarget[]) =>
    apiClient.post<SparringSession>("/api/practice/sparring/session", { mode, targets }),
  // Analyze the learner's transcribed turns against the exact SRS targets used in the session.
  sparringReport: (userTurns: string[], targets: SparringReportTarget[]) =>
    apiClient.post<SparringReport>("/api/practice/sparring/report", { userTurns, targets }),
  // Upload an audio clip → Whisper transcript. `file` is a React Native file descriptor.
  transcribe: (file: { uri: string; name: string; type: string }) => {
    const form = new FormData();
    form.append("file", file as unknown as Blob);
    return apiClient.post<TranscribeResult>("/api/practice/transcribe", form);
  },
};
