import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ApiError,
  CORE_CATEGORIES,
  EXTRA_CATEGORIES,
  transformKey,
  transformsApi,
  type SeedCandidate,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { Fonts } from '@/constants/theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

// Mon/Wed/Fri default to also drilling the 5 extra categories; the learner can override per session.
function extraDefault(): boolean {
  return [1, 3, 5].includes(new Date().getDay());
}

// Which categories to drill today: core always, extra only when the toggle is on.
function activeCategories(includeExtra: boolean): Set<string> {
  return new Set<string>(includeExtra ? [...CORE_CATEGORIES, ...EXTRA_CATEGORIES] : CORE_CATEGORIES);
}

export default function SentenceGymScreen() {
  const token = useAuthStore((s) => s.token);
  const [text, setText] = useState('');
  const [pickedGloss, setPickedGloss] = useState<string | undefined>(undefined);
  const [includeExtra, setIncludeExtra] = useState(extraDefault());
  const [drilling, setDrilling] = useState(false);

  // Seed candidates aggregated server-side from the learner's mined clips (no client transcript parsing).
  const seeds = useQuery({
    queryKey: ['gym-seeds'],
    queryFn: () => transformsApi.seeds(),
    enabled: !!token,
  });

  const gen = useMutation({
    mutationFn: (v: { base: string; gloss?: string }) => transformsApi.generate(v.base, v.gloss),
  });

  const set = gen.data ?? null;

  if (!token) return <Redirect href="/login" />;

  // DRILL — self-grade via the shared runner, with an opt-in inline AI check per transform.
  if (drilling && set) {
    const cats = activeCategories(includeExtra);
    const items: DrillItem[] = set.transforms
      .filter((tr) => cats.has(tr.category))
      .map((tr) => ({
        key: transformKey(set.seedId, tr.op, 0),
        title: set.baseSentence,
        subtitle: tr.label,
        cue: tr.koreanGloss,
        model: tr.english,
      }));
    return (
      <DrillRunner
        key={`${set.seedId}:${includeExtra}`}
        items={items}
        onCheck={(item, attempt) => {
          const tr = set.transforms.find((x) => transformKey(set.seedId, x.op, 0) === item.key);
          return transformsApi.check(tr!.label, set.baseSentence, tr!.english, attempt);
        }}
      />
    );
  }

  const errorMessage =
    gen.error instanceof ApiError ? gen.error.message : gen.error ? t('gym.generateFailed') : null;
  const transformCount = set
    ? set.transforms.filter((tr) => activeCategories(includeExtra).has(tr.category)).length
    : 0;

  const pickSeed = (s: SeedCandidate) => {
    setText(s.english);
    setPickedGloss(s.koreanGloss ?? undefined);
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <ThemedText type="title">{t('gym.title')}</ThemedText>
            <ThemedText type="small">{t('gym.subtitle')}</ThemedText>

            {!set ? (
              <>
                <ThemedText type="smallBold" style={styles.section}>{t('gym.inputLabel')}</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder={t('gym.inputPlaceholder')}
                  placeholderTextColor="#9ca3af"
                  multiline
                  value={text}
                  onChangeText={(v) => {
                    setText(v);
                    setPickedGloss(undefined); // a manual edit drops the picked seed's Korean gloss
                  }}
                />
                {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}
                <Pressable
                  style={[styles.primaryBtn, (!text.trim() || gen.isPending) && styles.disabled]}
                  disabled={!text.trim() || gen.isPending}
                  onPress={() => gen.mutate({ base: text.trim(), gloss: pickedGloss })}
                >
                  {gen.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.primaryText}>{t('gym.generate')}</ThemedText>
                  )}
                </Pressable>

                <ThemedText type="smallBold" style={styles.section}>{t('gym.fromClips')}</ThemedText>
                {seeds.isPending && <ActivityIndicator />}
                {seeds.data && seeds.data.length === 0 && (
                  <ThemedText type="small">{t('gym.noClipSeeds')}</ThemedText>
                )}
                {seeds.data?.map((s, i) => (
                  <Pressable key={i} style={styles.seedChip} onPress={() => pickSeed(s)}>
                    <ThemedText type="small">{s.english}</ThemedText>
                    {s.koreanGloss ? (
                      <ThemedText type="small" style={styles.seedGloss}>{s.koreanGloss}</ThemedText>
                    ) : null}
                  </Pressable>
                ))}
              </>
            ) : (
              <View style={styles.gap}>
                <View style={styles.baseBox}>
                  <ThemedText type="small">{t('gym.ready')}</ThemedText>
                  <ThemedText style={styles.base}>{set.baseSentence}</ThemedText>
                </View>

                <Pressable
                  style={[styles.toggle, includeExtra && styles.toggleOn]}
                  onPress={() => setIncludeExtra((v) => !v)}
                >
                  <ThemedText style={includeExtra ? styles.toggleOnText : styles.toggleText}>
                    {includeExtra ? t('gym.extraOn') : t('gym.extraOff')}
                  </ThemedText>
                </Pressable>

                <ThemedText type="small">{t('gym.transformCount', { n: transformCount })}</ThemedText>

                <Pressable style={styles.primaryBtn} onPress={() => setDrilling(true)}>
                  <ThemedText style={styles.primaryText}>{t('gym.startDrill')}</ThemedText>
                </Pressable>
                <Pressable
                  style={styles.linkBtn}
                  onPress={() => {
                    gen.reset();
                    setText('');
                    setPickedGloss(undefined);
                  }}
                >
                  <ThemedText style={styles.linkText}>{t('gym.newSentence')}</ThemedText>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 12 },
  gap: { gap: 12 },
  section: { marginTop: 8 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 90,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  error: { color: '#dc2626' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  disabled: { opacity: 0.5 },
  linkBtn: { paddingVertical: 10, alignItems: 'center' },
  linkText: { color: '#208AEF', fontWeight: '600' },
  seedChip: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 12,
    gap: 2,
  },
  seedGloss: { color: '#6b7280' },
  baseBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    gap: 4,
  },
  base: { fontSize: 17, fontFamily: Fonts.mono },
  toggle: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  toggleText: { fontWeight: '600' },
  toggleOnText: { color: '#fff', fontWeight: '700' },
});
