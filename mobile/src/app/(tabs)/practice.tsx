import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, type Href, useFocusEffect } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useQuery } from '@tanstack/react-query';
import {
  AI_CODING,
  ARGUMENT_GROUPS,
  COLLOCATIONS,
  ENGLISH_PATTERNS,
  IT_PATTERNS,
  IT_TERMS,
  PARTICLE_GROUPS,
  PATTERNS,
  PHRASAL_500,
  PREP_GROUPS,
  REASONING_PREP_GROUPS,
  TRAP_CARDS,
  VERB_PACK,
  WORKSHOP_COUNTS,
  authApi,
  cardIndex,
  localToday,
  practiceApi,
  useMastery,
  type MasteryCounts,
  type PracticePackId,
} from '@shadow-ai/core';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { MilestoneToast } from '@/components/milestone-toast';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import { boldSymbolWeight } from '@/lib/symbol-weights';

const patternCount = PATTERNS.reduce((n, p) => n + p.items.length, 0);
const collocationCount = COLLOCATIONS.reduce((n, p) => n + p.items.length, 0);
const verbCount = VERB_PACK.reduce((n, g) => n + g.items.length, 0);
const PACK_PREFIXES = ['pat:', 'col:', 'pv:', 'ep:', 'p5:', 'itp:', 'itt:', 'aic:'] as const;
const SYMBOL_WEIGHT = { ios: 'bold', android: boldSymbolWeight } as const;

type SymbolName = SymbolViewProps['name'];
type PackPrefix = (typeof PACK_PREFIXES)[number];
type Tool = {
  href: Href;
  title: string;
  sub: string;
  icon: SymbolName;
  count?: number;
  prefix?: PackPrefix;
  packId?: PracticePackId;
};

/** Practice is deliberately even and quiet: every destination has the same footprint. */
export default function PracticeMenuScreen() {
  const token = useAuthStore((s) => s.token);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [milestoneRefreshKey, setMilestoneRefreshKey] = useState(0);
  const today = localToday();
  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.me(),
    enabled: !!token,
    staleTime: 60_000,
    retry: false,
  });
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
    retry: false,
  });
  const progress = useQuery({
    queryKey: ['practice', 'progress', today],
    queryFn: () => practiceApi.progress(today),
    enabled: !!token,
    retry: false,
  });
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      if (token) {
        setMilestoneRefreshKey((value) => value + 1);
        void Promise.all([srs.refetch(), progress.refetch()]);
      }
      return () => setIsFocused(false);
    }, [progress.refetch, srs.refetch, token]),
  );
  const mastery = useMastery(srs.data ?? []);
  const cardsByKey = useMemo(() => cardIndex(), []);
  const dueByPrefix = useMemo(() => {
    const counts = new Map<PackPrefix, number>();
    for (const state of srs.data ?? []) {
      if (state.dueDate > today || !cardsByKey.has(state.cardKey)) continue;
      const prefix = PACK_PREFIXES.find((candidate) => state.cardKey.startsWith(candidate));
      if (prefix) counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    }
    return counts;
  }, [cardsByKey, srs.data, today]);

  if (!token) return <Redirect href="/login" />;

  const tools: Tool[] = [
    {
      href: '/today',
      title: t('home.today'),
      sub: t('home.todaySub'),
      icon: { ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' },
    },
    {
      href: '/story',
      title: t('home.story'),
      sub: t('home.storySub'),
      icon: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
    },
    {
      href: '/mix',
      title: t('home.mix'),
      sub: t('home.mixSub'),
      icon: { ios: 'wand.and.stars', android: 'auto_awesome', web: 'auto_awesome' },
    },
    {
      href: '/verbs',
      title: t('home.verbs'),
      sub: t('home.verbsSub', { n: verbCount }),
      icon: { ios: 'rectangle.stack.fill', android: 'view_carousel', web: 'view_carousel' },
      count: verbCount,
      prefix: 'pv:',
      packId: 'verb',
    },
    {
      href: '/weak',
      title: t('home.weakSpots'),
      sub: t('home.weakSpotsSub'),
      icon: { ios: 'scope', android: 'gps_fixed', web: 'gps_fixed' },
    },
    {
      href: '/pattern-run',
      title: t('home.patternDrill'),
      sub: t('home.patternDrillSub', { n: patternCount }),
      icon: { ios: 'square.stack.3d.up.fill', android: 'dashboard', web: 'dashboard' },
      count: patternCount,
      prefix: 'pat:',
      packId: 'pattern',
    },
    {
      href: '/gym',
      title: t('home.gym'),
      sub: t('home.gymSub'),
      icon: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
    },
    {
      href: '/english-patterns',
      title: t('home.dailyPatterns'),
      sub: t('home.dailyPatternsSub', { n: ENGLISH_PATTERNS.length }),
      icon: { ios: 'text.bubble', android: 'chat', web: 'chat' },
      count: ENGLISH_PATTERNS.length,
      prefix: 'ep:',
      packId: 'englishPattern',
    },
    {
      href: '/phrasal-500',
      title: t('home.phrasal500'),
      sub: t('home.phrasal500Sub', { n: PHRASAL_500.length }),
      icon: { ios: 'arrow.triangle.branch', android: 'merge_type', web: 'merge_type' },
      count: PHRASAL_500.length,
      prefix: 'p5:',
      packId: 'phrasal500',
    },
    {
      href: '/it-patterns',
      title: t('home.itPatterns'),
      sub: t('home.itPatternsSub', { n: IT_PATTERNS.length }),
      icon: { ios: 'curlybraces', android: 'code', web: 'code' },
      count: IT_PATTERNS.length,
      prefix: 'itp:',
      packId: 'itPattern',
    },
    {
      href: '/it-terms',
      title: t('home.itTerms'),
      sub: t('home.itTermsSub', { n: IT_TERMS.length }),
      icon: { ios: 'chevron.left.forwardslash.chevron.right', android: 'terminal', web: 'terminal' },
      count: IT_TERMS.length,
      prefix: 'itt:',
      packId: 'itTerm',
    },
    {
      href: '/ai-coding',
      title: t('home.aiCoding'),
      sub: t('home.aiCodingSub', { n: AI_CODING.length }),
      icon: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
      count: AI_CODING.length,
      prefix: 'aic:',
      packId: 'aiCoding',
    },
    {
      href: '/collocations',
      title: t('home.collocations'),
      sub: t('home.collocationsSub', { n: collocationCount }),
      icon: { ios: 'link', android: 'link', web: 'link' },
      count: collocationCount,
      prefix: 'col:',
      packId: 'collocation',
    },
    {
      href: '/compose',
      title: t('home.composeCheck'),
      sub: t('home.composeCheckSub'),
      icon: { ios: 'pencil', android: 'edit', web: 'edit' },
    },
    {
      href: '/prepositions',
      title: t('home.prepositions'),
      sub: t('home.prepositionsSub'),
      icon: { ios: 'safari.fill', android: 'explore', web: 'explore' },
    },
  ];

  return (
    <ThemedView style={styles.flex}>
      <MilestoneToast
        enabled={isFocused}
        userId={me.data?.id}
        mastered={srs.data ? mastery.mastered : undefined}
        streak={progress.data?.streak}
        refreshKey={milestoneRefreshKey}
      />
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.grid}>
            {tools.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                due={
                  tool.prefix
                    ? srs.data
                      ? (dueByPrefix.get(tool.prefix) ?? 0)
                      : '—'
                    : undefined
                }
                mastery={tool.packId && srs.data ? mastery.byPack[tool.packId] : undefined}
              />
            ))}
          </View>

          <Chip
            tone="primary"
            selected={showWorkshop}
            style={styles.workshopToggle}
            textStyle={styles.workshopToggleText}
            onPress={() => setShowWorkshop((value) => !value)}
            accessibilityLabel={t('practice.workshop')}
            accessibilityState={{ expanded: showWorkshop }}
          >
            {t('practice.workshop')}
          </Chip>

          {showWorkshop ? <Workshop /> : null}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function ToolCard({
  tool,
  due,
  mastery,
}: {
  tool: Tool;
  due?: number | string;
  mastery?: MasteryCounts;
}) {
  const theme = useTheme();
  const meta = tool.count === undefined
    ? tool.sub
    : t('practice.packMeta', { count: tool.count, due: due ?? '—' });
  const masteryMeta = mastery
    ? t('practice.masteryMeta', { mastered: mastery.mastered, total: mastery.total })
    : null;
  const progress = mastery?.total ? Math.min(1, mastery.mastered / mastery.total) : 0;

  return (
    <Card
      style={styles.toolCard}
      onPress={() => router.push(tool.href)}
      accessibilityLabel={`${tool.title}. ${meta}${masteryMeta ? `. ${masteryMeta}` : ''}`}
      accessibilityValue={mastery ? {
        min: 0,
        max: mastery.total,
        now: mastery.mastered,
        text: masteryMeta ?? undefined,
      } : undefined}
    >
      <View style={[styles.iconShell, { backgroundColor: theme.primarySoft }]}>
        <SymbolView name={tool.icon} size={22} weight={SYMBOL_WEIGHT} tintColor={theme.primary} />
      </View>
      <View style={styles.toolCopy}>
        <ThemedText type="smallBold" maxFontSizeMultiplier={1.3}>
          {tool.title}
        </ThemedText>
        <ThemedText
          type="label"
          themeColor="textSecondary"
          maxFontSizeMultiplier={1.2}
        >
          {meta}
        </ThemedText>
        {mastery && masteryMeta ? (
          <View style={styles.masteryBlock}>
            <ThemedText type="label" themeColor="textSecondary" maxFontSizeMultiplier={1.2}>
              {masteryMeta}
            </ThemedText>
            <View
              style={[styles.progressTrack, { backgroundColor: theme.primarySoft }]}
            >
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: theme.primary, width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>
        ) : null}
      </View>
    </Card>
  );
}

function Workshop() {
  return (
    <View style={styles.workshop}>
      <Card
        style={styles.workshopCard}
        onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'collocation' } })}
        accessibilityLabel={t('practice.devColloc')}
      >
        <CardSymbol icon={{ ios: 'briefcase.fill', android: 'work', web: 'work' }} />
        <View style={styles.workshopCardBody}>
          <ThemedText type="smallBold">{t('practice.devColloc')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('practice.devCollocSub', { n: WORKSHOP_COUNTS.collocations })}
          </ThemedText>
        </View>
        <Chevron />
      </Card>

      <ThemedText type="small" themeColor="textSecondary">{t('practice.prepHint')}</ThemedText>
      <View style={styles.chips}>
        {[...PREP_GROUPS, ...REASONING_PREP_GROUPS].map((group) => (
          <Chip
            key={`pr-${group.particle}`}
            onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'prep', cluster: group.particle } })}
            accessibilityLabel={`${group.particle} ${group.items.length}`}
          >
            {group.particle} · {group.items.length}
          </Chip>
        ))}
      </View>

      <Card
        style={styles.workshopCard}
        onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'trap' } })}
        accessibilityLabel={t('practice.traps')}
      >
        <CardSymbol icon={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }} />
        <View style={styles.workshopCardBody}>
          <ThemedText type="smallBold">{t('practice.traps')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('practice.trapsSub', { n: TRAP_CARDS.length })}
          </ThemedText>
        </View>
        <Chevron />
      </Card>

      <ThemedText type="small" themeColor="textSecondary">{t('practice.argHint')}</ThemedText>
      <View style={styles.chips}>
        {ARGUMENT_GROUPS.map((group) => (
          <Chip
            key={`ag-${group.fn}`}
            onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'argument', cluster: group.fn } })}
            accessibilityLabel={`${group.labelKo} ${group.items.length}`}
          >
            {group.labelKo} · {group.items.length}
          </Chip>
        ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary">{t('practice.particleHint')}</ThemedText>
      <View style={styles.chips}>
        {PARTICLE_GROUPS.map((group) => (
          <Chip
            key={group.particle}
            onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'particle', cluster: group.particle } })}
            accessibilityLabel={`${group.particle} ${group.items.length}`}
          >
            {group.particle} · {group.items.length}+
          </Chip>
        ))}
      </View>
    </View>
  );
}

function CardSymbol({ icon }: { icon: SymbolName }) {
  const theme = useTheme();

  return (
    <View style={[styles.iconShell, { backgroundColor: theme.primarySoft }]}>
      <SymbolView name={icon} size={21} weight={SYMBOL_WEIGHT} tintColor={theme.primary} />
    </View>
  );
}

function Chevron() {
  const theme = useTheme();

  return (
    <SymbolView
      name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
      size={18}
      weight={SYMBOL_WEIGHT}
      tintColor={theme.textSecondary}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, gap: 18, paddingBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  toolCard: { flexBasis: '47%', minHeight: 166, gap: 14 },
  iconShell: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolCopy: { flex: 1, justifyContent: 'space-between', gap: 7 },
  masteryBlock: { gap: 5 },
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  workshopToggle: { alignSelf: 'stretch' },
  workshopToggleText: { flexShrink: 1, textAlign: 'center' },
  workshop: { gap: 12 },
  workshopCard: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 12 },
  workshopCardBody: { flex: 1, gap: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
