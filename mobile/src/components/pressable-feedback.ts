import { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  type ColorValue,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';

const DEFAULT_PRESSED_OPACITY = 0.82;
const DEFAULT_PRESSED_SCALE = 0.98;
const DISABLED_OPACITY = 0.48;

export type PressableStyle = PressableProps['style'];

export type PressableStyleOptions = {
  disabled?: boolean;
  pressedOpacity?: number;
  pressedScale?: number;
};

export type PressableFeedbackOptions = PressableStyleOptions & {
  style?: PressableStyle;
  focusRingColor: ColorValue;
  onFocus?: PressableProps['onFocus'];
  onBlur?: PressableProps['onBlur'];
};

function resolveStyle(
  style: PressableStyle,
  state: PressableStateCallbackType,
): StyleProp<ViewStyle> {
  return typeof style === 'function' ? style(state) : style;
}

function scaledTransform(style: StyleProp<ViewStyle>, scale: number): ViewStyle['transform'] {
  const transform = StyleSheet.flatten(style)?.transform;

  // RN 0.85 parses CSS transform strings on every platform, so append scale
  // without discarding a consumer's existing string transform.
  if (typeof transform === 'string') {
    return `${transform} scale(${scale})`;
  }

  return [...(transform ?? []), { scale }];
}

export function pressableStyle(
  style: PressableStyle,
  {
    disabled = false,
    pressedOpacity = DEFAULT_PRESSED_OPACITY,
    pressedScale = DEFAULT_PRESSED_SCALE,
  }: PressableStyleOptions = {},
): (state: PressableStateCallbackType) => StyleProp<ViewStyle> {
  return (state) => {
    const baseStyle = resolveStyle(style, state);

    return [
      baseStyle,
      state.pressed &&
        !disabled && {
          opacity: pressedOpacity,
          transform: scaledTransform(baseStyle, pressedScale),
        },
      disabled && styles.disabled,
    ];
  };
}

export function createPressableRipple(
  color: ColorValue,
): NonNullable<PressableProps['android_ripple']> {
  return { color, borderless: false };
}

/** @deprecated Use `createPressableRipple(theme.pressed)` for scheme-aware feedback. */
export const pressableRipple = createPressableRipple(Colors.light.pressed);

export function usePressableFeedback({
  style,
  focusRingColor,
  disabled = false,
  pressedOpacity,
  pressedScale,
  onFocus,
  onBlur,
}: PressableFeedbackOptions) {
  const [focused, setFocused] = useState(false);

  const handleFocus: NonNullable<PressableProps['onFocus']> = useCallback(
    (event) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur: NonNullable<PressableProps['onBlur']> = useCallback(
    (event) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const feedbackStyle = useMemo(
    () => pressableStyle(style, { disabled, pressedOpacity, pressedScale }),
    [disabled, pressedOpacity, pressedScale, style],
  );

  const composedStyle = useCallback(
    (state: PressableStateCallbackType): StyleProp<ViewStyle> => [
      feedbackStyle(state),
      focused && !disabled && {
        outlineColor: focusRingColor,
        outlineOffset: 2,
        outlineStyle: 'solid',
        outlineWidth: 3,
      },
    ],
    [disabled, feedbackStyle, focusRingColor, focused],
  );

  return { style: composedStyle, onFocus: handleFocus, onBlur: handleBlur } as const;
}

const styles = StyleSheet.create({
  disabled: { opacity: DISABLED_OPACITY },
});
