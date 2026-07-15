import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { Card } from '@/components/card';
import { Skeleton } from '@/components/skeleton';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

// APPROX product boundary: the motivation spec says "evening" without an exact hour.
export const EVENING_START_HOUR = 18;

const NUDGE_KEY_PREFIX = 'home.streak-risk.v1';

export function isStreakAtRisk({
  localHour,
  repsToday,
  streak,
}: {
  localHour: number;
  repsToday: number;
  streak: number;
}): boolean {
  return localHour >= EVENING_START_HOUR && repsToday === 0 && streak > 0;
}

type MasterySummaryProps = {
  mastered: number;
  total: number;
  repsToday: number;
  streak: number;
  localDate: string;
  userId?: string;
  nudgeEligible: boolean;
};

export function MasterySummary({
  mastered,
  total,
  repsToday,
  streak,
  localDate,
  userId,
  nudgeEligible,
}: MasterySummaryProps) {
  const theme = useTheme();
  const progress = total > 0 ? Math.min(100, Math.max(0, (mastered / total) * 100)) : 0;
  const [showNudge, setShowNudge] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setShowNudge(false);

      if (!nudgeEligible || !userId) {
        return () => {
          active = false;
        };
      }

      const key = `${NUDGE_KEY_PREFIX}.${userId}`;
      void SecureStore.getItemAsync(key)
        .then(async (lastShownDate) => {
          if (!active || lastShownDate === localDate) return;
          // Record before rendering. If persistence fails, suppress the nudge rather than risk
          // showing the same retention prompt repeatedly on later visits.
          await SecureStore.setItemAsync(key, localDate);
          if (active) setShowNudge(true);
        })
        .catch(() => {
          if (active) setShowNudge(false);
        });

      return () => {
        active = false;
        setShowNudge(false);
      };
    }, [localDate, nudgeEligible, userId]),
  );

  return (
    <View style={styles.wrap}>
      <Card style={styles.card}>
        <View style={styles.headingRow}>
          <ThemedText type="label" style={{ color: theme.primary }} maxFontSizeMultiplier={1.35}>
            {t('home.masteryTitle')}
          </ThemedText>
          <View style={styles.countRow}>
            <ThemedText type="section" style={styles.numeric} maxFontSizeMultiplier={1.2}>
              {mastered}
            </ThemedText>
            <ThemedText
              type="smallBold"
              themeColor="textSecondary"
              style={styles.numeric}
              maxFontSizeMultiplier={1.25}
            >
              {t('home.masteryTotal', { total })}
            </ThemedText>
          </View>
        </View>

        <View
          style={[styles.track, { backgroundColor: theme.primarySoft }]}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={t('home.masteryA11y', {
            reps: repsToday,
            streak,
            mastered,
            total,
          })}
          accessibilityValue={{ min: 0, max: total, now: mastered }}
        >
          <View style={[styles.fill, { backgroundColor: theme.primary, width: `${progress}%` }]} />
        </View>

        <ThemedText
          type="smallBold"
          themeColor="textSecondary"
          style={styles.numeric}
          maxFontSizeMultiplier={1.3}
        >
          {t('home.todayRhythm', { reps: repsToday, streak })}
        </ThemedText>
      </Card>

      {showNudge ? (
        <ThemedText
          type="smallBold"
          style={[styles.nudge, styles.numeric, { color: theme.text }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.2}
        >
          {t('home.streakAtRisk', { days: streak })}
        </ThemedText>
      ) : null}
    </View>
  );
}

export function MasterySummarySkeleton() {
  return (
    <Card style={styles.loadingCard} accessible accessibilityLabel={t('home.masteryLoading')}>
      <Skeleton style={styles.loadingLabel} />
      <Skeleton style={styles.loadingCount} />
      <Skeleton style={styles.loadingTrack} />
    </Card>
  );
}

export function MasterySummaryUnavailable({ onRetry }: { onRetry: () => void }) {
  return (
    <Card
      style={styles.unavailableCard}
      onPress={onRetry}
      accessibilityLabel={`${t('home.masteryUnavailable')}. ${t('common.retry')}`}
    >
      <ThemedText type="smallBold">{t('home.masteryUnavailable')}</ThemedText>
      <ThemedText type="label" themeColor="primary">
        {t('common.retry')}
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  card: { gap: 12, padding: 16 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  countRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  numeric: { fontVariant: ['tabular-nums'] },
  track: { height: 8, borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
  nudge: { paddingHorizontal: 4 },
  loadingCard: { minHeight: 116, gap: 14, padding: 16 },
  loadingLabel: { width: 72, height: 14 },
  loadingCount: { width: 132, height: 28 },
  loadingTrack: { height: 8 },
  unavailableCard: { minHeight: 92, gap: 8, padding: 16, justifyContent: 'center' },
});
