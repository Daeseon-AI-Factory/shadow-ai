import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import {
  practiceApi,
  type SparringReportTarget,
} from '@shadow-ai/core';

import { PrimaryButton } from '@/components/talk-button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

type SessionSummaryTone = 'primary' | 'mint' | 'amber' | 'live';

export type SessionSummaryMetric = {
  id: string;
  value: number | string;
  label: string;
  tone?: SessionSummaryTone;
};

type SessionSummaryProps = {
  title: string;
  metrics: readonly SessionSummaryMetric[];
  streak?: number | null;
  confirmLabel: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  children?: ReactNode;
};

export function SessionSummary({
  title,
  metrics,
  streak,
  confirmLabel,
  confirmDisabled = false,
  onConfirm,
  children,
}: SessionSummaryProps) {
  const theme = useTheme();
  const displayedMetrics: SessionSummaryMetric[] = [
    ...metrics,
    ...(streak === undefined
      ? []
      : [{ id: 'streak', value: `🔥 ${streak ?? '—'}`, label: t('sessionSummary.streak'), tone: 'amber' as const }]),
  ];
  const summaryLabel = displayedMetrics
    .map((metric) => `${metric.value} ${metric.label}`)
    .join(', ');
  const toneColors = {
    primary: { color: theme.primary, background: theme.primarySoft },
    mint: { color: theme.mint, background: theme.mintSoft },
    amber: { color: theme.amber, background: theme.backgroundSelected },
    live: { color: theme.live, background: theme.liveSoft },
  } satisfies Record<SessionSummaryTone, { color: string; background: string }>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={[styles.checkmark, { backgroundColor: theme.primary }]}>
          <ThemedText style={[styles.checkmarkText, { color: theme.onPrimary }]}>✓</ThemedText>
        </View>
        <ThemedText type="label" themeColor="textSecondary">
          {t('sessionSummary.kicker')}
        </ThemedText>
        <ThemedText accessibilityRole="header" type="display" style={styles.title}>
          {title}
        </ThemedText>
      </View>

      <View
        accessible
        accessibilityLabel={summaryLabel}
        accessibilityRole="summary"
        style={styles.metrics}
      >
        {displayedMetrics.map((metric) => {
          const tone = toneColors[metric.tone ?? 'primary'];
          return (
            <View
              key={metric.id}
              style={[
                styles.metric,
                { backgroundColor: tone.background, borderColor: tone.color },
              ]}
            >
              <ThemedText type="section" style={{ color: tone.color }}>
                {metric.value}
              </ThemedText>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {metric.label}
              </ThemedText>
            </View>
          );
        })}
      </View>

      {children ? <View style={styles.details}>{children}</View> : null}

      <PrimaryButton
        disabled={confirmDisabled}
        onPress={onConfirm}
        style={styles.confirmButton}
      >
        {confirmLabel}
      </PrimaryButton>
    </ScrollView>
  );
}

type SparringSessionSummaryProps = {
  userTurns: readonly string[];
  targets: readonly SparringReportTarget[];
  detectedUsed: number;
  confirmLabel: string;
  onConfirm: () => void;
  children?: ReactNode;
};

function reportPayloadIsValid(
  userTurns: readonly string[],
  targets: readonly SparringReportTarget[],
) {
  return (
    userTurns.length > 0 &&
    userTurns.length <= 40 &&
    userTurns.every((turn) => turn.trim().length > 0 && turn.length <= 2_000) &&
    targets.length > 0 &&
    targets.length <= 12 &&
    targets.every(
      (target) =>
        target.cardKey.trim().length > 0 &&
        target.cardKey.length <= 120 &&
        target.label.trim().length > 0 &&
        target.label.length <= 80 &&
        (target.ko === null || target.ko === undefined || target.ko.length <= 120),
    )
  );
}

export function SparringSessionSummary({
  userTurns,
  targets,
  detectedUsed,
  confirmLabel,
  onConfirm,
  children,
}: SparringSessionSummaryProps) {
  const canRequestReport = reportPayloadIsValid(userTurns, targets);
  const report = useQuery({
    queryKey: ['sparring-report', userTurns, targets],
    queryFn: () =>
      practiceApi.sparringReport(
        [...userTurns],
        targets.map((target) => ({ ...target })),
      ),
    enabled: canRequestReport,
    retry: false,
    staleTime: Infinity,
  });
  const fallbackUsed = Math.min(Math.max(0, detectedUsed), targets.length);
  const used = report.data?.usedTargets.length ?? fallbackUsed;
  const missed = report.data?.missedTargets.length ?? Math.max(0, targets.length - fallbackUsed);
  const reportNote = report.data
    ? t('sessionSummary.reportReady')
    : canRequestReport && report.isFetching
      ? t('sessionSummary.reportLoading')
      : t('sessionSummary.reportFallback');

  return (
    <SessionSummary
      title={t('sessionSummary.sparringTitle')}
      metrics={[
        {
          id: 'turns',
          value: userTurns.length,
          label: t('sessionSummary.turns'),
          tone: 'primary',
        },
        {
          id: 'used',
          value: used,
          label: t('sessionSummary.used'),
          tone: 'mint',
        },
        {
          id: 'missed',
          value: missed,
          label: t('sessionSummary.missed'),
          tone: 'live',
        },
      ]}
      confirmLabel={confirmLabel}
      onConfirm={onConfirm}
    >
      <ThemedText type="small" themeColor="textSecondary" style={styles.reportNote}>
        {reportNote}
      </ThemedText>
      {children}
    </SessionSummary>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
  },
  checkmark: {
    alignItems: 'center',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    marginBottom: 4,
    width: 72,
  },
  checkmarkText: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 44,
  },
  title: {
    textAlign: 'center',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metric: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    flexBasis: 96,
    flexGrow: 1,
    gap: 2,
    minWidth: 88,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  details: {
    gap: 10,
  },
  reportNote: {
    textAlign: 'center',
  },
  confirmButton: {
    alignSelf: 'stretch',
    marginTop: 4,
  },
});
