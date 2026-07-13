/**
 * Semantic colors shared by every MiMi surface.
 *
 * Brand colors have one job each: primary is study, live is speaking/recording,
 * mint is a learner-produced target, amber is streak progress, and ink is the
 * studio ground. Components should consume these names instead of raw colors.
 */

import '@/global.css';

import { Platform } from 'react-native';

export type ThemeTokens = {
  text: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  textSecondary: string;
  border: string;
  surfaceRaised: string;
  primary: string;
  primaryStrong: string;
  primarySoft: string;
  onPrimary: string;
  live: string;
  liveSoft: string;
  onLive: string;
  mint: string;
  mintSoft: string;
  onMint: string;
  amber: string;
  onAmber: string;
  ink: string;
  pressed: string;
  /** @deprecated Use `mint`. Kept until the redesign tracks migrate every consumer. */
  accent: string;
  /** @deprecated Use `mintSoft`. */
  accentSoft: string;
  /** @deprecated Use `live`. */
  coral: string;
};

const light = {
  text: '#102033',
  background: '#F6FAFF',
  backgroundElement: '#FFFFFF',
  backgroundSelected: '#E5F0FF',
  textSecondary: '#66758A',
  border: '#D7E4F2',
  surfaceRaised: '#FFFFFF',
  primary: '#096AE8',
  primaryStrong: '#034EBC',
  primarySoft: '#E1EFFF',
  onPrimary: '#FFFFFF',
  live: '#FF744D',
  liveSoft: '#FFE6DF',
  onLive: '#0A1420',
  mint: '#12BFB9',
  mintSoft: '#DDF8F6',
  onMint: '#0A1420',
  amber: '#F5A623',
  onAmber: '#0A1420',
  ink: '#0A1420',
  pressed: 'rgba(10, 20, 32, 0.08)',
  accent: '#12BFB9',
  accentSoft: '#DDF8F6',
  coral: '#FF744D',
} as const satisfies ThemeTokens;

const dark = {
  text: '#F8FBFF',
  background: '#07111F',
  backgroundElement: '#111D2D',
  backgroundSelected: '#183455',
  textSecondary: '#AAB8C9',
  border: '#26394F',
  surfaceRaised: '#101A28',
  primary: '#52A0FF',
  primaryStrong: '#7EBDFF',
  primarySoft: '#102C4F',
  onPrimary: '#07111F',
  live: '#FF8A64',
  liveSoft: '#2A1712',
  onLive: '#07111F',
  mint: '#25D3CD',
  mintSoft: '#0F3A3C',
  onMint: '#07111F',
  amber: '#F2B23C',
  onAmber: '#07111F',
  ink: '#0A1420',
  pressed: 'rgba(248, 251, 255, 0.12)',
  accent: '#25D3CD',
  accentSoft: '#0F3A3C',
  coral: '#FF8A64',
} as const satisfies ThemeTokens;

export const Colors = { light, dark } as const;

export type ThemeName = keyof typeof Colors;
export type Theme = (typeof Colors)[ThemeName];
export type ThemeColor = keyof Theme;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
