import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, localToday, practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SpokenCheck } from '@/components/spoken-check';
import { pressableRipple, pressableStyle } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

const ALERT_REOPEN_DELAY_MS = 350;

export type IvMode = 'shadow' | 'produce' | 'respond';

export interface IvItem {
  key: string; // SRS card key
  tag?: string; // small category label
  promptKo: string; // Korean cue (직독직해 chunked, or the explain/situation prompt)
  promptEn: string; // English trigger (the question / situation / cluster)
  answer: string; // English model to produce
  meaningKo?: string; // natural Korean meaning (shown in shadow mode; falls back to promptKo)
  code?: string; // a code snippet to explain (shown as a monospace block instead of a text prompt)
  note?: string; // gloss under the answer (e.g. Korean translation of the model sentence)
  detail?: string; // friendly Korean explanation: nuance, when it's said, pitfalls — shown on reveal
  terms?: string; // Korean glossary of the technical CONCEPTS the card touches (멱등성이 뭔지 등)
}

/**
 * Interview drill runner — three retrieval modes over the same SRS-keyed cards, plus the thing
 * the shared DrillRunner lacks: a way OUT (header back) so a session can be stopped anytime.
 *  - shadow:  answer + meaning shown → say it aloud → 어려워 / 말했어
 *  - produce: Korean (직독직해) cue → reveal English → Again / Got it
 *  - respond: English question/situation → reveal English answer → Again / Got it
 * Grading reuses practiceApi.grade, so streak / due / weak-spots stay in sync.
 */
export function InterviewDrill({
  items,
  mode,
  onExit,
  timerSec,
  enOnly,
  banner,
}: {
  items: IvItem[];
  mode: IvMode;
  onExit: () => void;
  timerSec?: number; // speed round: seconds to answer before the model auto-reveals
  enOnly?: boolean; // EN immersion: hide Korean gloss/translation; detail collapses behind a tap
  banner?: string; // always-visible context above the cards (e.g. the particle's core image)
}) {
  const [queue, setQueue] = useState<IvItem[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(mode === 'shadow');
  const [got, setGot] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const graded = useRef<Set<string>>(new Set());
  const gradingRef = useRef(false);
  const feedbackActiveRef = useRef(true);
  const feedbackPendingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const qc = useQueryClient();

  // Speed round: count down while the prompt is unanswered; at 0 the model auto-reveals (too slow
  // — see the answer, grade yourself honestly). Resets per card; off in shadow mode.
  useEffect(() => {
    if (!timerSec || mode === 'shadow' || revealed || pos >= queue.length) {
      setTimeLeft(null);
      return;
    }
    setTimeLeft(timerSec);
    const id = setInterval(() => setTimeLeft((s) => (s === null || s <= 0 ? s : s - 1)), 1000);
    return () => clearInterval(id);
  }, [timerSec, mode, revealed, pos, queue.length]);
  useEffect(() => {
    if (timeLeft === 0) setRevealed(true);
  }, [timeLeft]);
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
              advance(ok);
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
      qc.invalidateQueries({ queryKey: ['srs'] });
      if (!feedbackActiveRef.current) return;
      setStreak(res.progress.streak);
    },
    onError: (error, { ok }) => {
      if (error instanceof ApiError && error.status === 401) return;
      queueGradeFeedback(ok);
    },
  });

  const header = (
    <View style={styles.header}>
      <Pressable
        style={pressableStyle(undefined)}
        android_ripple={pressableRipple}
        hitSlop={12}
        onPress={onExit}
      >
        <ThemedText style={styles.exit}>‹ {t('iv.exit')}</ThemedText>
      </Pressable>
      <ThemedText type="small">
        {timeLeft !== null ? (
          <ThemedText type="small" style={timeLeft <= 3 ? styles.timerHot : styles.timer}>
            {`⏱ ${timeLeft}s   `}
          </ThemedText>
        ) : null}
        {Math.min(pos + 1, queue.length)} / {queue.length}
        {streak !== null ? `   🔥 ${streak}` : ''}
      </ThemedText>
    </View>
  );

  if (items.length === 0) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {header}
          <View style={styles.center}>
            <ThemedText type="subtitle">{t('drill.allCaughtUp')}</ThemedText>
            <ThemedText type="small">{t('drill.nothingDue')}</ThemedText>
            <Pressable
              style={pressableStyle(styles.linkBtn)}
              android_ripple={pressableRipple}
              onPress={onExit}
            >
              <ThemedText style={styles.linkText}>{t('iv.backToModes')}</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (pos >= queue.length) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {header}
          <View style={styles.center}>
            <ThemedText type="title">{t('drill.done')}</ThemedText>
            <ThemedText type="small">{t('drill.firstTry', { got, total: items.length })}</ThemedText>
            {streak !== null && <ThemedText type="small">{t('drill.streak', { n: streak })}</ThemedText>}
            <Pressable
              style={pressableStyle(styles.primaryBtn)}
              android_ripple={pressableRipple}
              onPress={onExit}
            >
              <ThemedText style={styles.primaryText}>{t('iv.backToModes')}</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const item = queue[pos];

  const advance = async (ok: boolean) => {
    if (!feedbackActiveRef.current || feedbackPendingRef.current) return;
    if (!graded.current.has(item.key)) {
      if (gradingRef.current) return;
      gradingRef.current = true;
      try {
        await grade.mutateAsync({ key: item.key, ok });
      } catch {
        // The mutation-level onError explains the retry. Keep this card in place.
        return;
      } finally {
        gradingRef.current = false;
      }
      if (!feedbackActiveRef.current) return;
      graded.current.add(item.key);
      if (ok) setGot((g) => g + 1);
    }
    // "Again" repeats THIS card immediately — do NOT advance. Drill the missed one until "Got it".
    setShowDetail(false);
    if (!ok) {
      setRevealed(mode === 'shadow');
      return;
    }
    setPos((p) => p + 1);
    setRevealed(mode === 'shadow');
  };

  // EN immersion: the Korean layer (translation + 해설) collapses behind one tap instead of
  // rendering inline — peek when stuck, otherwise the rep stays English-only.
  const explainToggle = (it: IvItem) =>
    it.detail || it.note || it.meaningKo ? (
      <View style={styles.gap}>
        <Pressable
          style={pressableStyle(styles.detailToggle)}
          android_ripple={pressableRipple}
          onPress={() => setShowDetail((s) => !s)}
        >
          <ThemedText type="small" style={styles.detailToggleText}>
            💡 {t(showDetail ? 'iv.hideDetail' : 'iv.showDetail')}
          </ThemedText>
        </Pressable>
        {showDetail ? (
          <View style={styles.detailBox}>
            {it.note || it.meaningKo ? (
              <ThemedText type="small" style={styles.detailText}>{it.note ?? it.meaningKo}</ThemedText>
            ) : null}
            {it.terms ? (
              <ThemedText type="small" style={styles.termsText}>📚 {it.terms}</ThemedText>
            ) : null}
            {it.detail ? (
              <ThemedText type="small" style={styles.detailText}>{it.detail}</ThemedText>
            ) : null}
          </View>
        ) : null}
      </View>
    ) : null;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        {header}
        <ScrollView style={styles.flex} contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {banner ? (
            <View style={styles.banner}>
              <ThemedText type="small" style={styles.bannerText}>{banner}</ThemedText>
            </View>
          ) : null}
          {item.tag ? (
            <ThemedText type="small" style={styles.tag}>
              {item.tag}
            </ThemedText>
          ) : null}

          {mode === 'shadow' ? (
            // Encode: model + meaning visible, repeat aloud.
            <View style={styles.gap}>
              <View style={styles.modelBox}>
                <ThemedText style={styles.model}>{item.answer}</ThemedText>
                {!enOnly && item.note ? (
                  <ThemedText type="small" style={styles.gloss}>
                    {item.note}
                  </ThemedText>
                ) : null}
              </View>
              {!enOnly ? (
                <ThemedText style={styles.meaning}>{item.meaningKo ?? item.promptKo}</ThemedText>
              ) : null}
              {!enOnly && (item.detail || item.terms) ? (
                <View style={styles.detailBox}>
                  {item.terms ? (
                    <ThemedText type="small" style={styles.termsText}>📚 {item.terms}</ThemedText>
                  ) : null}
                  {item.detail ? (
                    <ThemedText type="small" style={styles.detailText}>{item.detail}</ThemedText>
                  ) : null}
                </View>
              ) : null}
              {enOnly ? explainToggle(item) : null}
              <ThemedText type="small" style={styles.hint}>{t('iv.sayAloud')}</ThemedText>
              <View style={styles.row}>
                <Pressable
                  style={pressableStyle([styles.gradeBtn, styles.again])}
                  android_ripple={pressableRipple}
                  disabled={grade.isPending || feedbackPending}
                  onPress={() => advance(false)}
                >
                  <ThemedText style={styles.againText}>{t('iv.hard')}</ThemedText>
                </Pressable>
                <Pressable
                  style={pressableStyle([styles.gradeBtn, styles.gotIt])}
                  android_ripple={pressableRipple}
                  disabled={grade.isPending || feedbackPending}
                  onPress={() => advance(true)}
                >
                  <ThemedText style={styles.primaryText}>{t('iv.saidIt')}</ThemedText>
                </Pressable>
              </View>
            </View>
          ) : (
            // Produce (한→영) / Respond (상황→답 / code): prompt, then reveal + grade.
            <>
              {item.code ? (
                <View style={styles.codeBox}>
                  <ThemedText style={styles.code}>{item.code}</ThemedText>
                </View>
              ) : (
                <View style={styles.promptBox}>
                  <ThemedText style={mode === 'respond' ? styles.promptEn : styles.promptKo}>
                    {mode === 'respond' ? item.promptEn : item.promptKo}
                  </ThemedText>
                </View>
              )}
              {!revealed ? (
                <View style={styles.gap}>
                  <SpokenCheck question={item.answer} />
                  <Pressable
                    style={pressableStyle(styles.primaryBtn)}
                    android_ripple={pressableRipple}
                    onPress={() => setRevealed(true)}
                  >
                    <ThemedText style={styles.primaryText}>{t('drill.reveal')}</ThemedText>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.gap}>
                  <View style={styles.modelBox}>
                    <ThemedText style={styles.model}>{item.answer}</ThemedText>
                    {!enOnly && item.note ? (
                      <ThemedText type="small" style={styles.gloss}>
                        {item.note}
                      </ThemedText>
                    ) : null}
                  </View>
                  {!enOnly && (item.detail || item.terms) ? (
                    <View style={styles.detailBox}>
                      {item.terms ? (
                        <ThemedText type="small" style={styles.termsText}>📚 {item.terms}</ThemedText>
                      ) : null}
                      {item.detail ? (
                        <ThemedText type="small" style={styles.detailText}>{item.detail}</ThemedText>
                      ) : null}
                    </View>
                  ) : null}
                  {enOnly ? explainToggle(item) : null}
                  <View style={styles.row}>
                    <Pressable
                      style={pressableStyle([styles.gradeBtn, styles.again])}
                      android_ripple={pressableRipple}
                      disabled={grade.isPending || feedbackPending}
                      onPress={() => advance(false)}
                    >
                      <ThemedText style={styles.againText}>{t('drill.again')}</ThemedText>
                    </Pressable>
                    <Pressable
                      style={pressableStyle([styles.gradeBtn, styles.gotIt])}
                      android_ripple={pressableRipple}
                      disabled={grade.isPending || feedbackPending}
                      onPress={() => advance(true)}
                    >
                      <ThemedText style={styles.primaryText}>{t('drill.gotIt')}</ThemedText>
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9ca3af55',
  },
  exit: { color: '#208AEF', fontWeight: '700', fontSize: 16 },
  timer: { color: '#208AEF', fontWeight: '700' },
  timerHot: { color: '#dc2626', fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
  body: { padding: 24, gap: 16, paddingBottom: 40 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12, marginTop: 4 },
  tag: { textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 },
  banner: {
    borderRadius: 10,
    backgroundColor: '#1d4ed811',
    borderWidth: 1,
    borderColor: '#1d4ed833',
    padding: 12,
  },
  bannerText: { lineHeight: 20, color: '#1d4ed8' },
  promptBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  promptKo: { fontSize: 22, textAlign: 'center', lineHeight: 32 },
  promptEn: { fontSize: 18, textAlign: 'center', lineHeight: 26, fontWeight: '600', color: '#208AEF' },
  codeBox: { borderRadius: 12, backgroundColor: '#0b1021', padding: 16, marginTop: 4 },
  code: { fontFamily: 'Menlo', fontSize: 13, lineHeight: 20, color: '#e5e7eb' },
  modelBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  model: { fontSize: 18, fontFamily: 'Menlo', textAlign: 'center', lineHeight: 26 },
  gloss: { textAlign: 'center', color: '#6b7280' },
  detailBox: {
    borderRadius: 10,
    backgroundColor: '#f3f4f680',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af55',
    padding: 12,
  },
  detailText: { lineHeight: 20, color: '#4b5563' },
  termsText: { lineHeight: 20, color: '#1d4ed8', marginBottom: 6 },
  detailToggle: { alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 14 },
  detailToggleText: { color: '#208AEF', fontWeight: '600' },
  meaning: { fontSize: 16, textAlign: 'center', color: '#6b7280' },
  hint: { textAlign: 'center', opacity: 0.7 },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  gradeBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  again: { borderWidth: 1, borderColor: '#9ca3af' },
  againText: { fontWeight: '600' },
  gotIt: { backgroundColor: '#208AEF' },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
});
