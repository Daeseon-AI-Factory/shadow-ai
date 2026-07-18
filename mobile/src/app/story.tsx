import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { ENGLISH_PATTERNS, PHRASAL_500, IT_PATTERNS, IT_TERMS, practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const some = <T,>(arr: T[], n: number): T[] => Array.from({ length: n }, () => pick(arr));

// A spread across layers (frames, phrasals, terms) — enough material for a coherent mini-scene.
function drawChunks(): string[] {
  return [
    ...some(ENGLISH_PATTERNS, 2).map((p) => p.frame),
    ...some(PHRASAL_500, 3).map((p) => p.phrasal),
    ...some(IT_PATTERNS, 1).map((p) => p.en),
    ...some(IT_TERMS, 2).map((p) => p.en),
  ];
}

// Blank out the literal chunks that actually appear in the story (skip placeholder frames like "V"/"X").
function clozeOf(story: string, chunks: string[]): string {
  let s = story;
  for (const c of chunks) {
    if (/\b[VXYZ]\b/.test(c)) continue;
    const re = new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    s = s.replace(re, '____');
  }
  return s;
}

export default function StoryScreen() {
  const token = useAuthStore((s) => s.token);
  const [chunks, setChunks] = useState<string[]>([]);
  const [cloze, setCloze] = useState(false);
  const story = useMutation({ mutationFn: (cs: string[]) => practiceApi.composeStory(cs) });

  const reshuffle = () => {
    story.reset();
    setCloze(false);
    setChunks(drawChunks());
  };
  useEffect(reshuffle, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!token) return <Redirect href="/login" />;
  const fb = story.data;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">{t('story.title')}</ThemedText>
          <ThemedText type="small">{t('story.subtitle')}</ThemedText>

          <View style={styles.blocks}>
            {chunks.map((c, i) => (
              <View key={i} style={styles.chip}>
                <ThemedText style={styles.chipText}>{c}</ThemedText>
              </View>
            ))}
          </View>

          {!fb ? (
            <Pressable
              style={[styles.primaryBtn, story.isPending && styles.disabled]}
              disabled={story.isPending}
              onPress={() => story.mutate(chunks)}
              accessibilityRole="button"
            >
              {story.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryText}>{t('story.weave')}</ThemedText>
              )}
            </Pressable>
          ) : (
            <View style={styles.resultBox}>
              <ThemedText style={styles.story}>{cloze ? clozeOf(fb.story, chunks) : fb.story}</ThemedText>
              {!cloze && fb.gloss ? (
                <ThemedText type="small" style={styles.gloss}>{fb.gloss}</ThemedText>
              ) : null}
              {fb.note ? <ThemedText type="small" style={styles.note}>⚠️ {fb.note}</ThemedText> : null}
              <Pressable style={styles.clozeBtn} onPress={() => setCloze((v) => !v)} accessibilityRole="button">
                <ThemedText style={styles.clozeText}>{cloze ? t('story.showFull') : t('story.cloze')}</ThemedText>
              </Pressable>
            </View>
          )}

          {story.isError ? <ThemedText style={styles.error}>{t('story.failed')}</ThemedText> : null}

          <Pressable style={styles.secondaryBtn} onPress={reshuffle} accessibilityRole="button">
            <ThemedText style={styles.secondaryText}>{t('story.reshuffle')}</ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: 24, gap: 16 },
  blocks: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipText: { fontSize: 13, fontFamily: Fonts.mono },
  resultBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    gap: 10,
  },
  story: { fontSize: 17, lineHeight: 26 },
  gloss: { lineHeight: 22 },
  note: { color: '#b45309' },
  error: { color: '#dc2626', textAlign: 'center' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  disabled: { opacity: 0.6 },
  clozeBtn: { alignSelf: 'flex-start', paddingVertical: 6 },
  clozeText: { color: '#208AEF', fontWeight: '700' },
  secondaryBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  secondaryText: { color: '#208AEF', fontWeight: '700' },
});
