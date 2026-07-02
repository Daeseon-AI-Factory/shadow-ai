import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  VERB_PACK, verbKey,
  PHRASAL_500, phrasal500Key,
  IT_PATTERNS, itPatternKey,
  IT_TERMS, itTermKey,
  AI_CODING, aiCodingKey,
  ENGLISH_PATTERNS, englishPatternKey,
  COLLOCATIONS, collocationKey,
  buildDailySession, localToday, practiceApi, type SrsCard,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { ErrorState } from '@/components/error-state';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const DAILY_TARGET = 30;

// Every pack flattened into one pool — the day's session is drawn across ALL of them, so review
// interleaves frames, phrasals, IT chunks, terms, verbs and collocations (interleaving aids recall).
function allItems(): DrillItem[] {
  const out: DrillItem[] = [];
  for (const g of VERB_PACK)
    g.items.forEach((it, i) =>
      out.push({
        key: verbKey(g.id, i),
        title: g.verb,
        cue: it.cue,
        model: it.model,
        note: [it.example ? `“${it.example}”${it.exampleKo ? `\n${it.exampleKo}` : ''}` : undefined, it.easyEn]
          .filter(Boolean)
          .join('\n') || undefined,
        target: it.model,
      }),
    );
  PHRASAL_500.forEach((p, i) =>
    out.push({
      key: phrasal500Key(i), title: p.phrasal, cue: p.ko, model: p.example || p.phrasal,
      note: [p.note, p.exampleKo].filter(Boolean).join('  ·  ') || undefined, target: p.phrasal,
    }),
  );
  IT_PATTERNS.forEach((p, i) => out.push({ key: itPatternKey(i), title: p.category, cue: p.ko, model: p.en, target: p.en }));
  IT_TERMS.forEach((p, i) => out.push({ key: itTermKey(i), title: p.section, cue: p.ko, model: p.en, target: p.en }));
  AI_CODING.forEach((p, i) => out.push({ key: aiCodingKey(i), title: p.category, cue: p.ko, model: p.en, target: p.en }));
  ENGLISH_PATTERNS.forEach((p, i) => out.push({ key: englishPatternKey(i), title: p.category, cue: p.frame, model: p.example }));
  for (const c of COLLOCATIONS)
    c.items.forEach((it, i) =>
      out.push({ key: collocationKey(c.id, i), title: c.anchor, subtitle: c.gloss, cue: it.cue, model: it.model, target: c.anchor }),
    );
  return out;
}

export default function TodayScreen() {
  const token = useAuthStore((s) => s.token);
  const [started, setStarted] = useState(false);

  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    return buildDailySession(allItems(), srs.data as SrsCard[], localToday(), DAILY_TARGET);
  }, [srs.data]);

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

  if (started) {
    return <DrillRunner key={session.map((e) => e.key).join(',')} items={session} />;
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <ThemedText type="title">{t('today.title')}</ThemedText>
          <ThemedText type="small">{t('today.subtitle')}</ThemedText>
          <ThemedText type="small">{t('verbs.due', { n: session.length })}</ThemedText>

          <Pressable
            style={[styles.primaryBtn, session.length === 0 && styles.disabled]}
            disabled={session.length === 0}
            onPress={() => setStarted(true)}
            accessibilityRole="button"
            accessibilityLabel={session.length === 0 ? t('verbs.allCaughtUp') : t('verbs.beginDrill')}
          >
            <ThemedText style={styles.primaryText}>
              {session.length === 0 ? t('verbs.allCaughtUp') : t('verbs.beginDrill')}
            </ThemedText>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={() => router.push('/story')} accessibilityRole="button">
            <ThemedText style={styles.secondaryText}>{t('today.finishStory')}</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flex: 1, padding: 24, gap: 14 },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  disabled: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryBtn: { borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#208AEF' },
  secondaryText: { color: '#208AEF', fontWeight: '700' },
});
