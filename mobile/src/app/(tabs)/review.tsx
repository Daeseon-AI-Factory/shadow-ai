import { useCallback, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, reviewApi, analysisApi, REVIEW_QUALITY, type ReviewQueueItem } from '@shadow-ai/core';

import { ChunkLadder } from '@/components/chunk-ladder';
import { ErrorState } from '@/components/error-state';
import { SkeletonCards } from '@/components/skeleton';
import { haptic } from '@/lib/haptics';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { pressableRipple, pressableStyle } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const GRADES = [
  { label: 'Again', labelKey: 'review.again', quality: REVIEW_QUALITY.AGAIN, color: '#dc2626' },
  { label: 'Hard', labelKey: 'review.hard', quality: REVIEW_QUALITY.HARD, color: '#f59e0b' },
  { label: 'Good', labelKey: 'review.good', quality: REVIEW_QUALITY.GOOD, color: '#208AEF' },
  { label: 'Easy', labelKey: 'review.easy', quality: REVIEW_QUALITY.EASY, color: '#10b981' },
];
const ALERT_REOPEN_DELAY_MS = 350;
type GradeAttempt = { itemId: string; quality: number; focusGeneration: number };

export default function ReviewScreen() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const respondingRef = useRef(false);
  const feedbackActiveRef = useRef(false);
  const focusGenerationRef = useRef(0);
  const feedbackPendingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queue = useQuery({
    queryKey: ['review', 'queue'],
    queryFn: () => reviewApi.queue(),
    enabled: !!token,
  });

  // expo-router keeps screens mounted, so a returning user would land past the end of a
  // finished session ("Review done") even with new cards due. Reset + refetch on every focus.
  useFocusEffect(
    useCallback(() => {
      focusGenerationRef.current += 1;
      feedbackActiveRef.current = true;
      feedbackPendingRef.current = false;
      setFeedbackPending(false);
      setPos(0);
      setRevealed(false);
      queue.refetch();
      return () => {
        feedbackActiveRef.current = false;
        focusGenerationRef.current += 1;
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
        feedbackPendingRef.current = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const item: ReviewQueueItem | undefined = queue.data?.[pos];

  // Korean prompt for the current clip (recall cue). Falls back gracefully if not analyzed.
  const analysis = useQuery({
    queryKey: ['analysis', item?.clipId],
    queryFn: () => analysisApi.get(item!.clipId),
    enabled: !!item,
  });

  const releaseGradeFeedback = () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = null;
    feedbackPendingRef.current = false;
    if (feedbackActiveRef.current) setFeedbackPending(false);
  };

  const queueGradeFeedback = (variables: GradeAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.focusGeneration !== focusGenerationRef.current
    ) return;
    feedbackPendingRef.current = true;
    setFeedbackPending(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    const feedbackTimer = setTimeout(() => {
      if (feedbackTimerRef.current !== feedbackTimer) return;
      feedbackTimerRef.current = null;
      if (
        !feedbackActiveRef.current ||
        variables.focusGeneration !== focusGenerationRef.current
      ) return;
      Alert.alert(
        t('feedback.gradeFailedTitle'),
        t('feedback.gradeFailedMessage'),
        [
          { text: t('common.cancel'), style: 'cancel', onPress: releaseGradeFeedback },
          {
            text: t('common.retry'),
            onPress: () => {
              releaseGradeFeedback();
              if (!feedbackActiveRef.current) return;
              submitGrade(variables);
            },
          },
        ],
        { cancelable: true, onDismiss: releaseGradeFeedback },
      );
    }, ALERT_REOPEN_DELAY_MS);
    feedbackTimerRef.current = feedbackTimer;
  };

  const respond = useMutation({
    mutationFn: ({ itemId, quality }: GradeAttempt) =>
      reviewApi.respond(itemId, quality),
    onSuccess: (_data, variables) => {
      if (
        !feedbackActiveRef.current ||
        variables.focusGeneration !== focusGenerationRef.current
      ) {
        qc.invalidateQueries({ queryKey: ['review', 'queue'] });
        return;
      }
      (pos >= (queue.data?.length ?? 0) - 1 ? haptic.success : haptic.tap)();
      setRevealed(false);
      setPos((p) => p + 1);
    },
    onError: (error, variables) => {
      if (error instanceof ApiError && error.status === 401) return;
      queueGradeFeedback(variables);
    },
    onSettled: () => {
      respondingRef.current = false;
    },
  });

  const submitGrade = (variables: GradeAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.focusGeneration !== focusGenerationRef.current ||
      respondingRef.current ||
      feedbackPendingRef.current
    ) return;
    respondingRef.current = true;
    respond.mutate(variables);
  };

  if (!token) return <Redirect href="/login" />;
  if (queue.isPending) {
    return (
      <ThemedView style={styles.flex}>
        <SkeletonCards count={3} height={120} />
      </ThemedView>
    );
  }
  if (queue.isError) {
    return (
      <ThemedView style={styles.flex}>
        <ErrorState message={(queue.error as Error).message} onRetry={() => queue.refetch()} />
      </ThemedView>
    );
  }

  const total = queue.data?.length ?? 0;
  const done = pos >= total;

  if (total === 0 || done) {
    const finished = done && total > 0;
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText style={styles.doneEmoji}>{finished ? '🎉' : '☕'}</ThemedText>
          <ThemedText type="title" style={styles.doneTitle}>
            {finished ? t('review.reviewDone') : t('review.nothingDue')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.doneTitle}>
            {finished ? t('review.reviewedCount', { n: total }) : t('review.nothingDueSub')}
          </ThemedText>
          <Pressable
            style={pressableStyle(styles.primaryBtn)}
            android_ripple={pressableRipple}
            onPress={() => router.replace('/')}
            accessibilityRole="button"
            accessibilityLabel={t('review.home')}
          >
            <ThemedText style={styles.primaryText}>{t('review.home')}</ThemedText>
          </Pressable>
          <Pressable
            style={pressableStyle(styles.doneSecondary)}
            android_ripple={pressableRipple}
            onPress={() => router.replace('/practice')}
            accessibilityRole="button"
            accessibilityLabel={t('review.morePractice')}
          >
            <ThemedText style={styles.doneSecondaryText}>{t('review.morePractice')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const currentItem = item!;
  const clip = currentItem.clip;
  const koPrompt = analysis.data?.primaryTranslation;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="small">
            {t('review.progress', { current: pos + 1, total })} · {clip.videoTitle}
          </ThemedText>

          <View style={styles.promptBox}>
            <ThemedText type="small">{t('review.recallInEnglish')}</ThemedText>
            <ThemedText style={styles.prompt}>
              {koPrompt ?? clip.name ?? t('review.recallThisClip')}
            </ThemedText>
          </View>

          {/* Active retrieval: rebuild the clip's English in English word order before revealing.
              Self-validating, so the grade you give yourself is honest. Mastery persists per-clip
              (shared with the player), so a clip you've mastered opens straight into Blind here too. */}
          {!revealed && analysis.data?.chunkedTranslation && analysis.data.chunkedTranslation.length >= 2 ? (
            <ChunkLadder chunks={analysis.data.chunkedTranslation} clipId={clip.id} />
          ) : null}

          {!revealed ? (
            <Pressable
              style={pressableStyle(styles.primaryBtn)}
              android_ripple={pressableRipple}
              onPress={() => setRevealed(true)}
              accessibilityRole="button"
              accessibilityLabel={t('review.reveal')}
            >
              <ThemedText style={styles.primaryText}>{t('review.reveal')}</ThemedText>
            </Pressable>
          ) : (
            <View style={styles.gap}>
              <View style={styles.answerBox}>
                <ThemedText style={styles.answer}>
                  {clip.transcript ?? t('review.noTranscript')}
                </ThemedText>
              </View>
              <Pressable
                style={pressableStyle(styles.linkBtn)}
                android_ripple={pressableRipple}
                onPress={() => router.push(`/player/${clip.id}`)}
                accessibilityRole="button"
                accessibilityLabel={t('review.openClip')}
              >
                <ThemedText style={styles.linkText}>{t('review.openClip')}</ThemedText>
              </Pressable>

              <View style={styles.gradeRow}>
                {GRADES.map((g) => (
                  <Pressable
                    key={g.label}
                    style={pressableStyle([styles.gradeBtn, { backgroundColor: g.color }])}
                    android_ripple={pressableRipple}
                    disabled={respond.isPending || feedbackPending}
                    onPress={() => {
                      submitGrade({
                        itemId: currentItem.id,
                        quality: g.quality,
                        focusGeneration: focusGenerationRef.current,
                      });
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={t(g.labelKey)}
                  >
                    <ThemedText style={styles.gradeText}>{t(g.labelKey)}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { padding: 24, gap: 16 },
  gap: { gap: 12 },
  promptBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 18,
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  prompt: { fontSize: 20, textAlign: 'center' },
  answerBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
  },
  answer: { fontSize: 18, textAlign: 'center' },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, minHeight: 48, borderRadius: 10, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  gradeText: { color: '#fff', fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minWidth: 112,
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  doneEmoji: { fontSize: 56, marginBottom: 4 },
  doneTitle: { textAlign: 'center' },
  doneSecondary: { minHeight: 44, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
  doneSecondaryText: { color: '#208AEF', fontWeight: '700', fontSize: 15 },
  linkBtn: { minHeight: 44, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' },
  linkText: { color: '#208AEF', fontWeight: '600' },
});
