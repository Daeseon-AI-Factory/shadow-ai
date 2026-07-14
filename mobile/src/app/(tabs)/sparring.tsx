import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import {
  VERB_PACK,
  verbKey,
  PARTICLE_INFO,
  PHRASAL_500,
  phrasal500Key,
  COLLOCATIONS,
  collocationKey,
  IT_TERMS,
  itTermKey,
  AI_CODING,
  aiCodingKey,
  chunkMatcher,
  localToday,
  partitionLearning,
  shuffle,
  practiceApi,
  ApiError,
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
const CONNECT_TIMEOUT_MS = 12_000;

type Mode = 'chat' | 'interview';
type Phase = 'idle' | 'connecting' | 'live' | 'done';
type Candidate = { key: string; label: string; ko: string };
type VerbCandidate = Candidate & { verbId: string; particle: string | null };
type Line = { who: 'me' | 'ai'; text: string };
type ScopeAxis = 'verb' | 'particle';

const ALL_SCOPE = '__all__';
const INVITE_ONLY_CODES = new Set(['AI_NOT_ALLOWED', 'SPARRING_NOT_ALLOWED']);

function logSparringError(context: string, error: unknown) {
  const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  console.warn(`[sparring] ${context}: ${detail}`);
}

function isInviteOnlyError(error: unknown): error is ApiError {
  return error instanceof ApiError && error.status === 403 && INVITE_ONLY_CODES.has(error.code);
}

// Candidate pools per TOPIC. Scoping a session to one topic keeps the 6 targets in one domain,
// so the AI weaves them into a single coherent thread instead of hopping (dev terms + phrasals
// + collocations in one chat feels forced). Long entries are dropped later by chunkMatcher, so a
// topic auto-keeps only its sayable expressions.
const VERB_CANDIDATES: VerbCandidate[] = VERB_PACK.flatMap((g) =>
  g.items.map((it, i) => {
    const key = verbKey(g.id, i);
    return {
      key,
      label: it.model,
      ko: it.cue,
      verbId: g.id,
      particle: PARTICLE_INFO[key]?.particle || null,
    };
  }),
);
const verbsPool = (verbId?: string): Candidate[] =>
  verbId ? VERB_CANDIDATES.filter((candidate) => candidate.verbId === verbId) : VERB_CANDIDATES;
const particlePool = (particle: string): Candidate[] =>
  VERB_CANDIDATES.filter((candidate) => candidate.particle === particle);
const phrasalPool = (): Candidate[] =>
  PHRASAL_500.map((p, i) => ({ key: phrasal500Key(i), label: p.phrasal, ko: p.ko }));
const collocationsPool = (): Candidate[] =>
  COLLOCATIONS.flatMap((c) => c.items.map((it, i) => ({ key: collocationKey(c.id, i), label: c.anchor, ko: c.gloss })));
const aiCodingPool = (): Candidate[] => AI_CODING.map((p, i) => ({ key: aiCodingKey(i), label: p.en, ko: p.ko }));
const itPool = (): Candidate[] => IT_TERMS.map((p, i) => ({ key: itTermKey(i), label: p.en, ko: p.ko }));

const VERB_SCOPE_GROUPS = VERB_PACK.map((group) => ({
  id: group.id,
  label: group.verb === 'APPENDIX' ? 'PHRASE' : group.verb,
  n: group.items.filter((item) => chunkMatcher(item.model)).length,
})).filter((group) => group.n > 0);
const PARTICLE_SCOPE_GROUPS = (() => {
  const counts = new Map<string, number>();
  for (const candidate of VERB_CANDIDATES) {
    if (!candidate.particle || !chunkMatcher(candidate.label)) continue;
    counts.set(candidate.particle, (counts.get(candidate.particle) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([id, n]) => ({ id, label: id, n }))
    .sort((a, b) => b.n - a.n);
})();

type TopicKey = 'due' | 'learning' | 'verbs' | 'phrasal' | 'collocations' | 'aicoding' | 'it';
const TOPICS: { key: TopicKey; pool: () => Candidate[] }[] = [
  { key: 'due', pool: () => [...verbsPool(), ...phrasalPool(), ...collocationsPool()] },
  { key: 'learning', pool: () => [...verbsPool(), ...phrasalPool(), ...collocationsPool()] },
  { key: 'verbs', pool: verbsPool },
  { key: 'phrasal', pool: phrasalPool },
  { key: 'collocations', pool: collocationsPool },
  { key: 'it', pool: itPool },
  { key: 'aicoding', pool: aiCodingPool },
];
const poolFor = (topic: TopicKey, scopeAxis: ScopeAxis, scopePick: string): Candidate[] => {
  const selected = TOPICS.find((candidate) => candidate.key === topic) ?? TOPICS[0];
  if (topic !== 'verbs' || scopePick === ALL_SCOPE) return selected.pool();
  return scopeAxis === 'verb' ? verbsPool(scopePick) : particlePool(scopePick);
};

export default function SparringScreen() {
  const token = useAuthStore((s) => s.token);
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [inviteOnly, setInviteOnly] = useState(false);
  const [session, setSession] = useState<{ clientSecret: string; model: string } | null>(null);
  const [sessionAttempt, setSessionAttempt] = useState<number | null>(null);
  const [hits, setHits] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<Line[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [topic, setTopic] = useState<TopicKey>('due');
  const [scopeAxis, setScopeAxis] = useState<ScopeAxis>('verb');
  const [scopePick, setScopePick] = useState(ALL_SCOPE);
  const webRef = useRef<WebView>(null);
  const scrollRef = useRef<ScrollView>(null);
  const connectAttemptRef = useRef(0);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearConnectTimer = () => {
    if (connectTimerRef.current !== null) clearTimeout(connectTimerRef.current);
    connectTimerRef.current = null;
  };

  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  // Due cards first (this session doubles as their review), then already-learned ones.
  // A brand-new account with no history still gets random seeds so the feature isn't dead.
  const targets = useMemo(() => {
    if (!srs.data) return [] as (Candidate & { re: RegExp })[];
    const today = localToday();
    const states = srs.data as SrsCard[];
    const due: Candidate[] = [];
    const known: Candidate[] = [];
    const all = poolFor(topic, scopeAxis, scopePick).filter((c) => chunkMatcher(c.label));
    if (topic === 'learning') {
      const { learning, fresh } = partitionLearning(all, states, today);
      return [...learning, ...shuffle(fresh)]
        .slice(0, TARGET_COUNT)
        .map((c) => ({ ...c, re: chunkMatcher(c.label)! }));
    }
    const byKey = new Map(states.map((s) => [s.cardKey, s]));
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
  }, [srs.data, topic, scopeAxis, scopePick]);

  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'connecting') return;
    const attempt = connectAttemptRef.current;
    const id = setTimeout(() => {
      if (connectAttemptRef.current !== attempt) return;
      connectTimerRef.current = null;
      logSparringError('connection timed out', `${CONNECT_TIMEOUT_MS}ms`);
      connectAttemptRef.current += 1;
      webRef.current?.injectJavaScript('window.stopSparring && window.stopSparring(); true;');
      setSession(null);
      setSessionAttempt(null);
      setError(t('sparring.errorTimeout'));
      setPhase('idle');
    }, CONNECT_TIMEOUT_MS);
    connectTimerRef.current = id;
    return () => {
      clearTimeout(id);
      if (connectTimerRef.current === id) connectTimerRef.current = null;
    };
  }, [phase]);

  useEffect(() => {
    if (srs.error) logSparringError('failed to load SRS targets', srs.error);
  }, [srs.error]);

  const start = async (mode: Mode) => {
    const attempt = ++connectAttemptRef.current;
    clearConnectTimer();
    setError(null);
    setInviteOnly(false);
    setSession(null);
    setSessionAttempt(null);
    setPhase('connecting');
    try {
      const minted = await practiceApi.sparringSession(
        mode,
        targets.map(({ label, ko }) => ({ label, ko })),
      );
      if (connectAttemptRef.current !== attempt) return;
      setSession(minted); // mounts the hidden WebView; onLoadEnd injects the secret
      setSessionAttempt(attempt);
    } catch (e) {
      if (connectAttemptRef.current !== attempt) return;
      clearConnectTimer();
      logSparringError('failed to mint session', e);
      if (isInviteOnlyError(e)) setInviteOnly(true);
      else setError(t('sparring.errorStart'));
      setSession(null);
      setSessionAttempt(null);
      setPhase('idle');
    }
  };

  const cancelConnecting = () => {
    connectAttemptRef.current += 1;
    clearConnectTimer();
    webRef.current?.injectJavaScript('window.stopSparring && window.stopSparring(); true;');
    setSession(null);
    setSessionAttempt(null);
    setError(null);
    setPhase('idle');
  };

  const stop = () => {
    connectAttemptRef.current += 1;
    clearConnectTimer();
    webRef.current?.injectJavaScript('window.stopSparring && window.stopSparring(); true;');
    setSession(null);
    setSessionAttempt(null);
    setPhase('done');
  };

  const reset = () => {
    connectAttemptRef.current += 1;
    clearConnectTimer();
    setHits(new Set());
    setLines([]);
    setElapsed(0);
    setPhase('idle');
    srs.refetch(); // graded cards moved boxes — refresh so the next round picks new dues
  };

  const chooseTopic = (next: TopicKey) => {
    setTopic(next);
    setScopePick(ALL_SCOPE);
  };

  const chooseScopeAxis = (next: ScopeAxis) => {
    setScopeAxis(next);
    setScopePick(ALL_SCOPE);
  };

  const onMessage = (e: WebViewMessageEvent, sourceAttempt: number) => {
    let msg: { type: string; text?: string; value?: string; message?: string };
    try {
      msg = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }
    if (sourceAttempt !== connectAttemptRef.current) return;
    if (msg.type === 'connected' && phase === 'connecting') {
      clearConnectTimer();
      setPhase('live');
    }
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
      logSparringError('WebView bridge error', msg.message ?? 'unknown');
      setError(t('sparring.errorConnection'));
      if (phase === 'connecting') {
        connectAttemptRef.current += 1;
        clearConnectTimer();
        setSession(null);
        setSessionAttempt(null);
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
        <ErrorState message={t('sparring.errorLoad')} onRetry={() => srs.refetch()} />
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
        {session && sessionAttempt !== null && (
          <WebView
            key={sessionAttempt}
            ref={webRef}
            source={{ uri: `${getApiBaseUrl()}/sparring.html` }}
            style={styles.hiddenWeb}
            onMessage={(event) => onMessage(event, sessionAttempt)}
            onError={(event) => {
              if (sessionAttempt !== connectAttemptRef.current) return;
              logSparringError('WebView load error', event.nativeEvent.description);
              setError(t('sparring.errorConnection'));
              if (phase === 'connecting') {
                connectAttemptRef.current += 1;
                clearConnectTimer();
                setSession(null);
                setSessionAttempt(null);
                setPhase('idle');
              }
            }}
            onLoadEnd={() => {
              if (sessionAttempt !== connectAttemptRef.current) return;
              webRef.current?.injectJavaScript(
                `window.startSparring(${JSON.stringify(session)}); true;`,
              );
            }}
            javaScriptEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            mediaCapturePermissionGrantType="grant"
            originWhitelist={['*']}
          />
        )}

        {phase === 'idle' && inviteOnly && (
          <View style={styles.inviteScreen}>
            <View style={styles.inviteCard}>
              <ThemedText style={styles.inviteIcon}>🔒</ThemedText>
              <ThemedText type="title" style={styles.inviteTitle}>
                {t('aiInvite.title')}
              </ThemedText>
              <ThemedText type="small" style={styles.inviteBody}>
                {t('aiInvite.body')}
              </ThemedText>
              <Pressable
                style={styles.inviteButton}
                onPress={() => router.replace('/practice')}
                accessibilityRole="button"
              >
                <ThemedText style={styles.inviteButtonText}>{t('aiInvite.freePractice')}</ThemedText>
              </Pressable>
            </View>
          </View>
        )}

        {phase === 'idle' && !inviteOnly && (
          <ScrollView contentContainerStyle={styles.container}>
            <ThemedText type="title">{t('sparring.title')}</ThemedText>
            <ThemedText type="small">{t('sparring.subtitle')}</ThemedText>
            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

            <ThemedText type="subtitle">{t('sparring.topicTitle')}</ThemedText>
            <View style={styles.chips}>
              {TOPICS.map((tp) => (
                <Pressable
                  key={tp.key}
                  onPress={() => chooseTopic(tp.key)}
                  style={[styles.topicChip, topic === tp.key && styles.topicChipOn]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: topic === tp.key }}
                >
                  <ThemedText type="smallBold" style={topic === tp.key ? styles.topicChipOnText : undefined}>
                    {t(`sparring.topic_${tp.key}`)}
                  </ThemedText>
                </Pressable>
              ))}
            </View>

            {topic === 'verbs' && (
              <View style={styles.scopeWrap}>
                <ThemedText type="smallBold">{t('sparring.scopeTitle')}</ThemedText>
                <View style={styles.scopeAxisRow}>
                  {(['verb', 'particle'] as ScopeAxis[]).map((axis) => (
                    <Pressable
                      key={axis}
                      style={[styles.scopeAxisBtn, scopeAxis === axis && styles.scopeSelected]}
                      onPress={() => chooseScopeAxis(axis)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: scopeAxis === axis }}
                    >
                      <ThemedText style={scopeAxis === axis ? styles.scopeSelectedText : styles.scopeText}>
                        {t(`sparring.scope_${axis}`)}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scopeChips}
                >
                  <Pressable
                    style={[styles.scopeChip, scopePick === ALL_SCOPE && styles.scopeSelected]}
                    onPress={() => setScopePick(ALL_SCOPE)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: scopePick === ALL_SCOPE }}
                  >
                    <ThemedText style={scopePick === ALL_SCOPE ? styles.scopeSelectedText : styles.scopeText}>
                      {t('sparring.scopeAll')}
                    </ThemedText>
                  </Pressable>
                  {(scopeAxis === 'verb' ? VERB_SCOPE_GROUPS : PARTICLE_SCOPE_GROUPS).map((group) => (
                    <Pressable
                      key={group.id}
                      style={[styles.scopeChip, scopePick === group.id && styles.scopeSelected]}
                      onPress={() => setScopePick(group.id)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: scopePick === group.id }}
                    >
                      <ThemedText style={scopePick === group.id ? styles.scopeSelectedText : styles.scopeText}>
                        {group.label} · {group.n}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

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
            <Pressable style={styles.cancelBtn} onPress={cancelConnecting} accessibilityRole="button">
              <ThemedText style={styles.cancelText}>{t('sparring.cancel')}</ThemedText>
            </Pressable>
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
  topicChip: {
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  topicChipOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  topicChipOnText: { color: '#fff' },
  inviteScreen: { flex: 1, justifyContent: 'center', padding: 24 },
  inviteCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f59e0b88',
    backgroundColor: '#f59e0b12',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  inviteIcon: { fontSize: 34 },
  inviteTitle: { textAlign: 'center' },
  inviteBody: { textAlign: 'center', lineHeight: 20 },
  inviteButton: {
    alignSelf: 'stretch',
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  inviteButtonText: { color: '#fff', fontWeight: '700' },
  scopeWrap: { gap: 8 },
  scopeAxisRow: { flexDirection: 'row', gap: 8 },
  scopeAxisBtn: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scopeChips: { gap: 8, paddingBottom: 2 },
  scopeChip: {
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    justifyContent: 'center',
  },
  scopeSelected: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  scopeText: { fontWeight: '600' },
  scopeSelectedText: { color: '#fff', fontWeight: '700' },
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
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 22,
    justifyContent: 'center',
    marginTop: 8,
  },
  cancelText: { fontWeight: '700' },
  transcript: { flex: 1 },
  meLine: { color: '#208AEF' },
  error: { color: '#dc2626' },
});
