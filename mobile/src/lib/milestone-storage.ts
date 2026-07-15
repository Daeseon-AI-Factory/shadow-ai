export const MILESTONE_IDS = [
  'mastery-100',
  'streak-7',
  'streak-30',
  'streak-100',
  'first-sparring',
] as const;

export type MilestoneId = (typeof MILESTONE_IDS)[number];

export interface MilestoneSignals {
  mastered: number;
  streak: number;
}

export interface MilestoneStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

type StoredMilestoneState = {
  version: 1;
  userId: string;
  lastMastered: number | null;
  lastStreak: number | null;
  firstSparringCompleted: boolean;
  celebrated: MilestoneId[];
  pending: MilestoneId[];
};

const STORAGE_VERSION = 1;
const STORAGE_KEY_PREFIX = 'mimi.milestones.v1';
const STREAK_MILESTONES = [
  { id: 'streak-7', threshold: 7 },
  { id: 'streak-30', threshold: 30 },
  { id: 'streak-100', threshold: 100 },
] as const satisfies readonly { id: MilestoneId; threshold: number }[];
const storageQueues = new Map<string, Promise<void>>();
const milestoneLeases = new Map<string, MilestoneId>();

function isMilestoneId(value: unknown): value is MilestoneId {
  return typeof value === 'string' && MILESTONE_IDS.includes(value as MilestoneId);
}

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function emptyState(userId: string): StoredMilestoneState {
  return {
    version: STORAGE_VERSION,
    userId,
    lastMastered: null,
    lastStreak: null,
    firstSparringCompleted: false,
    celebrated: [],
    pending: [],
  };
}

function parseState(raw: string | null, userId: string): StoredMilestoneState {
  if (!raw) return emptyState(userId);

  try {
    const value = JSON.parse(raw) as Partial<StoredMilestoneState>;
    if (value.version !== STORAGE_VERSION || value.userId !== userId) {
      return emptyState(userId);
    }
    return {
      version: STORAGE_VERSION,
      userId,
      lastMastered: isCount(value.lastMastered) ? value.lastMastered : null,
      lastStreak: isCount(value.lastStreak) ? value.lastStreak : null,
      firstSparringCompleted: value.firstSparringCompleted === true,
      celebrated: Array.isArray(value.celebrated)
        ? [...new Set(value.celebrated.filter(isMilestoneId))]
        : [],
      pending: Array.isArray(value.pending)
        ? [...new Set(value.pending.filter(isMilestoneId))]
        : [],
    };
  } catch {
    return emptyState(userId);
  }
}

function validateSignals(signals: MilestoneSignals): void {
  if (!isCount(signals.mastered) || !isCount(signals.streak)) {
    throw new Error('Milestone counts must be non-negative integers.');
  }
}

function withStorageLock<T>(key: string, operation: () => Promise<T>): Promise<T> {
  const previous = storageQueues.get(key) ?? Promise.resolve();
  const result = previous.catch(() => undefined).then(operation);
  const settled = result.then(
    () => undefined,
    () => undefined,
  );
  storageQueues.set(key, settled);

  return result.finally(() => {
    if (storageQueues.get(key) === settled) storageQueues.delete(key);
  });
}

export function milestoneStorageKey(userId: string): string {
  const trimmed = userId.trim();
  if (!trimmed) throw new Error('A user id is required for milestone storage.');
  const encodedUserId = Array.from(trimmed, (character) =>
    character.codePointAt(0)!.toString(36),
  ).join('-');
  return `${STORAGE_KEY_PREFIX}.${encodedUserId}`;
}

/**
 * Serializes access in this JS runtime and leases at most one reached milestone for presentation.
 * Reached milestones are queued before one is returned, so dependency churn or a hidden screen
 * cannot permanently consume them. The first observation compares against zero because Practice is
 * not the only grading entry point.
 */
export function claimMilestone(
  storage: MilestoneStorage,
  userId: string,
  signals: MilestoneSignals,
): Promise<MilestoneId | null> {
  validateSignals(signals);
  const key = milestoneStorageKey(userId);

  return withStorageLock(key, async () => {
    const state = parseState(await storage.getItem(key), userId);
    const celebrated = new Set(state.celebrated);
    const crossed: MilestoneId[] = [];

    if (state.firstSparringCompleted && !celebrated.has('first-sparring')) {
      crossed.push('first-sparring');
    }

    if (
      (state.lastMastered ?? 0) < 100 &&
      signals.mastered >= 100 &&
      !celebrated.has('mastery-100')
    ) {
      crossed.push('mastery-100');
    }

    const crossedStreaks: MilestoneId[] = [];
    for (const milestone of STREAK_MILESTONES) {
      if (
        (state.lastStreak ?? 0) < milestone.threshold &&
        signals.streak >= milestone.threshold &&
        !celebrated.has(milestone.id)
      ) {
        crossedStreaks.push(milestone.id);
      }
    }
    const highestCrossedStreak = crossedStreaks.at(-1);
    if (highestCrossedStreak) {
      crossed.push(highestCrossedStreak);
      for (const milestone of crossedStreaks) celebrated.add(milestone);
    }

    for (const milestone of crossed) celebrated.add(milestone);
    const pending = [...new Set([...state.pending, ...crossed])];
    await storage.setItem(
      key,
      JSON.stringify({
        ...state,
        lastMastered: signals.mastered,
        lastStreak: signals.streak,
        celebrated: [...celebrated],
        pending,
      } satisfies StoredMilestoneState),
    );

    if (milestoneLeases.has(key) || pending.length === 0) return null;
    milestoneLeases.set(key, pending[0]);
    return pending[0];
  });
}

/** Marks a leased milestone as presented. The receipt remains in `celebrated` for deduplication. */
export function acknowledgeMilestone(
  storage: MilestoneStorage,
  userId: string,
  milestone: MilestoneId,
): Promise<void> {
  const key = milestoneStorageKey(userId);
  return withStorageLock(key, async () => {
    const state = parseState(await storage.getItem(key), userId);
    await storage.setItem(
      key,
      JSON.stringify({
        ...state,
        pending: state.pending.filter((item) => item !== milestone),
      } satisfies StoredMilestoneState),
    );
    if (milestoneLeases.get(key) === milestone) milestoneLeases.delete(key);
  });
}

/** Releases an in-memory presentation lease while keeping its persisted pending receipt. */
export function releaseMilestoneClaim(userId: string, milestone: MilestoneId): void {
  const key = milestoneStorageKey(userId);
  if (milestoneLeases.get(key) === milestone) milestoneLeases.delete(key);
}

/** U3 calls this after the first live sparring session reaches its done phase. */
export function recordFirstSparringCompletion(
  storage: MilestoneStorage,
  userId: string,
): Promise<void> {
  const key = milestoneStorageKey(userId);
  return withStorageLock(key, async () => {
    const state = parseState(await storage.getItem(key), userId);
    if (state.firstSparringCompleted) return;
    await storage.setItem(
      key,
      JSON.stringify({ ...state, firstSparringCompleted: true } satisfies StoredMilestoneState),
    );
  });
}
