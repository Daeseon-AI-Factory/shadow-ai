import { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { practiceApi, cardIndex, type SrsCard } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function WeakSpotsScreen() {
  const token = useAuthStore((s) => s.token);
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const index = useMemo(() => cardIndex(), []);

  const { stats, weak } = useMemo(() => {
    const states = (srs.data ?? []) as SrsCard[];
    const seen = states.length;
    const lapses = states.reduce((sum, s) => sum + s.lapseCount, 0);
    const mastered = states.filter((s) => s.box >= 5).length;
    const weakList = states
      .filter((s) => s.lapseCount > 0)
      .sort((a, b) => b.lapseCount - a.lapseCount || a.box - b.box)
      .map((s) => ({ state: s, info: index.get(s.cardKey) }))
      .filter((x): x is { state: SrsCard; info: NonNullable<typeof x.info> } => Boolean(x.info));
    return { stats: { seen, lapses, mastered }, weak: weakList };
  }, [srs.data, index]);

  if (!token) return <Redirect href="/login" />;
  if (srs.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <ThemedText type="title">{t('weak.title')}</ThemedText>
          <View style={styles.statsRow}>
            <Stat n={stats.seen} label={t('weak.seen')} />
            <Stat n={stats.lapses} label={t('weak.lapses')} />
            <Stat n={stats.mastered} label={t('weak.mastered')} />
          </View>
        </View>

        <FlatList
          data={weak}
          keyExtractor={(x) => x.state.cardKey}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <ThemedText type="small" style={styles.empty}>
              {t('weak.empty')}
            </ThemedText>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <ThemedText type="smallBold">{item.info.title}</ThemedText>
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {t('weak.badge', { lapses: item.state.lapseCount, box: item.state.box })}
                  </ThemedText>
                </View>
              </View>
              <ThemedText type="small">{item.info.cue}</ThemedText>
              <ThemedText style={styles.model} themeColor="primary">{item.info.model}</ThemedText>
            </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <View style={styles.stat}>
      <ThemedText type="subtitle">{n}</ThemedText>
      <ThemedText type="small">{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { padding: 24, paddingBottom: 8, gap: 12 },
  statsRow: { flexDirection: 'row', gap: 24 },
  stat: { alignItems: 'center' },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: 10 },
  empty: { textAlign: 'center', marginTop: 24 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 14,
    gap: 4,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#f59e0b22', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#b45309' },
  model: { fontFamily: Fonts.mono },
});
