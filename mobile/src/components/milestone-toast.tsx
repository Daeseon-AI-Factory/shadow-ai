import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { milestoneDeviceStorage } from '@/lib/milestone-device-storage';
import {
  acknowledgeMilestone,
  claimMilestone,
  releaseMilestoneClaim,
  type MilestoneId,
} from '@/lib/milestone-storage';
import { t } from '@/lib/i18n';

const ENTER_DURATION_MS = 160;
const VISIBLE_DURATION_MS = 2_200;
const EXIT_DURATION_MS = 180;

type MilestoneToastProps = {
  enabled: boolean;
  userId?: string;
  mastered?: number;
  streak?: number;
  refreshKey?: number;
};

const MESSAGE_KEYS: Record<MilestoneId, string> = {
  'mastery-100': 'milestone.mastery100',
  'streak-7': 'milestone.streak7',
  'streak-30': 'milestone.streak30',
  'streak-100': 'milestone.streak100',
  'first-sparring': 'milestone.firstSparring',
};

export function MilestoneToast({
  enabled,
  userId,
  mastered,
  streak,
  refreshKey = 0,
}: MilestoneToastProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const [activeMilestone, setActiveMilestone] = useState<MilestoneId | null>(null);
  const [claimSequence, setClaimSequence] = useState(0);
  const activeRef = useRef<MilestoneId | null>(null);
  const activeUserIdRef = useRef<string | null>(null);
  const acknowledgingRef = useRef<{ milestone: MilestoneId; userId: string } | null>(null);
  const acknowledgedRef = useRef<{ milestone: MilestoneId; userId: string } | null>(null);
  const drainAfterAcknowledgeRef = useRef(false);
  const mountedRef = useRef(true);
  const enabledRef = useRef(enabled);
  const userIdRef = useRef(userId);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.98);
  enabledRef.current = enabled;
  userIdRef.current = userId;
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (
        activeRef.current &&
        activeUserIdRef.current &&
        (
          acknowledgingRef.current?.milestone !== activeRef.current ||
          acknowledgingRef.current.userId !== activeUserIdRef.current
        )
      ) {
        releaseMilestoneClaim(activeUserIdRef.current, activeRef.current);
      }
      activeRef.current = null;
      activeUserIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled || !userId || mastered === undefined || streak === undefined || activeRef.current) {
      return;
    }
    void claimMilestone(milestoneDeviceStorage, userId, { mastered, streak })
      .then((milestone) => {
        if (!milestone) return;
        if (
          !mountedRef.current ||
          !enabledRef.current ||
          userIdRef.current !== userId ||
          activeRef.current
        ) {
          releaseMilestoneClaim(userId, milestone);
          return;
        }
        activeRef.current = milestone;
        activeUserIdRef.current = userId;
        acknowledgedRef.current = null;
        drainAfterAcknowledgeRef.current = false;
        setActiveMilestone(milestone);
      })
      .catch(() => {
        // A failed receipt write must not show a toast that could repeat after restart.
      });
  }, [claimSequence, enabled, mastered, refreshKey, streak, userId]);

  useEffect(() => {
    if (
      !activeRef.current ||
      (enabled && activeUserIdRef.current === userId)
    ) {
      return;
    }
    const milestone = activeRef.current;
    const milestoneUserId = activeUserIdRef.current;
    const acknowledgement = acknowledgingRef.current;
    if (
      milestoneUserId &&
      (
        acknowledgement?.milestone !== milestone ||
        acknowledgement.userId !== milestoneUserId
      )
    ) {
      releaseMilestoneClaim(milestoneUserId, milestone);
    }
    activeRef.current = null;
    activeUserIdRef.current = null;
    setActiveMilestone(null);
  }, [enabled, userId]);

  const handleToastLayout = useCallback(() => {
    const milestone = activeRef.current;
    const milestoneUserId = activeUserIdRef.current;
    if (!milestone || !milestoneUserId || acknowledgingRef.current || acknowledgedRef.current) {
      return;
    }

    // Layout is the presentation boundary: a blur before this point keeps the persisted receipt,
    // while a blur during the write waits for the serialized acknowledgement to finish.
    const acknowledgement = { milestone, userId: milestoneUserId };
    acknowledgingRef.current = acknowledgement;
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(
        `${t('milestone.title')}. ${t(MESSAGE_KEYS[milestone])}`,
      );
    }
    void acknowledgeMilestone(milestoneDeviceStorage, milestoneUserId, milestone)
      .then(() => {
        if (
          acknowledgingRef.current?.milestone === milestone &&
          acknowledgingRef.current.userId === milestoneUserId
        ) {
          acknowledgingRef.current = null;
          acknowledgedRef.current = acknowledgement;
        }
        if (drainAfterAcknowledgeRef.current) {
          drainAfterAcknowledgeRef.current = false;
          acknowledgedRef.current = null;
          if (mountedRef.current && enabledRef.current) {
            setClaimSequence((value) => value + 1);
          }
        }
      })
      .catch(() => {
        releaseMilestoneClaim(milestoneUserId, milestone);
        acknowledgingRef.current = null;
        acknowledgedRef.current = null;
        drainAfterAcknowledgeRef.current = false;
        if (
          mountedRef.current &&
          activeRef.current === milestone &&
          activeUserIdRef.current === milestoneUserId
        ) {
          activeRef.current = null;
          activeUserIdRef.current = null;
          setActiveMilestone(null);
        }
      });
  }, []);

  useEffect(() => {
    if (!activeMilestone || !enabled) {
      opacity.value = 0;
      scale.value = 0.98;
      return;
    }

    cancelAnimation(opacity);
    cancelAnimation(scale);
    if (reduceMotion) {
      opacity.value = 1;
      scale.value = 1;
    } else {
      opacity.value = withTiming(1, { duration: ENTER_DURATION_MS });
      scale.value = withTiming(1, { duration: ENTER_DURATION_MS });
    }

    let clearTimer: ReturnType<typeof setTimeout> | null = null;
    const hideTimer = setTimeout(() => {
      const clear = () => {
        const milestone = activeRef.current;
        const milestoneUserId = activeUserIdRef.current;
        activeRef.current = null;
        activeUserIdRef.current = null;
        setActiveMilestone(null);
        if (
          milestone &&
          milestoneUserId &&
          acknowledgedRef.current?.milestone === milestone &&
          acknowledgedRef.current.userId === milestoneUserId
        ) {
          acknowledgedRef.current = null;
          setClaimSequence((value) => value + 1);
        } else if (
          milestone &&
          milestoneUserId &&
          acknowledgingRef.current?.milestone === milestone &&
          acknowledgingRef.current.userId === milestoneUserId
        ) {
          drainAfterAcknowledgeRef.current = true;
        } else if (milestone && milestoneUserId) {
          releaseMilestoneClaim(milestoneUserId, milestone);
        }
      };
      if (reduceMotion) {
        clear();
        return;
      }
      opacity.value = withTiming(0, { duration: EXIT_DURATION_MS });
      clearTimer = setTimeout(clear, EXIT_DURATION_MS);
    }, VISIBLE_DURATION_MS);

    return () => {
      clearTimeout(hideTimer);
      if (clearTimer) clearTimeout(clearTimer);
      cancelAnimation(opacity);
      cancelAnimation(scale);
    };
  }, [activeMilestone, enabled, opacity, reduceMotion, scale]);

  if (!activeMilestone || !enabled) return null;

  const message = t(MESSAGE_KEYS[activeMilestone]);
  return (
    <Animated.View
      accessible
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      accessibilityLabel={`${t('milestone.title')}. ${message}`}
      onLayout={handleToastLayout}
      pointerEvents="none"
      style={[
        styles.toast,
        {
          backgroundColor: theme.surfaceRaised,
          borderColor: theme.mint,
        },
        animatedStyle,
      ]}
    >
      <View style={[styles.icon, { backgroundColor: theme.mintSoft }]}>
        <SymbolView
          name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
          size={20}
          tintColor={theme.mint}
        />
      </View>
      <View style={styles.copy}>
        <ThemedText type="label" style={{ color: theme.mint }}>
          {t('milestone.title')}
        </ThemedText>
        <ThemedText type="smallBold">{message}</ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    zIndex: 20,
    elevation: 6,
    minHeight: 72,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 2 },
});
