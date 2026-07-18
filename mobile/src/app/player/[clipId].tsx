import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { analysisApi, clipsApi, videosApi, type ClipAnalysis } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ChunkLadder } from '@/components/chunk-ladder';
import { DictationDrill } from '@/components/dictation-drill';
import { RecordPanel } from '@/components/record-panel';
import { ScenarioQuiz } from '@/components/scenario-quiz';
import { ErrorState } from '@/components/error-state';
import { Skeleton, SkeletonCards } from '@/components/skeleton';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { setLastClip } from '@/lib/last-clip';
import { t } from '@/lib/i18n';

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// The learning modes, in pedagogical order: hear it → see the order → produce it → say it → reference.
type DrillTab = 'decode' | 'reorder' | 'produce' | 'shadow' | 'analysis';

export default function ClipPlayerScreen() {
  const token = useAuthStore((s) => s.token);
  const { clipId } = useLocalSearchParams<{ clipId: string }>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [tab, setTab] = useState<DrillTab>('decode');
  // A chosen sentence sub-segment to loop, or null for the whole clip.
  const [activeSeg, setActiveSeg] = useState<{ startMs: number; endMs: number } | null>(null);
  // Collapse the pinned video while the keyboard is up — a fixed video left the typing drills
  // cramped between the video and the keyboard. The WebView stays mounted (height → 0), so audio
  // keeps playing for listen-while-you-type and the video doesn't reload on every focus.
  const [kbOpen, setKbOpen] = useState(false);

  const clip = useQuery({
    queryKey: ['clip', clipId],
    queryFn: () => clipsApi.get(clipId),
    enabled: !!token && !!clipId,
  });

  // The clip's AI analysis (translation / 직독직해 / vocabulary). Poll while PENDING.
  const analysis = useQuery({
    queryKey: ['analysis', clipId],
    queryFn: () => analysisApi.get(clipId),
    enabled: !!token && !!clipId,
    refetchInterval: (q) => (q.state.data?.status === 'PENDING' ? 3000 : false),
  });

  // Parent video's sentence-level timing — lets us split the clip into smaller A–B loops.
  const videoQuery = useQuery({
    queryKey: ['video', clip.data?.videoId],
    queryFn: () => videosApi.get(clip.data!.videoId),
    enabled: !!token && !!clip.data?.videoId,
  });

  // Active loop window: the chosen sentence sub-segment, or the whole clip when null.
  const clipStartMs = clip.data?.startMs ?? 0;
  const clipEndMs = clip.data?.endMs ?? 0;
  const loopStartMs = activeSeg?.startMs ?? clipStartMs;
  const loopEndMs = activeSeg?.endMs ?? clipEndMs;
  const loopStartSec = loopStartMs / 1000;

  // Enforce the segment boundary + loop by polling position. The YouTube IFrame's `end` param
  // fires PAUSED (not ENDED) at a mid-video boundary, so relying on onChangeState('ended') never
  // re-loops a short clip. Polling getCurrentTime is what the web player does.
  useEffect(() => {
    if (!playing || !loopEndMs) return;
    const id = setInterval(async () => {
      const t = await playerRef.current?.getCurrentTime?.();
      if (typeof t === 'number' && t * 1000 >= loopEndMs) {
        if (loop) {
          playerRef.current?.seekTo(loopStartSec, true);
        } else {
          setPlaying(false);
        }
      }
    }, 250);
    return () => clearInterval(id);
  }, [playing, loop, loopEndMs, loopStartSec]);

  const onState = useCallback(
    (state: string) => {
      // Natural end of the source video — re-seek if looping.
      if (state === 'ended') {
        if (loop) {
          playerRef.current?.seekTo(loopStartSec, true);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      }
    },
    [loop, loopStartSec],
  );

  // Remember this as the last-opened clip so Today's "Continue" resumes here.
  useEffect(() => {
    if (clip.data) setLastClip({ id: clip.data.id, name: clip.data.name || clip.data.videoTitle || '' });
  }, [clip.data?.id, clip.data?.name, clip.data?.videoTitle]);

  // Drive the video collapse/expand off the keyboard, animated so it doesn't snap.
  useEffect(() => {
    const show = Keyboard.addListener('keyboardWillShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKbOpen(true);
    });
    const hide = Keyboard.addListener('keyboardWillHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKbOpen(false);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const replay = () => {
    playerRef.current?.seekTo(loopStartSec, true);
    setPlaying(true);
  };

  // Loop just one sentence (or the whole clip when null), seeking there immediately.
  const selectSeg = (seg: { startMs: number; endMs: number } | null) => {
    setActiveSeg(seg);
    playerRef.current?.seekTo((seg?.startMs ?? clipStartMs) / 1000, true);
    setPlaying(true);
  };

  if (!token) return <Redirect href="/login" />;
  if (clip.isPending) {
    return (
      <ThemedView style={styles.flex}>
        <Skeleton style={styles.loadingVideo} />
        <View style={styles.loadingBody}>
          <SkeletonCards count={3} height={72} />
        </View>
      </ThemedView>
    );
  }
  if (clip.isError || !clip.data) {
    return (
      <ThemedView style={styles.flex}>
        <ErrorState
          message={clip.error ? (clip.error as Error).message : t('player.clipNotFound')}
          onRetry={() => clip.refetch()}
        />
      </ThemedView>
    );
  }

  const c = clip.data;
  const screenW = Dimensions.get('window').width;
  const screenH = Dimensions.get('window').height;
  const portrait = c.videoOrientation === 'PORTRAIT';
  // Pinned at the top now, so cap portrait (Shorts) harder (~42% height) to leave room for the
  // drill below; landscape stays 16:9.
  const playerWidth = portrait
    ? Math.min(screenW, Math.round(screenH * 0.42 * (9 / 16)))
    : screenW;
  const height = portrait ? Math.round(playerWidth * (16 / 9)) : Math.round(screenW * (9 / 16));

  const chunks = analysis.data?.chunkedTranslation ?? [];
  const scenario = analysis.data?.practiceScenario;
  const analysisPending = analysis.isPending || analysis.data?.status === 'PENDING';

  // Sentences of the parent video that fall inside this clip → tappable sub-loops (clamped to the clip).
  const subs = (videoQuery.data?.sentences ?? [])
    .filter((s) => s.endMs > c.startMs && s.startMs < c.endMs)
    .map((s) => ({ startMs: Math.max(s.startMs, c.startMs), endMs: Math.min(s.endMs, c.endMs) }));

  const TABS: { key: DrillTab; label: string }[] = [
    { key: 'decode', label: t('player.tabDecode') },
    { key: 'reorder', label: t('player.tabReorder') },
    { key: 'produce', label: t('player.tabProduce') },
    { key: 'shadow', label: t('player.tabShadow') },
    { key: 'analysis', label: t('player.tabAnalysis') },
  ];

  const renderTab = () => {
    switch (tab) {
      case 'decode':
        return c.transcript ? (
          <DictationDrill embedded transcript={c.transcript} onReplayAudio={replay} />
        ) : (
          <TabMessage text={t('player.tabEmpty')} />
        );
      case 'reorder':
        if (chunks.length >= 2) {
          return <ChunkLadder embedded chunks={chunks} clipId={c.id} onReplayAudio={replay} />;
        }
        return <TabMessage text={analysisPending ? t('player.tabPending') : t('player.tabEmpty')} />;
      case 'produce':
        if (scenario) return <ScenarioQuiz scenario={scenario} />;
        return <TabMessage text={analysisPending ? t('player.tabPending') : t('player.tabEmpty')} />;
      case 'shadow':
        return <RecordPanel clipId={c.id} targetTranscript={c.transcript} />;
      case 'analysis':
        return <AnalysisSection data={analysis.data} pending={analysis.isPending} />;
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {/* Pinned header — the video never scrolls away while you drill below. */}
        <View
          style={[
            styles.playerWrap,
            portrait && styles.playerWrapPortrait,
            kbOpen && styles.playerWrapCollapsed,
          ]}
        >
          <YoutubePlayer
            ref={playerRef}
            height={height}
            width={playerWidth}
            play={playing}
            videoId={c.youtubeId}
            initialPlayerParams={{ start: Math.floor(clipStartMs / 1000), rel: false, modestbranding: true }}
            onChangeState={onState}
          />
        </View>

        <View style={styles.header}>
          <View style={styles.controls}>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => setPlaying((p) => !p)}
              accessibilityRole="button"
              accessibilityLabel={playing ? t('player.pause') : t('player.play')}
            >
              <ThemedText style={styles.primaryText}>{playing ? t('player.pause') : t('player.play')}</ThemedText>
            </Pressable>
            <Pressable
              style={styles.secondaryBtn}
              onPress={replay}
              accessibilityRole="button"
              accessibilityLabel={t('player.replaySegment')}
            >
              <ThemedText style={styles.secondaryText}>{t('player.replaySegment')}</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.loopBtn, loop && styles.loopOn]}
              onPress={() => setLoop((l) => !l)}
              accessibilityRole="button"
              accessibilityState={{ selected: loop }}
            >
              <ThemedText style={loop ? styles.primaryText : styles.secondaryText}>
                {loop ? t('player.loopOn') : t('player.loopOff')}
              </ThemedText>
            </Pressable>
          </View>
          <ThemedText type="small" numberOfLines={1}>
            {c.name || c.videoTitle} · {ms(c.startMs)}–{ms(c.endMs)}
          </ThemedText>

          {/* Split the clip into sentence-sized A–B loops; tap one to drill just that line. */}
          {subs.length > 1 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.segRow}
              keyboardShouldPersistTaps="handled"
            >
              <SegChip label={t('player.segAll')} active={activeSeg === null} onPress={() => selectSeg(null)} />
              {subs.map((s, i) => (
                <SegChip
                  key={i}
                  label={String(i + 1)}
                  active={activeSeg?.startMs === s.startMs && activeSeg?.endMs === s.endMs}
                  onPress={() => selectSeg(s)}
                />
              ))}
            </ScrollView>
          ) : null}
        </View>

        {/* Mode tabs — pick one drill at a time instead of an endless stack. */}
        <View style={styles.tabBar}>
          {TABS.map((td) => {
            const active = tab === td.key;
            return (
              <Pressable
                key={td.key}
                style={styles.tab}
                onPress={() => setTab(td.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <ThemedText style={[styles.tabLabel, active && styles.tabLabelActive]}>{td.label}</ThemedText>
                <View style={[styles.tabUnderline, active && styles.tabUnderlineActive]} />
              </Pressable>
            );
          })}
        </View>

        {/* automaticallyAdjustKeyboardInsets: iOS auto-insets + scrolls the focused input
            above the keyboard, so the pinned video no longer hides what you're typing. */}
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="interactive"
        >
          {renderTab()}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** A sentence sub-loop chip in the player header. */
function SegChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.segChip, active && styles.segChipActive]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <ThemedText style={[styles.segChipText, active && styles.segChipTextActive]} numberOfLines={1}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

/** Empty / pending placeholder shown inside a tab when that drill's data isn't available. */
function TabMessage({ text }: { text: string }) {
  return (
    <View style={styles.tabMsg}>
      <ThemedText type="small" style={styles.tabMsgText}>{text}</ThemedText>
    </View>
  );
}

/** Sentence-mining payload: Korean translation, 직독직해 chunks, vocabulary, expressions. */
function AnalysisSection({ data, pending }: { data?: ClipAnalysis; pending: boolean }) {
  if (pending) {
    return (
      <View style={styles.box}>
        <SkeletonCards count={2} height={56} />
      </View>
    );
  }
  if (!data || data.status === 'FAILED') return <TabMessage text={t('player.tabEmpty')} />;
  if (data.status === 'PENDING') {
    return (
      <View style={styles.box}>
        <ThemedText type="small">{t('player.analyzing')}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.gap}>
      {data.primaryTranslation ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.translation')}</ThemedText>
          <ThemedText>{data.primaryTranslation}</ThemedText>
        </View>
      ) : null}

      {data.chunkedTranslation.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.literal')}</ThemedText>
          {data.chunkedTranslation.map((ch, i) => (
            <View key={i} style={styles.chunkRow}>
              <ThemedText style={styles.chunkEn}>{ch.en}</ThemedText>
              <ThemedText type="small">{ch.ko}</ThemedText>
            </View>
          ))}
        </View>
      ) : null}

      {data.vocabulary.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.vocabulary')}</ThemedText>
          {data.vocabulary.map((v, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{v.word}</ThemedText> — {v.meaning}
            </ThemedText>
          ))}
        </View>
      ) : null}

      {data.keyExpressions.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.keyExpressions')}</ThemedText>
          {data.keyExpressions.map((k, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{k.phrase}</ThemedText> — {k.meaning}
            </ThemedText>
          ))}
        </View>
      ) : null}

      {data.prepositionNotes.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.prepositions')}</ThemedText>
          {data.prepositionNotes.map((p, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{p.preposition}</ThemedText>{t('player.prepLine', { phrase: p.phrase, sense: p.sense })}
            </ThemedText>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gap: { gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingVideo: { width: '100%', aspectRatio: 16 / 9, borderRadius: 0 },
  loadingBody: { padding: 16, gap: 12, marginTop: 12 },
  playerWrap: { backgroundColor: '#000' },
  playerWrapPortrait: { alignItems: 'center' },
  // Keyboard up: clip the video to nothing (WebView stays mounted) so the drill gets the room.
  playerWrapCollapsed: { height: 0, overflow: 'hidden' },
  header: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  segRow: { gap: 8, paddingVertical: 2, paddingRight: 16 },
  segChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9ca3af',
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segChipActive: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  segChipText: { fontWeight: '600', color: '#6b7280' },
  segChipTextActive: { color: '#fff' },
  controls: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: {
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9ca3af',
    justifyContent: 'center',
  },
  secondaryText: { fontWeight: '600' },
  loopBtn: {
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9ca3af',
    justifyContent: 'center',
  },
  loopOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9ca3af',
  },
  tab: { flex: 1, minHeight: 44, alignItems: 'center', paddingTop: 10, gap: 8 },
  tabLabel: { fontWeight: '600', color: '#9ca3af' },
  tabLabelActive: { color: '#208AEF' },
  tabUnderline: { height: 2, alignSelf: 'stretch', backgroundColor: 'transparent' },
  tabUnderlineActive: { backgroundColor: '#208AEF' },
  content: { padding: 16, gap: 12 },
  tabMsg: { padding: 24, alignItems: 'center' },
  tabMsgText: { color: '#9ca3af', textAlign: 'center' },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 6,
  },
  bold: { fontWeight: '700' },
  chunkRow: { gap: 1, marginBottom: 4 },
  chunkEn: { fontFamily: Fonts.mono },
});
