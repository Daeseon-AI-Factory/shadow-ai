import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiError,
  localToday,
  practiceApi,
  useMastery,
  type SrsCard,
} from '@shadow-ai/core';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { SessionSummary } from '@/components/session-summary';
import { PrimaryButton } from '@/components/talk-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

const ALERT_REOPEN_DELAY_MS = 350;
const WARMUP_CREDIT = 1;

type GradeAttempt = { key: string; ok: boolean };

function monotonicSessionProgress(
  previous: number,
  completed: number,
  queueLength: number,
) {
  if (queueLength <= 0) return 1;
  const boundedCompleted = Math.min(Math.max(0, completed), queueLength);
  const creditedProgress =
    (boundedCompleted + WARMUP_CREDIT) / (queueLength + WARMUP_CREDIT);
  return Math.max(previous, Math.min(1, creditedProgress));
}

function cardsRemaining(completed: number, queueLength: number) {
  return Math.max(0, queueLength - completed);
}

function isFinalStretch(completed: number, queueLength: number) {
  const remaining = cardsRemaining(completed, queueLength);
  return (
    remaining > 0 &&
    remaining <= Math.max(1, Math.ceil(queueLength * 0.2))
  );
}

export interface DrillItem {
  key: string; // SRS card key (pat:… / col:…)
  title: string; // the frame / anchor to produce
  subtitle?: string; // category / gloss
  cue: string; // Korean cue to express
  model: string; // English model answer
  note?: string; // gloss shown under the model
  target?: string; // the chunk to use in compose mode (defaults to model)
}

/**
 * Shared reveal → Again/Got-it loop for any keyed drill (patterns, collocations).
 * All behavior — first-attempt-only SRS grade, in-session requeue on miss — matches the
 * web app's drills, because the grading call and key format come from @shadow-ai/core.
 */
export type DrillCheck = (
  item: DrillItem,
  attempt: string,
) => Promise<{ ok: boolean; score: number; feedback: string; better: string }>;

/**
 * `onCheck` is optional and strictly additive: when omitted (pattern/collocation drills) the runner
 * behaves exactly as before. When provided (sentence gym), each card offers an inline "AI check" of
 * the learner's produced version before they reveal the model.
 */
export function DrillRunner({ items, onCheck }: { items: DrillItem[]; onCheck?: DrillCheck }) {
  const qc = useQueryClient();
  const theme = useTheme();
  const [queue, setQueue] = useState<DrillItem[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState<number | null>(null);
  const [sessionSrs, setSessionSrs] = useState<SrsCard[] | null>(() =>
    qc.getQueryData<SrsCard[]>(['srs']) ?? null,
  );
  const [progress, setProgress] = useState(() =>
    monotonicSessionProgress(0, 0, items.length),
  );
  const [pendingGrades, setPendingGrades] = useState(0);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const graded = useRef<Set<string>>(new Set());
  const advancingRef = useRef(false);
  const feedbackActiveRef = useRef(true);
  const feedbackPendingRef = useRef(false);
  const feedbackQueueRef = useRef<GradeAttempt[]>([]);
  const feedbackShowingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitGradeRef = useRef<(attempt: GradeAttempt) => void>(() => undefined);
  const successfulGradeCardsRef = useRef<Map<string, SrsCard>>(new Map());
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: sessionSrs === null,
  });
  const mastery = useMastery(sessionSrs ?? []);

  useEffect(() => {
    if (!srs.data || sessionSrs !== null) return;
    const next = [...srs.data];
    for (const card of successfulGradeCardsRef.current.values()) {
      const index = next.findIndex((candidate) => candidate.cardKey === card.cardKey);
      if (index >= 0) next[index] = card;
      else next.push(card);
    }
    setSessionSrs(next);
  }, [sessionSrs, srs.data]);

  useEffect(() => {
    feedbackActiveRef.current = true;
    feedbackPendingRef.current = false;
    setFeedbackPending(false);
    return () => {
      feedbackActiveRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
      feedbackQueueRef.current = [];
      feedbackShowingRef.current = false;
      feedbackPendingRef.current = false;
    };
  }, []);

  useEffect(() => {
    advancingRef.current = false;
  }, [pos]);

  const showNextGradeFeedback = () => {
    if (!feedbackActiveRef.current || feedbackShowingRef.current) return;
    const attempt = feedbackQueueRef.current.shift();
    if (!attempt) {
      feedbackPendingRef.current = false;
      setFeedbackPending(false);
      return;
    }

    feedbackShowingRef.current = true;
    feedbackPendingRef.current = true;
    setFeedbackPending(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      feedbackTimerRef.current = null;
      if (!feedbackActiveRef.current) {
        feedbackQueueRef.current = [];
        feedbackShowingRef.current = false;
        feedbackPendingRef.current = false;
        return;
      }

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        feedbackShowingRef.current = false;
        showNextGradeFeedback();
      };
      Alert.alert(
        t('feedback.gradeFailedTitle'),
        t('feedback.gradeFailedContinueMessage'),
        [
          { text: t('common.cancel'), style: 'cancel', onPress: finish },
          {
            text: t('common.retry'),
            onPress: () => {
              if (feedbackActiveRef.current) submitGradeRef.current(attempt);
              finish();
            },
          },
        ],
        { cancelable: true, onDismiss: finish },
      );
    }, ALERT_REOPEN_DELAY_MS);
  };

  const queueGradeFeedback = (attempt: GradeAttempt) => {
    if (!feedbackActiveRef.current) return;
    feedbackQueueRef.current.push(attempt);
    showNextGradeFeedback();
  };

  const grade = useMutation({
    mutationFn: ({ key, ok }: GradeAttempt) =>
      practiceApi.grade(key, ok, localToday()),
    onSuccess: (res) => {
      successfulGradeCardsRef.current.set(res.card.cardKey, res.card);
      setSessionSrs((current) => {
        if (!current) return current;
        const next = [...current];
        const index = next.findIndex((card) => card.cardKey === res.card.cardKey);
        if (index >= 0) next[index] = res.card;
        else next.push(res.card);
        return next;
      });
      // Mark the shared list stale without refetching it under an active drill. A live refetch
      // changes parent-built session keys (notably Today) and remounts this runner mid-session.
      // The next SRS screen mount will fetch the authoritative list.
      void qc.invalidateQueries({ queryKey: ['srs'], refetchType: 'none' });
      if (!feedbackActiveRef.current) return;
      setStreak(res.progress.streak);
    },
    onError: (error, attempt) => {
      if (error instanceof ApiError && error.status === 401) return;
      // A lost response can still mean the server applied the non-idempotent grade.
      // Keep the cache stale for later reconciliation, then let the learner explicitly choose
      // whether to retry it without remounting the active session.
      void qc.invalidateQueries({ queryKey: ['srs'], refetchType: 'none' });
      queueGradeFeedback(attempt);
    },
    onSettled: () => {
      if (feedbackActiveRef.current) {
        setPendingGrades((count) => Math.max(0, count - 1));
      }
    },
  });
  const submitGrade = (attempt: GradeAttempt) => {
    if (!feedbackActiveRef.current) return;
    setPendingGrades((count) => count + 1);
    grade.mutate(attempt);
  };
  submitGradeRef.current = submitGrade;

  if (items.length === 0) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="subtitle">{t('drill.allCaughtUp')}</ThemedText>
          <ThemedText type="small">{t('drill.nothingDue')}</ThemedText>
          <Chip
            tone="primary"
            style={styles.linkBtn}
            onPress={() => router.back()}
          >
            {t('drill.back')}
          </Chip>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const done = pos >= queue.length;

  const answer = (ok: boolean) => {
    if (
      !feedbackActiveRef.current ||
      feedbackPendingRef.current ||
      advancingRef.current
    ) return;
    const cur = queue[pos];
    if (!cur) return;
    advancingRef.current = true;

    if (!graded.current.has(cur.key)) {
      graded.current.add(cur.key);
      submitGrade({ key: cur.key, ok });
    }

    const nextQueueLength = queue.length + (ok ? 0 : 1);
    const nextCompleted = pos + 1;
    setProgress((previous) =>
      monotonicSessionProgress(previous, nextCompleted, nextQueueLength),
    );
    if (!ok) setQueue((q) => [...q, cur]);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  if (done) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <SessionSummary
            title={t('sessionSummary.drillTitle')}
            metrics={[
              {
                id: 'practice',
                value: pos,
                label: t('sessionSummary.practice'),
                tone: 'primary',
              },
              {
                id: 'mastered',
                value: sessionSrs ? mastery.mastered : '—',
                label: t('sessionSummary.mastered'),
                tone: 'mint',
              },
            ]}
            streak={streak}
            confirmLabel={t('sessionSummary.confirm')}
            confirmDisabled={pendingGrades > 0 || feedbackPending}
            onConfirm={() => router.replace('/')}
          />
        </SafeAreaView>
      </ThemedView>
    );
  }

  const item = queue[pos];
  const remaining = cardsRemaining(pos, queue.length);
  const finalStretch = isFinalStretch(pos, queue.length);
  const progressWidth = `${Math.round(progress * 100)}%` as `${number}%`;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="interactive"
        >
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{
              min: 0,
              max: 100,
              now: Math.round(progress * 100),
              text: t('drill.progressA11y', { completed: pos, total: queue.length }),
            }}
            style={[styles.progressTrack, { backgroundColor: theme.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: finalStretch ? theme.amber : theme.primary,
                  width: progressWidth,
                },
              ]}
            />
          </View>
          <View style={styles.progressHeader}>
            <ThemedText type="smallBold">
              {pos + 1} / {queue.length}
              {streak !== null ? `   🔥 ${streak}` : ''}
            </ThemedText>
            {finalStretch ? (
              <ThemedText type="smallBold" style={{ color: theme.amber }}>
                {t('drill.remaining', { n: remaining })}
              </ThemedText>
            ) : null}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {t('drill.warmupCredit')}
          </ThemedText>

          <View style={styles.frameBox}>
            {item.subtitle ? (
              <ThemedText type="small" style={styles.subtitle}>
                {item.subtitle}
              </ThemedText>
            ) : null}
            <ThemedText type="mono" themeColor="primary" style={styles.frame}>
              {item.title}
            </ThemedText>
          </View>

          <Card style={styles.cueBox}>
            <ThemedText type="label" themeColor="textSecondary">{t('drill.sayThis')}</ThemedText>
            <ThemedText style={styles.cue}>{item.cue}</ThemedText>
          </Card>

          {!revealed ? (
            <View style={styles.gap}>
              {onCheck ? <InlineCheck key={item.key} item={item} onCheck={onCheck} /> : null}
              <PrimaryButton
                style={styles.primaryBtn}
                onPress={() => setRevealed(true)}
              >
                {t('drill.reveal')}
              </PrimaryButton>
            </View>
          ) : (
            <View style={styles.gap}>
              <Card accent="primary" selected style={styles.modelBox}>
                <ThemedText type="mono" style={styles.model}>{item.model}</ThemedText>
                {item.note ? (
                  <ThemedText type="small" style={styles.gloss}>
                    {item.note}
                  </ThemedText>
                ) : null}
              </Card>
              <View style={styles.row}>
                <Chip
                  tone="live"
                  style={styles.gradeBtn}
                  textStyle={styles.gradeText}
                  disabled={feedbackPending}
                  onPress={() => answer(false)}
                >
                  {t('drill.again')}
                </Chip>
                <Chip
                  tone="mint"
                  style={styles.gradeBtn}
                  textStyle={styles.gradeText}
                  disabled={feedbackPending}
                  onPress={() => answer(true)}
                >
                  {t('drill.gotIt')}
                </Chip>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Optional in-drill AI check: type your produced version, get a verdict before revealing. */
function InlineCheck({ item, onCheck }: { item: DrillItem; onCheck: DrillCheck }) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const check = useMutation({ mutationFn: () => onCheck(item, text.trim()) });
  const fb = check.data;
  return (
    <Card style={styles.checkBox}>
      <TextInput
        style={[
          styles.checkInput,
          {
            color: theme.text,
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}
        placeholder={t('drill.checkPlaceholder')}
        placeholderTextColor={theme.textSecondary}
        selectionColor={theme.primary}
        multiline
        value={text}
        onChangeText={setText}
      />
      {check.isError ? (
        <ThemedText themeColor="textSecondary">{t('drill.checkFailed')}</ThemedText>
      ) : null}
      {fb ? (
        <Card accent={fb.ok ? 'mint' : 'amber'} selected style={styles.checkVerdict}>
          <ThemedText type="smallBold">
            {fb.ok ? t('drill.good') : t('drill.needsWork')}  ·  {fb.score}/100
          </ThemedText>
          <ThemedText type="small">{fb.feedback}</ThemedText>
          {fb.better ? (
            <ThemedText style={styles.checkBetter}>{t('drill.better', { text: fb.better })}</ThemedText>
          ) : null}
        </Card>
      ) : null}
      <PrimaryButton
        accessibilityLabel={t('drill.aiCheck')}
        accessibilityState={{ busy: check.isPending }}
        style={styles.checkBtn}
        disabled={!text.trim() || check.isPending}
        onPress={() => check.mutate()}
      >
        {check.isPending ? (
          <ActivityIndicator color={theme.onPrimary} />
        ) : (
          t('drill.aiCheck')
        )}
      </PrimaryButton>
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flexGrow: 1, padding: 24, gap: 18 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTrack: {
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 999,
    height: '100%',
  },
  subtitle: { textTransform: 'uppercase', letterSpacing: 1 },
  frameBox: { alignItems: 'center', gap: 6, marginTop: 8 },
  frame: { fontSize: 18, textAlign: 'center' },
  cueBox: {
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  cue: { fontSize: 22, textAlign: 'center' },
  modelBox: {
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  model: { fontSize: 18, textAlign: 'center' },
  gloss: { textAlign: 'center' },
  primaryBtn: {
    marginTop: 8,
  },
  gradeBtn: { flex: 1, alignSelf: 'stretch', minHeight: 52, borderWidth: 2 },
  gradeText: { fontSize: 14, fontWeight: '800' },
  linkBtn: { alignSelf: 'center', minHeight: 44 },
  checkBox: { gap: 8 },
  checkInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 64,
    textAlignVertical: 'top',
  },
  checkVerdict: { borderRadius: 12, padding: 12, gap: 4 },
  checkBetter: { fontStyle: 'italic' },
  checkBtn: { marginTop: 2 },
});
