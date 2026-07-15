import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import boldSymbolWeight from 'expo-symbols/androidWeights/bold';
import { useQuery } from '@tanstack/react-query';
import {
  authApi,
  clipsApi,
  localToday,
  practiceApi,
  reviewApi,
  selectPracticeRhythm,
  useMastery,
} from '@shadow-ai/core';

import { Card } from '@/components/card';
import { ErrorState } from '@/components/error-state';
import {
  isStreakAtRisk,
  MasterySummary,
  MasterySummarySkeleton,
  MasterySummaryUnavailable,
} from '@/components/mastery-summary';
import { TalkButton } from '@/components/talk-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { haptic } from '@/lib/haptics';
import { t } from '@/lib/i18n';

type SymbolName = SymbolViewProps['name'];
const SCREENSHOT_DISPLAY_NAME = process.env.EXPO_PUBLIC_SCREENSHOT_DISPLAY_NAME;
const WAVEFORM_HEIGHTS = [12, 26, 18, 34, 22, 30, 14] as const;
const SYMBOL_WEIGHT = { ios: 'bold', android: boldSymbolWeight } as const;
const LOCAL_CLOCK_REFRESH_MS = 60_000;

/**
 * Today keeps the existing resilient query flow, but gives the first viewport a stable hierarchy:
 * streak, mastery, one-tap Sparring, then the three quiet destinations used every day.
 */
export default function TodayScreen() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);
  const theme = useTheme();
  const [now, setNow] = useState(() => new Date());
  const [refreshRevision, setRefreshRevision] = useState(0);
  const clockBoundary = useRef(`${localToday()}-${now.getHours()}`);
  const today = localToday();
  const [nudgeRefreshReady, setNudgeRefreshReady] = useState(false);

  useEffect(() => {
    const refreshClock = () => {
      const next = new Date();
      const nextBoundary = `${localToday()}-${next.getHours()}`;
      setNow(next);

      if (nextBoundary !== clockBoundary.current) {
        clockBoundary.current = nextBoundary;
        setNudgeRefreshReady(false);
        setRefreshRevision((revision) => revision + 1);
      }
    };

    const interval = setInterval(refreshClock, LOCAL_CLOCK_REFRESH_MS);
    const subscription = AppState.addEventListener('change', (state) => {
      setNudgeRefreshReady(false);
      if (state === 'active') {
        refreshClock();
        setRefreshRevision((revision) => revision + 1);
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

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
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
    retry: false,
  });
  const practiceProgress = useQuery({
    queryKey: ['practice', 'progress', today],
    queryFn: () => practiceApi.progress(today),
    enabled: !!token,
    retry: false,
  });
  // size:1 with the default "newest" sort keeps the existing recent-clip state user-scoped.
  const recent = useQuery({
    queryKey: ['clips', 'recent'],
    queryFn: () => clipsApi.list({ size: 1 }),
    enabled: !!token,
    retry: false,
  });
  const mastery = useMastery(srs.data ?? []);
  const rhythm = practiceProgress.data
    ? selectPracticeRhythm(practiceProgress.data)
    : null;
  const retryMasterySummary = useCallback(() => {
    setNudgeRefreshReady(false);
    const progressRefresh = practiceProgress.refetch();
    void Promise.all([srs.refetch(), progressRefresh]);
    void progressRefresh.then((result) => {
      setNudgeRefreshReady(result.status === 'success');
    });
  }, [srs.refetch, practiceProgress.refetch]);

  // Expo Router keeps Home mounted. Refresh the decision inputs whenever the learner returns from
  // clipping or reviewing so the counts reflect the work they just completed.
  useFocusEffect(
    useCallback(() => {
      if (!token) {
        setNudgeRefreshReady(false);
        return;
      }

      let active = true;
      setNudgeRefreshReady(false);
      const progressRefresh = practiceProgress.refetch();
      void Promise.all([streak.refetch(), recent.refetch(), srs.refetch(), progressRefresh]);
      void progressRefresh.then((result) => {
        if (active) setNudgeRefreshReady(result.status === 'success');
      });

      return () => {
        active = false;
        setNudgeRefreshReady(false);
      };
    }, [
      token,
      today,
      refreshRevision,
      streak.refetch,
      recent.refetch,
      srs.refetch,
      practiceProgress.refetch,
    ]),
  );

  if (!hydrated) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!token) return <Redirect href="/login" />;

  const due = streak.data?.dueToday ?? 0;

  // Greeting and the existing ink streak remain load-bearing. Supplemental progress and clip
  // outages stay inside their own surfaces so the stable Home destinations remain usable.
  if ((me.isError && !me.data) || (streak.isError && !streak.data)) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex} edges={['top']}>
          <ErrorState
            onRetry={() => {
              void Promise.all([
                me.refetch(),
                streak.refetch(),
                recent.refetch(),
              ]);
            }}
          />
        </SafeAreaView>
      </ThemedView>
    );
  }

  const streakDays = streak.data?.streakDays ?? 0;
  const clipMeta = recent.data
    ? t('videos.clipCount', { count: recent.data.total })
    : recent.isPending
      ? '…'
      : '—';

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.head}>
            <ThemedText type="label" style={{ color: theme.primary }} maxFontSizeMultiplier={1.4}>
              Mimi
            </ThemedText>
            <ThemedText type="section" maxFontSizeMultiplier={1.25}>
              {me.data ? t('today.hi', { name: SCREENSHOT_DISPLAY_NAME || me.data.displayName }) : t('today.hiPlain')}
            </ThemedText>
          </View>

          <Card
            accent="amber"
            style={[
              styles.streakCard,
              {
                backgroundColor: theme.ink,
                borderColor: Colors.dark.border,
                // Expo 56 ships RN 0.85. Keep an ink fallback because this gradient API is experimental.
                experimental_backgroundImage: `linear-gradient(135deg, ${theme.ink}, ${Colors.dark.backgroundSelected})`,
              },
            ]}
          >
            <View style={styles.streakLabelRow}>
              <SymbolView
                name={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
                size={22}
                weight={SYMBOL_WEIGHT}
                tintColor={theme.amber}
              />
              <ThemedText type="label" style={{ color: Colors.dark.textSecondary }}>
                {t('me.streakDays')}
              </ThemedText>
            </View>
            {streak.isPending ? (
              <View style={styles.streakLoading}>
                <ActivityIndicator color={Colors.dark.text} />
              </View>
            ) : (
              <View style={styles.streakStats}>
                <ThemedText
                  type="display"
                  style={[styles.streakNumber, { color: Colors.dark.text }]}
                  maxFontSizeMultiplier={1.2}
                >
                  {streakDays}
                </ThemedText>
                <View style={[styles.duePill, { backgroundColor: theme.amber }]}>
                  <ThemedText type="label" style={{ color: theme.onAmber }} maxFontSizeMultiplier={1.35}>
                    {t('today.dueToday', { n: due })}
                  </ThemedText>
                </View>
              </View>
            )}
          </Card>

          {(srs.isError && !srs.data) || (practiceProgress.isError && !practiceProgress.data) ? (
            <MasterySummaryUnavailable onRetry={retryMasterySummary} />
          ) : srs.data && rhythm ? (
            <MasterySummary
              mastered={mastery.mastered}
              total={mastery.total}
              repsToday={rhythm.repsToday}
              streak={rhythm.streak}
              localDate={today}
              userId={me.data?.id}
              nudgeEligible={
                nudgeRefreshReady &&
                practiceProgress.data?.date === today &&
                isStreakAtRisk({
                  localHour: now.getHours(),
                  repsToday: rhythm.repsToday,
                  streak: rhythm.streak,
                })
              }
            />
          ) : (
            <MasterySummarySkeleton />
          )}

          <View
            style={[
              styles.sparringCard,
              { backgroundColor: theme.liveSoft, borderColor: theme.live },
            ]}
          >
            <View style={styles.sparringTop}>
              <View style={styles.sparringCopy}>
                <ThemedText type="section" maxFontSizeMultiplier={1.2}>
                  {t('home.sparring')}
                </ThemedText>
                <ThemedText type="small" maxFontSizeMultiplier={1.35}>
                  {t('home.sparringSub')}
                </ThemedText>
              </View>
              <Waveform color={theme.live} />
            </View>
            <TalkButton
              label={t('today.startTalking')}
              leading={(
                <SymbolView
                  name={{ ios: 'mic.fill', android: 'mic', web: 'mic' }}
                  size={20}
                  weight={SYMBOL_WEIGHT}
                  tintColor={theme.onLive}
                />
              )}
              onPress={() => {
                haptic.light();
                router.push('/sparring');
              }}
            />
          </View>

          <View style={styles.tiles}>
            <HomeTile
              icon={{ ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' }}
              title={t('iv.modeDue')}
              meta={t('home.todaySub')}
              onPress={() => router.push('/today')}
            />
            <HomeTile
              icon={{ ios: 'rectangle.stack.fill', android: 'view_carousel', web: 'view_carousel' }}
              title={t('today.myClips')}
              meta={clipMeta}
              onPress={() => router.push('/videos')}
            />
            <HomeTile
              icon={{ ios: 'scope', android: 'gps_fixed', web: 'gps_fixed' }}
              title={t('home.weakSpots')}
              meta={t('home.weakSpotsSub')}
              onPress={() => router.push('/weak')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function Waveform({ color }: { color: string }) {
  return (
    <View style={styles.waveform} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {WAVEFORM_HEIGHTS.map((height, index) => (
        <View key={`${height}-${index}`} style={[styles.waveBar, { backgroundColor: color, height }]} />
      ))}
    </View>
  );
}

function HomeTile({
  icon,
  title,
  meta,
  onPress,
}: {
  icon: SymbolName;
  title: string;
  meta: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Card
      style={styles.tile}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      accessibilityLabel={`${title}. ${meta}`}
    >
      <View style={[styles.tileIcon, { backgroundColor: theme.primarySoft }]}>
        <SymbolView name={icon} size={20} weight={SYMBOL_WEIGHT} tintColor={theme.primary} />
      </View>
      <ThemedText type="smallBold" numberOfLines={2} maxFontSizeMultiplier={1.25}>
        {title}
      </ThemedText>
      <ThemedText
        type="label"
        themeColor="textSecondary"
        numberOfLines={2}
        maxFontSizeMultiplier={1.2}
      >
        {meta}
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 20, gap: 16, paddingBottom: 32 },
  head: { gap: 4, marginTop: 4 },
  streakCard: { minHeight: 150, gap: 14, padding: 20 },
  streakLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 },
  streakLoading: {
    minHeight: 66,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  streakStats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 16,
    position: 'relative',
    zIndex: 1,
  },
  streakNumber: { fontSize: 62, lineHeight: 66, fontVariant: ['tabular-nums'] },
  duePill: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 6 },
  sparringCard: {
    gap: 18,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sparringTop: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  sparringCopy: { flex: 1, gap: 4 },
  waveform: { height: 40, flexDirection: 'row', alignItems: 'center', gap: 3 },
  waveBar: { width: 4, borderRadius: 999 },
  tiles: { flexDirection: 'row', gap: 10 },
  tile: { flex: 1, minHeight: 138, gap: 10, padding: 12 },
  tileIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
