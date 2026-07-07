import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import {
  VERB_PACK,
  verbKey,
  PHRASAL_500,
  phrasal500Key,
  COLLOCATIONS,
  collocationKey,
  chunkMatcher,
  localToday,
  shuffle,
  practiceApi,
  type SrsCard,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ErrorState } from '@/components/error-state';
import { useAuthStore } from '@/lib/auth-store';
import { getApiBaseUrl } from '@/lib/api';
import { t } from '@/lib/i18n';

// Realtime voice sparring: the learner's due SRS cards ride into a live voice conversation
// (OpenAI Realtime via a hidden WebView bridge — audio flows phone <-> OpenAI directly).
// When the learner actually SAYS a target out loud, the card is graded correct on the spot:
// the conversation IS the review. Chat mode = quick-witted friend; interview mode = patient
// Canadian tech interviewer (the founder's own Canada-job prep, dogfooded).

const TARGET_COUNT = 6;

type Mode = 'chat' | 'interview';
type Phase = 'idle' | 'connecting' | 'live' | 'done';
type Candidate = { key: string; label: string; ko: string };
type Line = { who: 'me' | 'ai'; text: string };

// Short, sayable chunks only — verb pack, phrasal-500 and collocation anchors. Long IT/pattern
// sentences make poor conversational targets, so they stay in the drill decks.
function candidatePool(): Candidate[] {
  const out: Candidate[] = [];
  for (const g of VERB_PACK)
    g.items.forEach((it, i) => out.push({ key: verbKey(g.id, i), label: it.model, ko: it.cue }));
  PHRASAL_500.forEach((p, i) => out.push({ key: phrasal500Key(i), label: p.phrasal, ko: p.ko }));
  for (const c of COLLOCATIONS)
    c.items.forEach((it, i) => out.push({ key: collocationKey(c.id, i), label: c.anchor, ko: c.gloss }));
  return out;
}

export default function SparringScreen() {
  const token = useAuthStore((s) => s.token);
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<{ clientSecret: string; model: string } | null>(null);
  const [hits, setHits] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<Line[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const webRef = useRef<WebView>(null);
  const scrollRef = useRef<ScrollView>(null);

  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  // Due cards first (this session doubles as their review), then already-learned ones.
  // A brand-new account with no history still gets random seeds so the feature isn't dead.
  const targets = useMemo(() => {
    if (!srs.data) return [] as (Candidate & { re: RegExp })[];
    const today = localToday();
    const byKey = new Map((srs.data as SrsCard[]).map((s) => [s.cardKey, s]));
    const due: Candidate[] = [];
    const known: Candidate[] = [];
    const all = candidatePool().filter((c) => chunkMatcher(c.label));
    for (const c of all) {
      const st = byKey.get(c.key);
      if (!st) continue;
      (st.dueDate <= today ? due : known).push(c);
    }
    let picked = [...shuffle(due), ...shuffle(known)].slice(0, TARGET_COUNT);
    if (picked.length < TARGET_COUNT) {
      const have = new Set(picked.map((p) => p.key));
      picked = picked.concat(
        shuffle(all.filter((c) => !have.has(c.key))).slice(0, TARGET_COUNT - picked.length),
      );
    }
    return picked.map((c) => ({ ...c, re: chunkMatcher(c.label)! }));
  }, [srs.data]);

  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const start = async (mode: Mode) => {
    setError(null);
    setPhase('connecting');
    try {
      const minted = await practiceApi.sparringSession(
        mode,
        targets.map(({ label, ko }) => ({ label, ko })),
      );
      setSession(minted); // mounts the hidden WebView; onLoadEnd injects the secret
    } catch (e) {
      setError((e as Error).message);
      setPhase('idle');
    }
  };

  const stop = () => {
    webRef.current?.injectJavaScript('window.stopSparring && window.stopSparring(); true;');
    setSession(null);
    setPhase('done');
  };

  const reset = () => {
    setHits(new Set());
    setLines([]);
    setElapsed(0);
    setPhase('idle');
    srs.refetch(); // graded cards moved boxes — refresh so the next round picks new dues
  };

  const onMessage = (e: WebViewMessageEvent) => {
    let msg: { type: string; text?: string; value?: string; message?: string };
    try {
      msg = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }
    if (msg.type === 'connected') setPhase('live');
    if (msg.type === 'ai' && msg.text) setLines((ls) => [...ls, { who: 'ai', text: msg.text! }]);
    if (msg.type === 'user' && msg.text) {
      const text = msg.text;
      setLines((ls) => [...ls, { who: 'me', text }]);
      setHits((prev) => {
        const next = new Set(prev);
        for (const tg of targets) {
          if (!next.has(tg.key) && tg.re.test(text)) {
            next.add(tg.key);
            // Saying it out loud in conversation is the strongest recall there is.
            practiceApi.grade(tg.key, true, localToday()).catch(() => {});
          }
        }
        return next;
      });
    }
    if (msg.type === 'error') {
      setError(msg.message ?? 'unknown');
      if (phase === 'connecting') {
        setSession(null);
        setPhase('idle');
      }
    }
  };

  if (!token) return <Redirect href="/login" />;
  if (srs.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (srs.isError) {
    return (
      <ThemedView style={styles.flex}>
        <ErrorState message={(srs.error as Error).message} onRetry={() => srs.refetch()} />
      </ThemedView>
    );
  }

  const mmss = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;

  const chips = (
    <View style={styles.chips}>
      {targets.map((tg) => (
        <View key={tg.key} style={[styles.chip, hits.has(tg.key) && styles.chipHit]}>
          <ThemedText type="smallBold" style={hits.has(tg.key) ? styles.chipHitText : undefined}>
            {tg.label}
          </ThemedText>
          <ThemedText type="small" style={hits.has(tg.key) ? styles.chipHitText : undefined}>
            {tg.ko}
          </ThemedText>
        </View>
      ))}
    </View>
  );

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {session && (
          <WebView
            ref={webRef}
            source={{ uri: `${getApiBaseUrl()}/sparring.html` }}
            style={styles.hiddenWeb}
            onMessage={onMessage}
            onLoadEnd={() =>
              webRef.current?.injectJavaScript(
                `window.startSparring(${JSON.stringify(session)}); true;`,
              )
            }
            javaScriptEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            mediaCapturePermissionGrantType="grant"
            originWhitelist={['*']}
          />
        )}

        {phase === 'idle' && (
          <ScrollView contentContainerStyle={styles.container}>
            <ThemedText type="title">{t('sparring.title')}</ThemedText>
            <ThemedText type="small">{t('sparring.subtitle')}</ThemedText>
            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
            <ThemedText type="subtitle">{t('sparring.targetsTitle')}</ThemedText>
            {chips}
            <Pressable style={styles.primaryBtn} onPress={() => start('chat')} accessibilityRole="button">
              <ThemedText style={styles.primaryText}>{t('sparring.modeChat')}</ThemedText>
              <ThemedText style={styles.primarySub}>{t('sparring.modeChatSub')}</ThemedText>
            </Pressable>
            <Pressable style={styles.interviewBtn} onPress={() => start('interview')} accessibilityRole="button">
              <ThemedText style={styles.primaryText}>{t('sparring.modeInterview')}</ThemedText>
              <ThemedText style={styles.primarySub}>{t('sparring.modeInterviewSub')}</ThemedText>
            </Pressable>
          </ScrollView>
        )}

        {phase === 'connecting' && (
          <View style={styles.center}>
            <ActivityIndicator />
            <ThemedText type="small">{t('sparring.connecting')}</ThemedText>
          </View>
        )}

        {phase === 'live' && (
          <View style={styles.liveWrap}>
            <View style={styles.liveHeader}>
              <ThemedText type="subtitle">🎙️ {mmss}</ThemedText>
              <Pressable style={styles.endBtn} onPress={stop} accessibilityRole="button">
                <ThemedText style={styles.endText}>{t('sparring.end')}</ThemedText>
              </Pressable>
            </View>
            {chips}
            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
            <ScrollView
              ref={scrollRef}
              style={styles.transcript}
              onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
              {lines.length === 0 ? (
                <ThemedText type="small">{t('sparring.liveHint')}</ThemedText>
              ) : (
                lines.map((l, i) => (
                  <ThemedText key={i} type="small" style={l.who === 'me' ? styles.meLine : undefined}>
                    {l.who === 'me' ? '🧑 ' : '🤖 '}
                    {l.text}
                  </ThemedText>
                ))
              )}
            </ScrollView>
          </View>
        )}

        {phase === 'done' && (
          <ScrollView contentContainerStyle={styles.container}>
            <ThemedText type="title">{t('sparring.reportTitle')}</ThemedText>
            <ThemedText type="subtitle">
              {t('sparring.usedCount', { used: hits.size, total: targets.length })}
            </ThemedText>
            {chips}
            <Pressable style={styles.primaryBtn} onPress={reset} accessibilityRole="button">
              <ThemedText style={styles.primaryText}>{t('sparring.again')}</ThemedText>
            </Pressable>
            <ThemedText type="subtitle">{t('sparring.transcriptTitle')}</ThemedText>
            {lines.map((l, i) => (
              <ThemedText key={i} type="small" style={l.who === 'me' ? styles.meLine : undefined}>
                {l.who === 'me' ? '🧑 ' : '🤖 '}
                {l.text}
              </ThemedText>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { padding: 24, gap: 14 },
  hiddenWeb: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '48%',
  },
  chipHit: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  chipHitText: { color: '#fff' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 12,
    minHeight: 56,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 8,
  },
  interviewBtn: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    minHeight: 56,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  primarySub: { color: '#ffffffcc', fontSize: 12, marginTop: 2 },
  liveWrap: { flex: 1, padding: 24, gap: 12 },
  liveHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  endBtn: { backgroundColor: '#dc2626', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 18 },
  endText: { color: '#fff', fontWeight: '700' },
  transcript: { flex: 1 },
  meLine: { color: '#208AEF' },
  error: { color: '#dc2626' },
});
