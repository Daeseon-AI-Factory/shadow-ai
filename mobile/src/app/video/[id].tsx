import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import boldSymbolWeight from 'expo-symbols/androidWeights/bold';
import { useMutation, useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { ApiError, clipsApi, videosApi, type TranscriptSegment } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ErrorState } from '@/components/error-state';
import { LineRecorder } from '@/components/line-recorder';
import { pressableRipple, pressableStyle } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const ALERT_REOPEN_DELAY_MS = 350;
type ClipAttempt = {
  videoId: string;
  segment: TranscriptSegment;
  routeGeneration: number;
};

export default function VideoDetailScreen() {
  const token = useAuthStore((s) => s.token);
  const { id } = useLocalSearchParams<{ id: string }>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const makingClipRef = useRef(false);
  const feedbackActiveRef = useRef(true);
  const routeGenerationRef = useRef(0);
  const feedbackPendingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentMs, setCurrentMs] = useState(0);
  const [mode, setMode] = useState<'sentences' | 'full'>('sentences');
  const [rate, setRate] = useState(1); // playback speed — 0.5x..1.5x for shadowing
  // Speed + A-B/auto/reps are power-user controls — collapsed by default so the screen reads like a
  // script you tap through, not a mixing desk.
  const [showAdvanced, setShowAdvanced] = useState(false);

  // --- Shadowing loop model ---------------------------------------------------------------
  // loop = a line-index range [a, b] to repeat. Single line → a === b. null → free play.
  const [loop, setLoop] = useState<{ a: number; b: number } | null>(null);
  // A-B arming: tap "A-B", then tap one line (sets A) and a second (sets B) → range loop.
  const [arming, setArming] = useState<'none' | 'A' | 'B'>('none');
  const [armA, setArmA] = useState<number | null>(null);
  // Auto-advance: walk the range one line at a time, repeating each `reps` times, then move on.
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [reps, setReps] = useState(3);

  // Refs so the single polling interval reads live values without re-subscribing every change.
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const autoRef = useRef(autoAdvance);
  autoRef.current = autoAdvance;
  const repsRef = useRef(reps);
  repsRef.current = reps;
  const cursorRef = useRef(0); // line index currently being looped (within the range)
  const repCountRef = useRef(0); // how many times the cursor line has repeated

  const video = useQuery({
    queryKey: ['video', id],
    queryFn: () => videosApi.get(id),
    enabled: !!token && !!id,
  });

  useEffect(() => {
    routeGenerationRef.current += 1;
    feedbackActiveRef.current = true;
    feedbackPendingRef.current = false;
    setFeedbackPending(false);
    return () => {
      feedbackActiveRef.current = false;
      routeGenerationRef.current += 1;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
      feedbackPendingRef.current = false;
    };
  }, [id]);

  const releaseClipFeedback = () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = null;
    feedbackPendingRef.current = false;
    if (feedbackActiveRef.current) setFeedbackPending(false);
  };

  const queueClipFeedback = (variables: ClipAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.routeGeneration !== routeGenerationRef.current
    ) return;
    feedbackPendingRef.current = true;
    setFeedbackPending(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    const feedbackTimer = setTimeout(() => {
      if (feedbackTimerRef.current !== feedbackTimer) return;
      feedbackTimerRef.current = null;
      if (
        !feedbackActiveRef.current ||
        variables.routeGeneration !== routeGenerationRef.current
      ) return;
      Alert.alert(
        t('feedback.clipCreateFailedTitle'),
        t('feedback.clipCreateFailedMessage'),
        [
          { text: t('common.cancel'), style: 'cancel', onPress: releaseClipFeedback },
          {
            text: t('common.retry'),
            onPress: () => {
              releaseClipFeedback();
              if (!feedbackActiveRef.current) return;
              submitClip(variables);
            },
          },
        ],
        { cancelable: true, onDismiss: releaseClipFeedback },
      );
    }, ALERT_REOPEN_DELAY_MS);
    feedbackTimerRef.current = feedbackTimer;
  };

  // Make a one-line clip from a transcript line, then open the clip player (loop + record + AI).
  const makeClip = useMutation({
    mutationFn: ({ videoId, segment }: ClipAttempt) =>
      clipsApi.create({
        videoId,
        startMs: segment.startMs,
        endMs: segment.endMs,
        name: segment.text.slice(0, 40),
        tags: [],
      }),
    onSuccess: (clip, variables) => {
      if (
        feedbackActiveRef.current &&
        variables.routeGeneration === routeGenerationRef.current
      ) router.push(`/player/${clip.id}`);
    },
    onError: (error, variables) => {
      if (error instanceof ApiError && error.status === 401) return;
      queueClipFeedback(variables);
    },
    onSettled: () => {
      makingClipRef.current = false;
    },
  });

  const submitClip = (variables: ClipAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.routeGeneration !== routeGenerationRef.current ||
      makingClipRef.current ||
      feedbackPendingRef.current
    ) return;
    makingClipRef.current = true;
    makeClip.mutate(variables);
  };

  const lines: TranscriptSegment[] = useMemo(() => {
    const v = video.data;
    if (!v) return [];
    if (mode === 'sentences' && v.sentences.length > 0) return v.sentences;
    return v.transcriptSegments;
  }, [video.data, mode]);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  // Single polling loop drives both the active-line highlight and the shadowing repeat behavior.
  // The IFrame fires PAUSED (not ENDED) at a mid-video boundary, so polling getCurrentTime is the
  // reliable way to re-seek. Two repeat modes:
  //   • auto-advance OFF → repeat the whole range [a,b] as a block (single line if a===b).
  //   • auto-advance ON  → walk the range one line at a time, each repeated `reps`×, then move on
  //                        (wrapping back to a after b) — the line-by-line shadow drill.
  useEffect(() => {
    if (!playing) return;
    const handle = setInterval(async () => {
      const sec = await playerRef.current?.getCurrentTime?.();
      if (typeof sec !== 'number') return;
      const ms = sec * 1000;
      setCurrentMs(ms);

      const lp = loopRef.current;
      const ls = linesRef.current;
      if (!lp || ls.length === 0) return;

      if (autoRef.current) {
        const cur = ls[cursorRef.current];
        if (cur && ms >= cur.endMs) {
          repCountRef.current += 1;
          if (repCountRef.current >= repsRef.current) {
            repCountRef.current = 0;
            let next = cursorRef.current + 1;
            if (next > lp.b) next = lp.a; // wrap within the range
            cursorRef.current = next;
          }
          const target = ls[cursorRef.current];
          if (target) {
            playerRef.current?.seekTo(target.startMs / 1000, true);
            setCurrentMs(target.startMs);
          }
        }
      } else {
        const b = ls[lp.b];
        const a = ls[lp.a];
        if (a && b && ms >= b.endMs) {
          playerRef.current?.seekTo(a.startMs / 1000, true);
          setCurrentMs(a.startMs);
        }
      }
    }, 100); // tighter poll → the active-line highlight tracks the audio more closely
    return () => clearInterval(handle);
  }, [playing]);

  // Start (or restart) looping a given index range.
  const startLoop = useCallback((a: number, b: number) => {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    setLoop({ a: lo, b: hi });
    cursorRef.current = lo;
    repCountRef.current = 0;
    const seg = linesRef.current[lo];
    if (seg) {
      playerRef.current?.seekTo(seg.startMs / 1000, true);
      setCurrentMs(seg.startMs);
    }
    setPlaying(true);
  }, []);

  // Tap a line. In A-B arming mode it sets point A then point B; otherwise it single-line loops
  // (tapping the same single line again clears the loop).
  const onLinePress = useCallback(
    (index: number) => {
      if (arming === 'A') {
        setArmA(index);
        setArming('B');
        const seg = linesRef.current[index];
        if (seg) {
          playerRef.current?.seekTo(seg.startMs / 1000, true);
          setCurrentMs(seg.startMs);
          setPlaying(true);
        }
        return;
      }
      if (arming === 'B' && armA != null) {
        startLoop(armA, index);
        setArming('none');
        setArmA(null);
        return;
      }
      // Normal: single-line loop; tapping the active single line again stops it.
      if (loop && loop.a === loop.b && loop.a === index) {
        setLoop(null);
        return;
      }
      startLoop(index, index);
    },
    [arming, armA, loop, startLoop],
  );

  const toggleAB = useCallback(() => {
    if (arming === 'none') {
      setArming('A');
      setArmA(null);
    } else {
      setArming('none');
      setArmA(null);
    }
  }, [arming]);

  const activeIndex = useMemo(
    () => lines.findIndex((l) => currentMs >= l.startMs && currentMs < l.endMs),
    [lines, currentMs],
  );

  if (!token) return <Redirect href="/login" />;
  if (video.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (video.isError || !video.data) {
    return (
      <ThemedView style={styles.flex}>
        <ErrorState message={t('video.notFound')} onRetry={() => video.refetch()} />
      </ThemedView>
    );
  }

  const v = video.data;
  const screenW = Dimensions.get('window').width;
  const screenH = Dimensions.get('window').height;
  const portrait = v.orientation === 'PORTRAIT';
  const playerWidth = portrait
    ? Math.min(screenW, Math.round(screenH * 0.5 * (9 / 16)))
    : screenW;
  const height = portrait ? Math.round(playerWidth * (16 / 9)) : Math.round(screenW * (9 / 16));

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {/* Player */}
        <View style={[styles.playerWrap, portrait && styles.playerWrapPortrait]}>
          <YoutubePlayer
            ref={playerRef}
            height={height}
            width={playerWidth}
            play={playing}
            playbackRate={rate}
            videoId={v.youtubeId}
            initialPlayerParams={{ rel: false, modestbranding: true }}
            onChangeState={(s: string) => {
              if (s === 'ended') setPlaying(false);
            }}
          />
        </View>

        {/* Controls + script-mode toggle */}
        <View style={styles.bar}>
          <Pressable
            style={pressableStyle(styles.playBtn)}
            android_ripple={pressableRipple}
            onPress={() => setPlaying((p) => !p)}
            accessibilityRole="button"
            accessibilityLabel={playing ? t('video.pause') : t('video.play')}
          >
            <ThemedText style={styles.playText}>
              {playing ? t('video.pause') : t('video.play')}
            </ThemedText>
          </Pressable>
          <View style={styles.toggle}>
            <Pressable
              style={pressableStyle([styles.toggleItem, mode === 'sentences' && styles.toggleOn])}
              android_ripple={pressableRipple}
              onPress={() => setMode('sentences')}
              accessibilityRole="button"
              accessibilityState={{ selected: mode === 'sentences' }}
            >
              <ThemedText type="small" style={mode === 'sentences' ? styles.toggleOnText : undefined}>
                {t('video.sentences')}
              </ThemedText>
            </Pressable>
            <Pressable
              style={pressableStyle([styles.toggleItem, mode === 'full' && styles.toggleOn])}
              android_ripple={pressableRipple}
              onPress={() => setMode('full')}
              accessibilityRole="button"
              accessibilityState={{ selected: mode === 'full' }}
            >
              <ThemedText type="small" style={mode === 'full' ? styles.toggleOnText : undefined}>
                {t('video.fullScript')}
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Advanced controls (speed, A-B range, auto-advance) are tucked behind a toggle. */}
        <Pressable
          style={pressableStyle(styles.advToggle)}
          android_ripple={pressableRipple}
          onPress={() => setShowAdvanced((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={t('video.advanced')}
        >
          <ThemedText type="small" style={styles.advToggleText}>{t('video.advanced')}</ThemedText>
          <SymbolView
            name={showAdvanced
              ? { ios: 'chevron.up', android: 'keyboard_arrow_up', web: 'keyboard_arrow_up' }
              : { ios: 'chevron.down', android: 'keyboard_arrow_down', web: 'keyboard_arrow_down' }}
            size={16}
            weight={{ ios: 'bold', android: boldSymbolWeight }}
            tintColor="#6b7280"
          />
        </Pressable>

        {showAdvanced && (
        <>
        {/* Playback speed — slow down for shadowing, speed up to skim */}
        <View style={styles.speedRow}>
          {[0.5, 0.75, 1, 1.25, 1.5].map((r) => (
            <Pressable
              key={r}
              style={pressableStyle([styles.speedBtn, rate === r && styles.speedOn])}
              android_ripple={pressableRipple}
              onPress={() => setRate(r)}
              accessibilityRole="button"
              accessibilityState={{ selected: rate === r }}
            >
              <ThemedText type="small" style={rate === r ? styles.speedOnText : undefined}>
                {r}×
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Shadow loop controls: A-B range, auto-advance, reps-per-line */}
        <View style={styles.loopBar}>
          <Pressable
            style={pressableStyle([styles.loopCtl, arming !== 'none' && styles.loopCtlOn])}
            android_ripple={pressableRipple}
            onPress={toggleAB}
            accessibilityRole="button"
            accessibilityState={{ selected: arming !== 'none' }}
          >
            <ThemedText type="small" style={arming !== 'none' ? styles.loopCtlOnText : undefined}>
              {arming === 'A' ? t('video.tapA') : arming === 'B' ? t('video.tapB') : 'A–B'}
            </ThemedText>
          </Pressable>
          <Pressable
            style={pressableStyle([styles.loopCtl, autoAdvance && styles.loopCtlOn])}
            android_ripple={pressableRipple}
            onPress={() => setAutoAdvance((a) => !a)}
            accessibilityRole="button"
            accessibilityState={{ selected: autoAdvance }}
          >
            <ThemedText type="small" style={autoAdvance ? styles.loopCtlOnText : undefined}>
              {t('video.auto')}
            </ThemedText>
          </Pressable>
          <View style={styles.repsBox}>
            <Pressable
              style={pressableStyle(styles.repsBtn)}
              android_ripple={pressableRipple}
              onPress={() => setReps((r) => Math.max(1, r - 1))}
              accessibilityRole="button"
              accessibilityLabel={t('common.decrease')}
            >
              <ThemedText style={styles.repsSign}>−</ThemedText>
            </Pressable>
            <ThemedText type="small" style={styles.repsVal}>
              {t('video.reps', { n: reps })}
            </ThemedText>
            <Pressable
              style={pressableStyle(styles.repsBtn)}
              android_ripple={pressableRipple}
              onPress={() => setReps((r) => Math.min(9, r + 1))}
              accessibilityRole="button"
              accessibilityLabel={t('common.increase')}
            >
              <ThemedText style={styles.repsSign}>＋</ThemedText>
            </Pressable>
          </View>
          {loop && (
            <Pressable
              style={pressableStyle(styles.loopCtl)}
              android_ripple={pressableRipple}
              onPress={() => setLoop(null)}
              accessibilityRole="button"
              accessibilityLabel={t('common.clear')}
            >
              <ThemedText type="small">✕</ThemedText>
            </Pressable>
          )}
        </View>
        </>
        )}

        <ThemedText type="small" style={styles.hint}>
          {t('video.tapToPlay')}
        </ThemedText>

        {/* Record yourself shadowing the looped line, then A/B it against the original */}
        <LineRecorder
          disabled={loop == null || loop.a !== loop.b}
          onPlayOriginal={() => {
            const seg = lines[cursorRef.current] ?? (loop ? lines[loop.a] : null);
            if (seg) {
              playerRef.current?.seekTo(seg.startMs / 1000, true);
              setCurrentMs(seg.startMs);
              setPlaying(true);
            }
          }}
        />

        {/* Full transcript — tap a line to play from there; active line highlighted */}
        <FlatList
          data={lines}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const active = index === activeIndex;
            const inRange = loop != null && index >= loop.a && index <= loop.b;
            const isA = arming === 'B' && armA === index;
            // Only the line you're focused on shows a clip action — no button-per-row clutter.
            const focused = active || (loop != null && loop.a === loop.b && loop.a === index);
            return (
              <View
                style={[
                  styles.lineRow,
                  inRange && styles.lineRowLoop,
                  active && styles.lineRowActive,
                  isA && styles.lineRowArm,
                ]}
              >
                <Pressable
                  style={pressableStyle(styles.lineText)}
                  android_ripple={pressableRipple}
                  onPress={() => onLinePress(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.text}
                >
                  <ThemedText style={active || inRange ? styles.lineActiveText : undefined}>
                    {active && inRange ? '🔁  ' : isA ? 'Ⓐ  ' : ''}{item.text}
                  </ThemedText>
                </Pressable>
                {focused && (
                  <Pressable
                    style={pressableStyle(styles.clipBtn)}
                    android_ripple={pressableRipple}
                    disabled={makeClip.isPending || feedbackPending}
                    onPress={() => submitClip({
                      videoId: id,
                      segment: item,
                      routeGeneration: routeGenerationRef.current,
                    })}
                    accessibilityRole="button"
                    accessibilityLabel={t('video.clipLine')}
                  >
                    <ThemedText type="small" style={styles.clipBtnText}>
                      {t('video.clipLine')}
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <ThemedText type="small" style={styles.empty}>
              {t('video.noTranscript')}
            </ThemedText>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  playerWrap: { backgroundColor: '#000' },
  playerWrapPortrait: { alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  playBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: { color: '#fff', fontWeight: '700' },
  toggle: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    overflow: 'hidden',
  },
  toggleItem: { minHeight: 44, paddingVertical: 8, paddingHorizontal: 14, justifyContent: 'center' },
  toggleOn: { backgroundColor: '#208AEF' },
  toggleOnText: { color: '#fff', fontWeight: '700' },
  advToggle: {
    alignSelf: 'center',
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  advToggleText: { color: '#6b7280', fontWeight: '700' },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  speedBtn: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    minHeight: 40,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  speedOn: { backgroundColor: '#111827', borderColor: '#111827' },
  speedOnText: { color: '#fff', fontWeight: '700' },
  hint: { textAlign: 'center', color: '#6b7280', paddingBottom: 6 },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 6 },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  lineRowActive: { backgroundColor: 'rgba(32,138,239,0.12)', borderColor: '#208AEF' },
  lineRowLoop: { backgroundColor: 'rgba(32,138,239,0.10)', borderColor: '#208AEF' },
  lineRowArm: { borderColor: '#f59e0b', borderWidth: 1.5 },
  loopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  loopCtl: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    minHeight: 40,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  loopCtlOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  loopCtlOnText: { color: '#fff', fontWeight: '700' },
  repsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    overflow: 'hidden',
  },
  repsBtn: { minHeight: 40, paddingVertical: 6, paddingHorizontal: 10, justifyContent: 'center' },
  repsSign: { fontSize: 16, fontWeight: '700' },
  repsVal: { minWidth: 44, textAlign: 'center' },
  lineText: { flex: 1 },
  lineActiveText: { fontWeight: '700' },
  clipBtn: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#208AEF',
    minHeight: 36,
    paddingVertical: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  clipBtnText: { color: '#208AEF' },
  empty: { textAlign: 'center', marginTop: 32 },
});
