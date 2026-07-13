/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const PRESSED_STYLE = { opacity: 0.72 } satisfies ViewStyle;

export const pressableRipple = {
  color: 'rgba(9, 106, 232, 0.18)',
} satisfies NonNullable<PressableProps['android_ripple']>;

export function pressableStyle(
  style: StyleProp<ViewStyle>,
): (state: PressableStateCallbackType) => StyleProp<ViewStyle> {
  return ({ pressed }) => [style, pressed && PRESSED_STYLE];
}

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}
