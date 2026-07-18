import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  PREPOSITION_PRIMER,
  prepositionsApi,
  type PrimerSense,
  type MinedPreposition,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

function Sense({ sense }: { sense: PrimerSense }) {
  return (
    <View style={styles.sense}>
      <View style={styles.senseHead}>
        <ThemedText type="small" style={styles.senseLabel}>
          {sense.label}
        </ThemedText>
        {sense.diagram ? (
          <View style={styles.archetype}>
            <ThemedText style={styles.archetypeText}>{sense.diagram}</ThemedText>
          </View>
        ) : null}
      </View>
      <ThemedText style={styles.example}>{sense.example}</ThemedText>
    </View>
  );
}

export default function PrepositionsScreen() {
  const token = useAuthStore((s) => s.token);

  // Prepositions the user has actually mined across their clips (may be empty).
  const mined = useQuery({
    queryKey: ['prepositions', 'mined'],
    queryFn: () => prepositionsApi.mined(),
    enabled: !!token,
  });

  if (!token) return <Redirect href="/login" />;

  const minedList = (mined.data ?? []) as MinedPreposition[];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">{t('prepositions.title')}</ThemedText>
          <ThemedText type="small">{t('prepositions.intro')}</ThemedText>

          {PREPOSITION_PRIMER.map((p) => (
            <View key={p.key} style={styles.card}>
              <ThemedText style={styles.prep}>{p.prep}</ThemedText>
              {p.senses.map((s, i) => (
                <Sense key={i} sense={s} />
              ))}
            </View>
          ))}

          {/* Mined: prepositions the AI flagged in clips the user analyzed. */}
          <ThemedText type="subtitle" style={styles.minedHeader}>
            {t('prepositions.fromYourClips')}
          </ThemedText>
          {mined.isPending ? (
            <ActivityIndicator />
          ) : minedList.length === 0 ? (
            <ThemedText type="small">{t('prepositions.empty')}</ThemedText>
          ) : (
            minedList.map((m) => (
              <View key={m.preposition} style={styles.card}>
                <ThemedText style={styles.prep}>{m.preposition}</ThemedText>
                {m.occurrences.map((o, i) => (
                  <View key={i} style={styles.sense}>
                    <ThemedText style={styles.example}>{o.phrase}</ThemedText>
                    <ThemedText type="small">
                      {t('prepositions.occurrenceMeta', { sense: o.sense, clip: o.clipName })}
                    </ThemedText>
                  </View>
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 14 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 12,
  },
  prep: { fontSize: 22, fontWeight: '700', color: '#208AEF' },
  sense: { gap: 2 },
  senseHead: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  senseLabel: { fontWeight: '600' },
  archetype: { backgroundColor: '#208AEF22', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 1 },
  archetypeText: { fontSize: 10, color: '#1d4ed8', fontWeight: '700', textTransform: 'uppercase' },
  example: { fontFamily: Fonts.mono, fontSize: 15 },
  minedHeader: { marginTop: 12 },
});
