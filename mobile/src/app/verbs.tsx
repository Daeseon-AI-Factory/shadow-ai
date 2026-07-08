import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  VERB_PACK,
  verbKey,
  PARTICLE_INFO,
  partition,
  shuffle,
  localToday,
  NEW_PER_DAY,
  practiceApi,
  type SrsCard,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { ErrorState } from '@/components/error-state';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import { applyMode, composeOnCheck, modeLabel, type DeckMode } from '@/lib/drill-modes';

// The verb pack, browsable three ways: by frequency TIER, by base VERB (put/take/get…), or by
// PARTICLE (up/off/out…). Whichever axis + group you pick, the same cards feed the same Leitner
// SRS — grade a card and it comes back via Today / Weak spots on the 1/3/7/14 schedule.
type Axis = 'tier' | 'verb' | 'particle';
const ALL = '__all__';

// Flatten once: every card tagged with its verb group, tier, star priority and particle.
type Row = { key: string; verbId: string; verbLabel: string; tier: number; star: number; particle: string | null; di: DrillItem };
const ROWS: Row[] = (() => {
  const out: Row[] = [];
  for (const g of VERB_PACK) {
    const verbLabel = g.verb === 'APPENDIX' ? 'PHRASE' : g.verb;
    g.items.forEach((it, i) => {
      const key = verbKey(g.id, i);
      const p = PARTICLE_INFO[key];
      const particle = p && p.particle ? p.particle : null;
      const hasFeel = !!(p && p.particleType === 'adverb' && p.particle);
      const feelNote = hasFeel && p!.sense ? `${p!.particle} = ${p!.sense}` : undefined;
      // Reveal shows: the example sentence (+ its Korean) first, then the particle feel / easy-EN meta.
      const exLine = it.example ? `“${it.example}”${it.exampleKo ? `\n${it.exampleKo}` : ''}` : undefined;
      const meta = [feelNote, it.easyEn].filter(Boolean).join('  ·  ') || undefined;
      const note = [exLine, meta].filter(Boolean).join('\n') || undefined;
      out.push({
        key,
        verbId: g.id,
        verbLabel,
        tier: it.tier,
        star: it.star ? 0 : 1,
        particle,
        di: {
          key,
          title: verbLabel,
          subtitle: `${verbLabel} · T${it.tier}${particle ? ` · ${particle}` : ''}`,
          cue: it.cue,
          model: it.model,
          note,
        },
      });
    });
  }
  return out;
})();

// Group lists per axis (id + label + count), so the picker shows how many cards each group holds.
const VERB_GROUPS = VERB_PACK.map((g) => ({ id: g.id, label: g.verb === 'APPENDIX' ? 'PHRASE' : g.verb, n: g.items.length }));
const TIER_GROUPS = [1, 2, 3]
  .map((tr) => ({ id: String(tr), label: `T${tr}`, n: ROWS.filter((r) => r.tier === tr).length }))
  .filter((x) => x.n > 0);
const PARTICLE_GROUPS_V = (() => {
  const counts = new Map<string, number>();
  for (const r of ROWS) if (r.particle) counts.set(r.particle, (counts.get(r.particle) ?? 0) + 1);
  return [...counts.entries()].map(([id, n]) => ({ id, label: id, n })).sort((a, b) => b.n - a.n);
})();

function groupsFor(axis: Axis) {
  return axis === 'verb' ? VERB_GROUPS : axis === 'particle' ? PARTICLE_GROUPS_V : TIER_GROUPS;
}

/** Cards for the chosen axis+group, frequency-ordered (T1 first, starred first within a tier). */
function itemsFor(axis: Axis, pick: string): DrillItem[] {
  let rows = ROWS;
  if (pick !== ALL) {
    rows = ROWS.filter((r) =>
      axis === 'verb' ? r.verbId === pick : axis === 'particle' ? r.particle === pick : String(r.tier) === pick,
    );
  }
  return [...rows].sort((a, b) => a.tier - b.tier || a.star - b.star).map((r) => r.di);
}

export default function VerbDrillScreen() {
  const token = useAuthStore((s) => s.token);
  const [axis, setAxis] = useState<Axis>('tier');
  const [pick, setPick] = useState<string>(ALL);
  const [mode, setMode] = useState<DeckMode>('recall');
  const [started, setStarted] = useState(false);

  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const groups = useMemo(() => groupsFor(axis), [axis]);

  // The day's session for the picked group: all due reviews (shuffled) + a frequency-ordered trickle
  // of new cards. partition() keeps `fresh` in itemsFor order (tier-sorted), so new cards arrive T1-first.
  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    const { due, fresh } = partition(applyMode(itemsFor(axis, pick), mode), srs.data as SrsCard[], localToday());
    return [...shuffle(due), ...fresh.slice(0, NEW_PER_DAY)];
  }, [axis, pick, mode, srs.data]);

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
    return (
      <DrillRunner
        key={`${axis}:${pick}:${mode}:${session.map((e) => e.key).join(',')}`}
        items={session}
        onCheck={mode === 'compose' ? composeOnCheck : undefined}
      />
    );
  }

  const pickAxis = (a: Axis) => {
    setAxis(a);
    setPick(ALL);
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <View style={styles.container}>
          <ThemedText type="title">{t('verbs.title')}</ThemedText>
          <ThemedText type="small">{t('verbs.subtitle')}</ThemedText>

          {/* Axis: browse by tier / by verb / by particle */}
          <View style={styles.axisRow}>
            {(['tier', 'verb', 'particle'] as Axis[]).map((a) => (
              <Pressable
                key={a}
                style={[styles.axisBtn, axis === a && styles.axisActive]}
                onPress={() => pickAxis(a)}
                accessibilityRole="button"
                accessibilityState={{ selected: axis === a }}
              >
                <ThemedText style={axis === a ? styles.axisTextActive : styles.axisText}>
                  {t(`verbs.axis_${a}` as 'verbs.axis_tier')}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          {/* Groups for the chosen axis (scrolls for the 100+ verb chips) */}
          <ScrollView style={styles.groupScroll} contentContainerStyle={styles.chips} keyboardShouldPersistTaps="handled">
            <Pressable
              style={[styles.chip, pick === ALL && styles.chipActive]}
              onPress={() => setPick(ALL)}
              accessibilityRole="button"
              accessibilityState={{ selected: pick === ALL }}
            >
              <ThemedText style={pick === ALL ? styles.chipTextActive : styles.chipText}>{t('verbs.allGroups')}</ThemedText>
            </Pressable>
            {groups.map((g) => (
              <Pressable
                key={g.id}
                style={[styles.chip, pick === g.id && styles.chipActive]}
                onPress={() => setPick(g.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: pick === g.id }}
              >
                <ThemedText style={pick === g.id ? styles.chipTextActive : styles.chipText}>
                  {g.label} · {g.n}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          {/* Drill mode */}
          <View style={styles.chips}>
            {(['recall', 'reverse', 'compose'] as DeckMode[]).map((m) => (
              <Pressable
                key={m}
                style={[styles.chip, mode === m && styles.chipActive]}
                onPress={() => setMode(m)}
                accessibilityRole="button"
                accessibilityState={{ selected: mode === m }}
              >
                <ThemedText style={mode === m ? styles.chipTextActive : styles.chipText}>{modeLabel(m)}</ThemedText>
              </Pressable>
            ))}
          </View>

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
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flex: 1, padding: 24, gap: 12 },
  axisRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  axisBtn: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  axisActive: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  axisText: { fontWeight: '600' },
  axisTextActive: { color: '#fff', fontWeight: '700' },
  groupScroll: { maxHeight: 168 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  chipText: { fontWeight: '600' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
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
});
