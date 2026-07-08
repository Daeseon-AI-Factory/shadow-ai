import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, type Href } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { PATTERNS, COLLOCATIONS, VERB_PACK, ENGLISH_PATTERNS, PHRASAL_500, IT_PATTERNS, IT_TERMS, AI_CODING, PARTICLE_GROUPS, PREP_GROUPS, REASONING_PREP_GROUPS, ARGUMENT_GROUPS, TRAP_CARDS, WORKSHOP_COUNTS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const patternCount = PATTERNS.reduce((n, p) => n + p.items.length, 0);
const verbCount = VERB_PACK.reduce((n, g) => n + g.items.length, 0);

type SymbolName = SymbolViewProps['name'];
type Tool = { href: Href; title: string; sub: string; icon: SymbolName };

/**
 * Practice hub. Used to dump every tool + every phrasal chip on one screen — overwhelming. Now it
 * leads with 3 recommended sessions and tucks the full toolbox + the advanced "workshop" chips behind
 * a single "More practice" toggle, so the first thing you see is a short, clear choice.
 */
export default function PracticeMenuScreen() {
  const token = useAuthStore((s) => s.token);
  const [showMore, setShowMore] = useState(false);
  if (!token) return <Redirect href="/login" />;

  const recommended: Tool[] = [
    {
      href: '/sparring',
      title: t('home.sparring'),
      sub: t('home.sparringSub'),
      icon: { ios: 'waveform.circle.fill', android: 'record_voice_over', web: 'record_voice_over' },
    },
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
    },
    {
      href: '/gym',
      title: t('home.gym'),
      sub: t('home.gymSub'),
      icon: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
    },
  ];
  const moreTools: Tool[] = [
    {
      href: '/english-patterns',
      title: t('home.dailyPatterns'),
      sub: t('home.dailyPatternsSub', { n: ENGLISH_PATTERNS.length }),
      icon: { ios: 'text.bubble', android: 'chat', web: 'chat' },
    },
    {
      href: '/phrasal-500',
      title: t('home.phrasal500'),
      sub: t('home.phrasal500Sub', { n: PHRASAL_500.length }),
      icon: { ios: 'arrow.triangle.branch', android: 'merge_type', web: 'merge_type' },
    },
    {
      href: '/it-patterns',
      title: t('home.itPatterns'),
      sub: t('home.itPatternsSub', { n: IT_PATTERNS.length }),
      icon: { ios: 'curlybraces', android: 'code', web: 'code' },
    },
    {
      href: '/it-terms',
      title: t('home.itTerms'),
      sub: t('home.itTermsSub', { n: IT_TERMS.length }),
      icon: { ios: 'chevron.left.forwardslash.chevron.right', android: 'terminal', web: 'terminal' },
    },
    {
      href: '/ai-coding',
      title: t('home.aiCoding'),
      sub: t('home.aiCodingSub', { n: AI_CODING.length }),
      icon: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
    },
    {
      href: '/collocations',
      title: t('home.collocations'),
      sub: t('home.collocationsSub', { n: COLLOCATIONS.length }),
      icon: { ios: 'link', android: 'link', web: 'link' },
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
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="smallBold" style={styles.section}>{t('practice.recommended')}</ThemedText>
          {recommended.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}

          <Pressable
            style={styles.moreToggle}
            onPress={() => setShowMore((v) => !v)}
            accessibilityRole="button"
            accessibilityState={{ expanded: showMore }}
            accessibilityLabel={t('practice.more')}
          >
            <ThemedText type="smallBold" style={styles.moreText}>
              {t('practice.more')}
            </ThemedText>
            <SymbolView
              name={showMore
                ? { ios: 'chevron.up', android: 'keyboard_arrow_up', web: 'keyboard_arrow_up' }
                : { ios: 'chevron.down', android: 'keyboard_arrow_down', web: 'keyboard_arrow_down' }}
              size={16}
              weight="bold"
              tintColor="#208AEF"
            />
          </Pressable>

          {showMore && (
            <>
              {moreTools.map((tool) => (
                <ToolCard key={tool.title} tool={tool} />
              ))}

              {/* Real-world workshop: dev collocations + the particle/preposition/argument phrasal systems. */}
              <ThemedText type="smallBold" style={styles.section}>{t('practice.workshop')}</ThemedText>
              <Pressable
                style={[styles.card, styles.featured]}
                onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'collocation' } })}
                accessibilityRole="button"
                accessibilityLabel={t('practice.devColloc')}
              >
                <CardSymbol
                  icon={{ ios: 'briefcase.fill', android: 'work', web: 'work' }}
                  tint="#208AEF"
                  background="#208AEF18"
                />
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold">{t('practice.devColloc')}</ThemedText>
                  <ThemedText type="small" style={styles.sub}>{t('practice.devCollocSub', { n: WORKSHOP_COUNTS.collocations })}</ThemedText>
                </View>
                <Chevron />
              </Pressable>

              <ThemedText type="small" style={styles.sub}>{t('practice.prepHint')}</ThemedText>
              <View style={styles.chips}>
                {[...PREP_GROUPS, ...REASONING_PREP_GROUPS].map((g) => (
                  <Pressable
                    key={`pr-${g.particle}`}
                    style={[styles.chip, styles.prepChip]}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'prep', cluster: g.particle } })}
                    accessibilityRole="button"
                    accessibilityLabel={`${g.particle} ${g.items.length}`}
                  >
                    <ThemedText type="small">{g.particle} · {g.items.length}</ThemedText>
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={[styles.card, styles.trapCard]}
                onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'trap' } })}
                accessibilityRole="button"
                accessibilityLabel={t('practice.traps')}
              >
                <CardSymbol
                  icon={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
                  tint="#dc2626"
                  background="#dc262618"
                />
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold">{t('practice.traps')}</ThemedText>
                  <ThemedText type="small" style={styles.sub}>{t('practice.trapsSub', { n: TRAP_CARDS.length })}</ThemedText>
                </View>
                <Chevron />
              </Pressable>

              <ThemedText type="small" style={styles.sub}>{t('practice.argHint')}</ThemedText>
              <View style={styles.chips}>
                {ARGUMENT_GROUPS.map((g) => (
                  <Pressable
                    key={`ag-${g.fn}`}
                    style={[styles.chip, styles.argChip]}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'argument', cluster: g.fn } })}
                    accessibilityRole="button"
                    accessibilityLabel={`${g.labelKo} ${g.items.length}`}
                  >
                    <ThemedText type="small">{g.labelKo} · {g.items.length}</ThemedText>
                  </Pressable>
                ))}
              </View>

              <ThemedText type="small" style={styles.sub}>{t('practice.particleHint')}</ThemedText>
              <View style={styles.chips}>
                {PARTICLE_GROUPS.map((g) => (
                  <Pressable
                    key={g.particle}
                    style={styles.chip}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'particle', cluster: g.particle } })}
                    accessibilityRole="button"
                    accessibilityLabel={`${g.particle} ${g.items.length}`}
                  >
                    <ThemedText type="small">{g.particle} · {g.items.length}+</ThemedText>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Pressable style={styles.card} onPress={() => router.push(tool.href)} accessibilityRole="button" accessibilityLabel={tool.title}>
      <CardSymbol icon={tool.icon} tint="#208AEF" background="#208AEF18" />
      <View style={styles.cardBody}>
        <ThemedText type="smallBold">{tool.title}</ThemedText>
        <ThemedText type="small" style={styles.sub} numberOfLines={1}>{tool.sub}</ThemedText>
      </View>
      <Chevron />
    </Pressable>
  );
}

function CardSymbol({ icon, tint, background }: { icon: SymbolName; tint: string; background: string }) {
  return (
    <View style={[styles.iconShell, { backgroundColor: background }]}>
      <SymbolView name={icon} size={21} weight="bold" tintColor={tint} />
    </View>
  );
}

function Chevron() {
  return (
    <SymbolView
      name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
      size={18}
      weight="bold"
      tintColor="#9ca3af"
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, gap: 10, paddingBottom: 32 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af77',
    minHeight: 68,
    padding: 14,
  },
  iconShell: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, gap: 2 },
  sub: { color: '#6b7280' },
  section: { marginTop: 6, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7 },
  moreToggle: {
    alignSelf: 'flex-start',
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moreText: { color: '#208AEF' },
  featured: { borderColor: '#208AEF', backgroundColor: '#208AEF11' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#208AEF55',
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  prepChip: { borderColor: '#16a34a88' },
  argChip: { borderColor: '#d9770688' },
  trapCard: { borderColor: '#dc2626', backgroundColor: '#dc262611' },
});
