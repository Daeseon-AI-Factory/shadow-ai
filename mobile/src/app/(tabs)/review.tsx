import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, reviewApi, analysisApi, REVIEW_QUALITY, type ReviewQueueItem } from '@shadow-ai/core';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { ChunkLadder } from '@/components/chunk-ladder';
import { ErrorState } from '@/components/error-state';
import { SkeletonCards } from '@/components/skeleton';
import { haptic } from '@/lib/haptics';
import { PrimaryButton } from '@/components/talk-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const GRADES = [
  { labelKey: 'review.again', quality: REVIEW_QUALITY.AGAIN, tone: 'live' },
  { labelKey: 'review.hard', quality: REVIEW_QUALITY.HARD, tone: 'amber' },
  { labelKey: 'review.good', quality: REVIEW_QUALITY.GOOD, tone: 'primary' },
  { labelKey: 'review.easy', quality: REVIEW_QUALITY.EASY, tone: 'mint' },
] as const;
const ALERT_REOPEN_DELAY_MS = 350;
const CARD_FLIP_HALF_DURATION_MS = 140;
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
  const flipFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const flipGenerationRef = useRef(0);
  const flipInProgressRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const flipRotation = useSharedValue(0);
  const flipStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${flipRotation.value}deg` }],
  }));

  const resetCard = () => {
    flipGenerationRef.current += 1;
    cancelAnimation(flipRotation);
    if (flipFrameRef.current !== null) cancelAnimationFrame(flipFrameRef.current);
    flipFrameRef.current = null;
    flipInProgressRef.current = false;
    flipRotation.value = 0;
    setRevealed(false);
  };

  const completeFlip = (flipGeneration: number) => {
    if (flipGeneration !== flipGenerationRef.current) return;
    flipInProgressRef.current = false;
  };

  const finishReveal = (flipGeneration: number) => {
    if (flipGeneration !== flipGenerationRef.current) return;
    setRevealed(true);
    flipFrameRef.current = requestAnimationFrame(() => {
      if (flipGeneration !== flipGenerationRef.current) return;
      flipFrameRef.current = null;
      flipRotation.value = -90;
      flipRotation.value = withTiming(0, { duration: CARD_FLIP_HALF_DURATION_MS }, (finished) => {
        if (!finished) return;
        runOnJS(completeFlip)(flipGeneration);
      });
    });
  };

  const revealAnswer = () => {
    if (flipInProgressRef.current) return;
    const flipGeneration = flipGenerationRef.current + 1;
    flipGenerationRef.current = flipGeneration;
    if (reduceMotion) {
      flipRotation.value = 0;
      setRevealed(true);
      return;
    }
    flipInProgressRef.current = true;
    flipRotation.value = withTiming(90, { duration: CARD_FLIP_HALF_DURATION_MS }, (finished) => {
      if (!finished) return;
      runOnJS(finishReveal)(flipGeneration);
    });
  };

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
      resetCard();
      queue.refetch();
      return () => {
        feedbackActiveRef.current = false;
        focusGenerationRef.current += 1;
        flipGenerationRef.current += 1;
        cancelAnimation(flipRotation);
        if (flipFrameRef.current !== null) cancelAnimationFrame(flipFrameRef.current);
        flipFrameRef.current = null;
        flipInProgressRef.current = false;
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
      resetCard();
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
          <PrimaryButton
            style={styles.primaryBtn}
            onPress={() => router.replace('/')}
            accessibilityLabel={t('review.home')}
          >
            {t('review.home')}
          </PrimaryButton>
          <Chip
            tone="primary"
            style={styles.doneSecondary}
            onPress={() => router.replace('/practice')}
            accessibilityLabel={t('review.morePractice')}
          >
            {t('review.morePractice')}
          </Chip>
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

          <Animated.View style={[styles.cardShell, flipStyle]}>
            <Card style={styles.studyCard}>
              {!revealed ? (
                <ThemedText type="label" themeColor="textSecondary">
                  {t('review.recallInEnglish')}
                </ThemedText>
              ) : null}
              <ThemedText
                accessibilityLiveRegion={revealed ? 'polite' : 'none'}
                style={revealed ? styles.answer : styles.prompt}
              >
                {revealed
                  ? clip.transcript ?? t('review.noTranscript')
                  : koPrompt ?? clip.name ?? t('review.recallThisClip')}
              </ThemedText>
            </Card>
          </Animated.View>

          {/* Active retrieval: rebuild the clip's English in English word order before revealing.
              Self-validating, so the grade you give yourself is honest. Mastery persists per-clip
              (shared with the player), so a clip you've mastered opens straight into Blind here too. */}
          {!revealed && analysis.data?.chunkedTranslation && analysis.data.chunkedTranslation.length >= 2 ? (
            <ChunkLadder chunks={analysis.data.chunkedTranslation} clipId={clip.id} />
          ) : null}

          {!revealed ? (
            <PrimaryButton
              style={styles.primaryBtn}
              onPress={revealAnswer}
              accessibilityLabel={t('review.reveal')}
            >
              {t('review.reveal')}
            </PrimaryButton>
          ) : (
            <View style={styles.gap}>
              <Chip
                tone="primary"
                style={styles.linkBtn}
                onPress={() => router.push(`/player/${clip.id}`)}
                accessibilityLabel={t('review.openClip')}
              >
                {t('review.openClip')}
              </Chip>

              <View style={styles.gradeRow}>
                {GRADES.map((g) => (
                  <Chip
                    key={g.labelKey}
                    tone={g.tone}
                    style={styles.gradeBtn}
                    textStyle={styles.gradeText}
                    disabled={respond.isPending || feedbackPending}
                    onPress={() => {
                      submitGrade({
                        itemId: currentItem.id,
                        quality: g.quality,
                        focusGeneration: focusGenerationRef.current,
                      });
                    }}
                    accessibilityLabel={t(g.labelKey)}
                  >
                    {t(g.labelKey)}
                  </Chip>
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
  cardShell: { width: '100%' },
  studyCard: {
    minHeight: 168,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    backfaceVisibility: 'hidden',
  },
  prompt: { fontSize: 20, textAlign: 'center' },
  answer: { fontSize: 18, textAlign: 'center' },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: {
    flex: 1,
    alignSelf: 'stretch',
    minHeight: 52,
    paddingHorizontal: 8,
    borderWidth: 2,
  },
  gradeText: { fontSize: 13, fontWeight: '800' },
  primaryBtn: {
    minWidth: 112,
    marginTop: 8,
  },
  doneEmoji: { fontSize: 56, marginBottom: 4 },
  doneTitle: { textAlign: 'center' },
  doneSecondary: { alignSelf: 'center', minHeight: 44 },
  linkBtn: { alignSelf: 'center', minHeight: 44 },
});
