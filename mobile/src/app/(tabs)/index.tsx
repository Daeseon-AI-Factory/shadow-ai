import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useQuery } from '@tanstack/react-query';
import { authApi, clipsApi, reviewApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ErrorState } from '@/components/error-state';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { useLastClip } from '@/lib/last-clip';
import { haptic } from '@/lib/haptics';
import { t } from '@/lib/i18n';

type SymbolName = SymbolViewProps['name'];
const SCREENSHOT_DISPLAY_NAME = process.env.EXPO_PUBLIC_SCREENSHOT_DISPLAY_NAME;

/**
 * Today — the home screen leads with ONE action, not a grid of features. We pick the single most
 * useful next step (reviews due → resume last clip → import a first video) so the user knows what to
 * tap in a second. Everything else (videos, drills) is one tap behind the two slim cards below.
 */
export default function TodayScreen() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);
  const theme = useTheme();

  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.me(),
    enabled: !!token,
    // A valid cold start seeds this cache during silent token validation.
    staleTime: 60_000,
    // L1 already bounds each request; show the explicit retry state after one failed attempt.
    retry: false,
  });
  const streak = useQuery({
    queryKey: ['streak'],
    queryFn: () => reviewApi.streak(),
    enabled: !!token,
    retry: false,
  });
  // size:1 with the default "newest" sort → the most recent clip, used as the "continue" target.
  const recent = useQuery({
    queryKey: ['clips', 'recent'],
    queryFn: () => clipsApi.list({ size: 1 }),
    enabled: !!token,
    retry: false,
  });
  const lastClip = useLastClip();

  if (!hydrated) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!token) return <Redirect href="/login" />;

  if (me.isError || streak.isError || recent.isError) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex} edges={['top']}>
          <ErrorState
            onRetry={() => {
              void Promise.all([me.refetch(), streak.refetch(), recent.refetch()]);
            }}
          />
        </SafeAreaView>
      </ThemedView>
    );
  }

  const due = streak.data?.dueToday ?? 0;
  const streakDays = streak.data?.streakDays ?? 0;
  const recentClip = recent.data?.items?.[0];
  // Prefer the clip you last opened; fall back to your newest clip.
  const resume =
    lastClip ??
    (recentClip ? { id: recentClip.id, name: recentClip.name || recentClip.videoTitle || '' } : null);
  const settling = streak.isPending || recent.isPending;

  // The one action that matters most right now.
  const primary: PrimaryAction =
    due > 0
      ? {
          icon: { ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' },
          title: t('today.reviewCta', { n: due }),
          sub: t('today.reviewSub'),
          onPress: () => router.push('/review'),
        }
      : resume
        ? {
            icon: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
            title: t('today.resumeCta'),
            sub: resume.name || t('today.resumeSub'),
            onPress: () => router.push(`/player/${resume.id}`),
          }
        : {
            icon: { ios: 'plus', android: 'add', web: 'add' },
            title: t('today.importCta'),
            sub: t('today.importSub'),
            onPress: () => router.push('/import'),
          };

  const streakText =
    streakDays > 0 || due > 0 ? t('today.streakLine', { days: streakDays, due }) : t('today.streakEmpty');

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.head}>
            <ThemedText style={[styles.eyebrow, { color: theme.primary }]} maxFontSizeMultiplier={1.4}>
              Mimi
            </ThemedText>
            <ThemedText type="title" style={styles.greeting} maxFontSizeMultiplier={1.25}>
              {me.data ? t('today.hi', { name: SCREENSHOT_DISPLAY_NAME || me.data.displayName }) : t('today.hiPlain')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" maxFontSizeMultiplier={1.5}>
              {streakText}
            </ThemedText>
          </View>

          {/* The single primary action. */}
          {settling ? (
            <View style={[styles.hero, styles.heroLoading, { backgroundColor: theme.primary }]}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <Pressable
              style={[styles.hero, { backgroundColor: theme.primary }]}
              onPress={() => {
                haptic.light();
                primary.onPress();
              }}
              accessibilityRole="button"
              accessibilityLabel={primary.title}
            >
              <View style={styles.heroText}>
                <ThemedText style={styles.heroKicker} maxFontSizeMultiplier={1.2}>
                  {t('today.todayKicker')}
                </ThemedText>
                <ThemedText style={styles.heroTitle} maxFontSizeMultiplier={1.25}>
                  {primary.title}
                </ThemedText>
                <ThemedText style={styles.heroSub} numberOfLines={2} maxFontSizeMultiplier={1.35}>
                  {primary.sub}
                </ThemedText>
              </View>
              <View style={styles.heroGo}>
                <SymbolView name={primary.icon} size={26} weight="bold" tintColor="#FFFFFF" />
              </View>
            </Pressable>
          )}

          {/* Everything else is one tap behind these two. */}
          <View style={styles.row}>
            <MiniCard
              icon={{ ios: 'rectangle.stack.fill', android: 'view_carousel', web: 'view_carousel' }}
              title={t('today.library')}
              onPress={() => router.push('/videos')}
            />
            <MiniCard
              icon={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
              title={t('today.morePractice')}
              onPress={() => router.push('/practice')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

type PrimaryAction = { icon: SymbolName; title: string; sub: string; onPress: () => void };

function MiniCard({ icon, title, onPress }: { icon: SymbolName; title: string; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      style={[styles.mini, { borderColor: theme.border, backgroundColor: theme.surfaceRaised }]}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={[styles.miniIcon, { backgroundColor: theme.primarySoft }]}>
        <SymbolView name={icon} size={20} weight="bold" tintColor={theme.primary} />
      </View>
      <ThemedText type="smallBold" maxFontSizeMultiplier={1.4}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 20, gap: 18, paddingBottom: 32 },
  head: { gap: 4, marginTop: 8 },
  eyebrow: { fontSize: 13, lineHeight: 18, fontWeight: '900' },
  greeting: { fontSize: 28, lineHeight: 34 },
  hero: {
    borderRadius: 24,
    padding: 22,
    minHeight: 132,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroLoading: { justifyContent: 'center' },
  heroText: { flex: 1, gap: 6 },
  heroKicker: { color: '#C8F7FF', fontSize: 12, lineHeight: 16, fontWeight: '900', letterSpacing: 1 },
  heroTitle: { color: '#FFFFFF', fontSize: 26, lineHeight: 31, fontWeight: '900' },
  heroSub: { color: '#E5F4FF', fontSize: 14, lineHeight: 20, fontWeight: '600' },
  heroGo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  row: { flexDirection: 'row', gap: 12 },
  mini: {
    flex: 1,
    minHeight: 92,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
    justifyContent: 'center',
  },
  miniIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
