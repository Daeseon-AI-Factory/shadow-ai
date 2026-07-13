import { Colors, type Theme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Compatibility exports for existing screens. New shared components import the
// helper directly so theme selection and interaction feedback stay separate.
export { pressableRipple, pressableStyle } from '@/components/pressable-feedback';

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme ?? 'light'];
}
