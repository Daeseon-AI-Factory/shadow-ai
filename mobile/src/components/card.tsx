import { forwardRef } from 'react';
import { Pressable, StyleSheet, type PressableProps, type View } from 'react-native';

import { createPressableRipple, usePressableFeedback } from '@/components/pressable-feedback';
import { useTheme } from '@/hooks/use-theme';

export type CardAccent = 'primary' | 'live' | 'mint' | 'amber';

export type CardProps = Omit<PressableProps, 'style'> & {
  accent?: CardAccent;
  selected?: boolean;
  style?: PressableProps['style'];
};

export const Card = forwardRef<View, CardProps>(function Card(
  {
    accent = 'primary',
    selected,
    style,
    children,
    onPress,
    onLongPress,
    onFocus,
    onBlur,
    android_ripple,
    accessibilityRole,
    accessibilityState,
    disabled = false,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const interactive = Boolean(
    onPress ||
      onLongPress ||
      rest.onPressIn ||
      rest.onPressOut ||
      rest.onPressMove ||
      rest.onHoverIn ||
      rest.onHoverOut ||
      onFocus ||
      onBlur,
  );
  const isDisabled = disabled === true;
  const isSelected = selected === true;
  const selectedBackground = {
    primary: theme.primarySoft,
    live: theme.liveSoft,
    mint: theme.mintSoft,
    amber: theme.backgroundSelected,
  }[accent];
  const accentColor = theme[accent];
  const feedback = usePressableFeedback({
    disabled: isDisabled,
    focusRingColor: theme.primary,
    onFocus,
    onBlur,
    pressedScale: 0.99,
    style: (state) => [
      styles.card,
      {
        backgroundColor: isSelected ? selectedBackground : theme.surfaceRaised,
        borderColor: isSelected ? accentColor : theme.border,
      },
      typeof style === 'function' ? style(state) : style,
    ],
  });

  return (
    <Pressable
      {...rest}
      accessibilityRole={interactive ? (accessibilityRole ?? 'button') : accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        disabled: isDisabled,
        ...(selected === undefined ? {} : { selected: isSelected }),
      }}
      accessible={rest.accessible ?? interactive}
      android_ripple={
        interactive ? (android_ripple ?? createPressableRipple(theme.pressed)) : undefined
      }
      disabled={!interactive || isDisabled}
      focusable={isDisabled ? false : (rest.focusable ?? interactive)}
      onBlur={feedback.onBlur}
      onFocus={feedback.onFocus}
      onLongPress={onLongPress}
      onPress={onPress}
      ref={ref}
      style={feedback.style}
    >
      {children}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
  },
});
