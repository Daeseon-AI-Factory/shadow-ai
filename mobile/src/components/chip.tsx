import { forwardRef, type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type View,
} from 'react-native';

import { createPressableRipple, usePressableFeedback } from '@/components/pressable-feedback';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type ChipTone = 'neutral' | 'primary' | 'live' | 'mint' | 'amber';

export type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  tone?: ChipTone;
  selected?: boolean;
  style?: PressableProps['style'];
  textStyle?: StyleProp<TextStyle>;
};

export const Chip = forwardRef<View, ChipProps>(function Chip(
  {
    tone = 'neutral',
    selected = false,
    style,
    textStyle,
    children,
    onFocus,
    onBlur,
    android_ripple,
    accessibilityRole,
    accessibilityState,
    disabled = false,
    focusable,
    hitSlop,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const isDisabled = disabled === true;
  const colors = {
    neutral: {
      background: selected ? theme.backgroundSelected : theme.backgroundElement,
      border: selected ? theme.primary : theme.border,
      text: selected ? theme.text : theme.textSecondary,
    },
    primary: {
      background: selected ? theme.primary : theme.primarySoft,
      border: theme.primary,
      text: selected ? theme.onPrimary : theme.text,
    },
    live: {
      background: selected ? theme.live : theme.liveSoft,
      border: theme.live,
      text: selected ? theme.onLive : theme.text,
    },
    mint: {
      background: selected ? theme.mint : theme.mintSoft,
      border: theme.mint,
      text: selected ? theme.onMint : theme.text,
    },
    amber: {
      background: selected ? theme.amber : theme.backgroundElement,
      border: theme.amber,
      text: selected ? theme.onAmber : theme.text,
    },
  }[tone];
  const feedback = usePressableFeedback({
    disabled: isDisabled,
    focusRingColor: theme.primary,
    onFocus,
    onBlur,
    pressedScale: 0.97,
    style: (state) => [
      styles.chip,
      { backgroundColor: colors.background, borderColor: colors.border },
      typeof style === 'function' ? style(state) : style,
    ],
  });

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{ ...accessibilityState, disabled: isDisabled, selected }}
      android_ripple={android_ripple ?? createPressableRipple(theme.pressed)}
      disabled={isDisabled}
      focusable={isDisabled ? false : focusable}
      hitSlop={hitSlop ?? 4}
      onBlur={feedback.onBlur}
      onFocus={feedback.onFocus}
      ref={ref}
      style={feedback.style}
    >
      <ThemedText type="label" style={[{ color: colors.text }, textStyle]}>
        {children}
      </ThemedText>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});
