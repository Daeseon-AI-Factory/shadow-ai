import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import semiBoldSymbolWeight from 'expo-symbols/androidWeights/semiBold';

import { ThemedText } from './themed-text';
import { useTheme } from '@/hooks/use-theme';

type Action = { label: string; onPress: () => void };

/**
 * A reusable "nothing here yet — here's what to do" block. Every empty list should offer the next
 * action instead of a dead end (e.g. no videos → "Import a video"). Keeps first-run screens from
 * looking broken.
 */
export function EmptyState({
  icon,
  title,
  body,
  primary,
  secondary,
}: {
  icon: SymbolViewProps['name'];
  title: string;
  body?: string;
  primary?: Action;
  secondary?: Action;
}) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.iconWrap, { backgroundColor: theme.primarySoft }]}>
        <SymbolView
          name={icon}
          size={30}
          weight={{ ios: 'semibold', android: semiBoldSymbolWeight }}
          tintColor={theme.primary}
        />
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {body ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.body}>
          {body}
        </ThemedText>
      ) : null}
      {primary ? (
        <Pressable
          style={[styles.primary, { backgroundColor: theme.primary }]}
          onPress={primary.onPress}
          accessibilityRole="button"
          accessibilityLabel={primary.label}
        >
          <ThemedText style={styles.primaryText}>{primary.label}</ThemedText>
        </Pressable>
      ) : null}
      {secondary ? (
        <Pressable
          style={styles.secondary}
          onPress={secondary.onPress}
          accessibilityRole="button"
          accessibilityLabel={secondary.label}
        >
          <ThemedText style={[styles.secondaryText, { color: theme.primary }]}>
            {secondary.label}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 64, gap: 10 },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: { textAlign: 'center' },
  body: { textAlign: 'center', lineHeight: 20 },
  primary: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  secondary: { minHeight: 44, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  secondaryText: { fontWeight: '700', fontSize: 14 },
});
