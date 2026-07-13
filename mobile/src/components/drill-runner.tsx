import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, localToday, practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { t } from '@/lib/i18n';

const ALERT_REOPEN_DELAY_MS = 350;

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
  const [queue, setQueue] = useState<DrillItem[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const graded = useRef<Set<string>>(new Set());
  const gradingRef = useRef(false);
  const feedbackActiveRef = useRef(true);
  const feedbackPendingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const qc = useQueryClient();

  useEffect(() => {
    feedbackActiveRef.current = true;
    feedbackPendingRef.current = false;
    setFeedbackPending(false);
    return () => {
      feedbackActiveRef.current = false;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
      feedbackPendingRef.current = false;
    };
  }, []);

  const releaseGradeFeedback = () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = null;
    feedbackPendingRef.current = false;
    if (feedbackActiveRef.current) setFeedbackPending(false);
  };

  const queueGradeFeedback = (ok: boolean) => {
    if (!feedbackActiveRef.current) return;
    feedbackPendingRef.current = true;
    setFeedbackPending(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      feedbackTimerRef.current = null;
      if (!feedbackActiveRef.current) {
        releaseGradeFeedback();
        return;
      }
      Alert.alert(
        t('feedback.gradeFailedTitle'),
        t('feedback.gradeFailedStayMessage'),
        [
          { text: t('common.cancel'), style: 'cancel', onPress: releaseGradeFeedback },
          {
            text: t('common.retry'),
            onPress: () => {
              releaseGradeFeedback();
              if (!feedbackActiveRef.current) return;
              answer(ok);
            },
          },
        ],
        { cancelable: true, onDismiss: releaseGradeFeedback },
      );
    }, ALERT_REOPEN_DELAY_MS);
  };

  const grade = useMutation({
    mutationFn: ({ key, ok }: { key: string; ok: boolean }) =>
      practiceApi.grade(key, ok, localToday()),
    onSuccess: (res) => {
      // Due/new counts + lapse/mastered stats shift after every grade — refresh the SRS-backed
      // screens (Pattern, Collocation, Weak spots) so they don't show pre-grade state.
      qc.invalidateQueries({ queryKey: ['srs'] });
      if (!feedbackActiveRef.current) return;
      setStreak(res.progress.streak);
    },
    onError: (error, { ok }) => {
      if (error instanceof ApiError && error.status === 401) return;
      queueGradeFeedback(ok);
    },
  });

  if (items.length === 0) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="subtitle">{t('drill.allCaughtUp')}</ThemedText>
          <ThemedText type="small">{t('drill.nothingDue')}</ThemedText>
          <Pressable style={styles.linkBtn} onPress={() => router.back()}>
            <ThemedText style={styles.linkText}>{t('drill.back')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const done = pos >= queue.length;

  const answer = async (ok: boolean) => {
    if (!feedbackActiveRef.current || feedbackPendingRef.current) return;
    const cur = queue[pos];
    if (!graded.current.has(cur.key)) {
      if (gradingRef.current) return;
      gradingRef.current = true;
      try {
        await grade.mutateAsync({ key: cur.key, ok });
      } catch {
        // The mutation-level onError explains the retry. Keep this card in place.
        return;
      } finally {
        gradingRef.current = false;
      }
      if (!feedbackActiveRef.current) return;
      graded.current.add(cur.key);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  if (done) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="title">{t('drill.done')}</ThemedText>
          <ThemedText type="small">
            {t('drill.firstTry', { got, total: items.length })}
          </ThemedText>
          {streak !== null && (
            <ThemedText type="small">{t('drill.streak', { n: streak })}</ThemedText>
          )}
          <Pressable style={styles.primaryBtn} onPress={() => router.replace('/')}>
            <ThemedText style={styles.primaryText}>{t('drill.home')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const item = queue[pos];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="interactive"
        >
          <ThemedText type="small">
            {pos + 1} / {queue.length}
            {streak !== null ? `   🔥 ${streak}` : ''}
          </ThemedText>

          <View style={styles.frameBox}>
            {item.subtitle ? (
              <ThemedText type="small" style={styles.subtitle}>
                {item.subtitle}
              </ThemedText>
            ) : null}
            <ThemedText style={styles.frame}>{item.title}</ThemedText>
          </View>

          <View style={styles.cueBox}>
            <ThemedText type="small">{t('drill.sayThis')}</ThemedText>
            <ThemedText style={styles.cue}>{item.cue}</ThemedText>
          </View>

          {!revealed ? (
            <View style={styles.gap}>
              {onCheck ? <InlineCheck key={item.key} item={item} onCheck={onCheck} /> : null}
              <Pressable style={styles.primaryBtn} onPress={() => setRevealed(true)}>
                <ThemedText style={styles.primaryText}>{t('drill.reveal')}</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.gap}>
              <View style={styles.modelBox}>
                <ThemedText style={styles.model}>{item.model}</ThemedText>
                {item.note ? (
                  <ThemedText type="small" style={styles.gloss}>
                    {item.note}
                  </ThemedText>
                ) : null}
              </View>
              <View style={styles.row}>
                <Pressable
                  style={[styles.gradeBtn, styles.again]}
                  disabled={grade.isPending || feedbackPending}
                  onPress={() => answer(false)}
                >
                  <ThemedText style={styles.againText}>{t('drill.again')}</ThemedText>
                </Pressable>
                <Pressable
                  style={[styles.gradeBtn, styles.gotIt]}
                  disabled={grade.isPending || feedbackPending}
                  onPress={() => answer(true)}
                >
                  <ThemedText style={styles.primaryText}>{t('drill.gotIt')}</ThemedText>
                </Pressable>
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
  const [text, setText] = useState('');
  const check = useMutation({ mutationFn: () => onCheck(item, text.trim()) });
  const fb = check.data;
  return (
    <View style={styles.checkBox}>
      <TextInput
        style={styles.checkInput}
        placeholder={t('drill.checkPlaceholder')}
        placeholderTextColor="#9ca3af"
        multiline
        value={text}
        onChangeText={setText}
      />
      {check.isError ? <ThemedText style={styles.checkError}>{t('drill.checkFailed')}</ThemedText> : null}
      {fb ? (
        <View style={[styles.checkVerdict, fb.ok ? styles.checkOk : styles.checkWork]}>
          <ThemedText type="smallBold">
            {fb.ok ? t('drill.good') : t('drill.needsWork')}  ·  {fb.score}/100
          </ThemedText>
          <ThemedText type="small">{fb.feedback}</ThemedText>
          {fb.better ? (
            <ThemedText style={styles.checkBetter}>{t('drill.better', { text: fb.better })}</ThemedText>
          ) : null}
        </View>
      ) : null}
      <Pressable
        style={[styles.checkBtn, (!text.trim() || check.isPending) && styles.disabled]}
        disabled={!text.trim() || check.isPending}
        onPress={() => check.mutate()}
      >
        {check.isPending ? (
          <ActivityIndicator color="#208AEF" />
        ) : (
          <ThemedText style={styles.checkBtnText}>{t('drill.aiCheck')}</ThemedText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flexGrow: 1, padding: 24, gap: 18 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  subtitle: { textTransform: 'uppercase', letterSpacing: 1 },
  frameBox: { alignItems: 'center', gap: 6, marginTop: 8 },
  frame: { fontSize: 18, color: '#208AEF', fontFamily: 'Menlo', textAlign: 'center' },
  cueBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  cue: { fontSize: 22, textAlign: 'center' },
  modelBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  model: { fontSize: 18, fontFamily: 'Menlo', textAlign: 'center' },
  gloss: { textAlign: 'center' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  gradeBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  again: { borderWidth: 1, borderColor: '#9ca3af' },
  againText: { fontWeight: '600' },
  gotIt: { backgroundColor: '#208AEF' },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
  disabled: { opacity: 0.5 },
  checkBox: { gap: 8 },
  checkInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 64,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  checkError: { color: '#dc2626' },
  checkVerdict: { borderRadius: 10, borderWidth: 1, padding: 12, gap: 4 },
  checkOk: { borderColor: '#10b98155', backgroundColor: '#10b98111' },
  checkWork: { borderColor: '#f59e0b55', backgroundColor: '#f59e0b11' },
  checkBetter: { fontStyle: 'italic' },
  checkBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  checkBtnText: { color: '#208AEF', fontWeight: '700' },
});
