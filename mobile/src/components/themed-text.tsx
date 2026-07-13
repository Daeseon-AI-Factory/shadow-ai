import { Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { Fonts, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextType =
  | 'display'
  | 'section'
  | 'body'
  | 'label'
  | 'mono'
  // Compatibility aliases used by screens that other redesign tracks own.
  | 'default'
  | 'title'
  | 'small'
  | 'smallBold'
  | 'subtitle'
  | 'link'
  | 'linkPrimary'
  | 'code';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const colorToken = themeColor ?? (type === 'linkPrimary' ? 'primary' : 'text');

  return (
    <Text
      style={[
        { color: theme[colorToken] },
        typeStyles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: 800,
    letterSpacing: -0.8,
  },
  // RN 0.85 only accepts 100-step weights. 700 preserves the intended
  // hierarchy below display; passing 750 falls back to regular at runtime.
  section: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 700,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: Platform.select({ android: 700 }) ?? 600,
    letterSpacing: 0.4,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 700,
  },
  link: {
    fontSize: 14,
    lineHeight: 30,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});

const typeStyles = {
  display: styles.display,
  section: styles.section,
  body: styles.body,
  label: styles.label,
  mono: styles.label,
  default: styles.default,
  title: styles.title,
  subtitle: styles.subtitle,
  small: styles.small,
  smallBold: styles.smallBold,
  link: styles.link,
  linkPrimary: styles.link,
  code: styles.code,
} satisfies Record<ThemedTextType, TextStyle>;
