import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { ENGLISH_PATTERNS, PHRASAL_500, IT_TERMS, practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// One coherent mash across three layers: a sentence frame × a phrasal verb × a code term.
// That combo composes into a real sentence far more often than a random trio, so "말이 되게" holds.
function drawChunks(): string[] {
  return [pick(ENGLISH_PATTERNS).frame, pick(PHRASAL_500).phrasal, pick(IT_TERMS).en];
}

export default function MixScreen() {
  const token = useAuthStore((s) => s.token);
  const [chunks, setChunks] = useState<string[]>([]);
  const mix = useMutation({ mutationFn: (cs: string[]) => practiceApi.composeMix(cs) });

  const reshuffle = () => {
    mix.reset();
    setChunks(drawChunks());
  };
  useEffect(reshuffle, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!token) return <Redirect href="/login" />;
  const fb = mix.data;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">{t('mix.title')}</ThemedText>
          <ThemedText type="small">{t('mix.subtitle')}</ThemedText>

          <View style={styles.blocks}>
            {chunks.map((c, i) => (
              <View key={i} style={styles.block}>
                <ThemedText style={styles.blockText}>{c}</ThemedText>
              </View>
            ))}
          </View>

          {!fb ? (
            <Pressable
              style={[styles.primaryBtn, mix.isPending && styles.disabled]}
              disabled={mix.isPending}
              onPress={() => mix.mutate(chunks)}
              accessibilityRole="button"
            >
              {mix.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryText}>{t('mix.combine')}</ThemedText>
              )}
            </Pressable>
          ) : (
            <View style={styles.resultBox}>
              <ThemedText style={styles.sentence}>{fb.sentence}</ThemedText>
              {fb.gloss ? <ThemedText type="small" style={styles.gloss}>{fb.gloss}</ThemedText> : null}
              {!fb.usedAll && fb.note ? (
                <ThemedText type="small" style={styles.note}>⚠️ {fb.note}</ThemedText>
              ) : null}
            </View>
          )}

          {mix.isError ? <ThemedText style={styles.error}>{t('mix.failed')}</ThemedText> : null}

          <Pressable style={styles.secondaryBtn} onPress={reshuffle} accessibilityRole="button">
            <ThemedText style={styles.secondaryText}>{t('mix.reshuffle')}</ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: 24, gap: 16 },
  blocks: { gap: 10, marginTop: 8 },
  block: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  blockText: { fontSize: 18, fontFamily: Fonts.mono, textAlign: 'center' },
  resultBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    gap: 6,
  },
  sentence: { fontSize: 18, fontFamily: Fonts.mono, textAlign: 'center' },
  gloss: { textAlign: 'center' },
  note: { textAlign: 'center', color: '#b45309' },
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
  secondaryBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  secondaryText: { color: '#208AEF', fontWeight: '700' },
});
