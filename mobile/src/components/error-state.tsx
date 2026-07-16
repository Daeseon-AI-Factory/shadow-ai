import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import semiBoldSymbolWeight from 'expo-symbols/androidWeights/semiBold';

import { ThemedText } from './themed-text';
import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

/**
 * "Something went wrong — try again" block. Every failed fetch should offer a retry instead of a
 * dead red string (or worse, silently spinning). Pass the query's refetch as onRetry.
 */
export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.iconWrap, { backgroundColor: '#dc26261a' }]}>
        <SymbolView
          name={{ ios: 'exclamationmark.triangle.fill', android: 'error', web: 'error' }}
          size={28}
          weight={{ ios: 'semibold', android: semiBoldSymbolWeight }}
          tintColor="#dc2626"
        />
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        {t('common.errorTitle')}
      </ThemedText>
      {message ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.body} numberOfLines={3}>
          {message}
        </ThemedText>
      ) : null}
      {onRetry ? (
        <Pressable
          style={[styles.retry, { borderColor: theme.primary }]}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={t('common.retry')}
        >
          <ThemedText style={[styles.retryText, { color: theme.primary }]}>{t('common.retry')}</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 56, gap: 10 },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: { textAlign: 'center' },
  body: { textAlign: 'center', lineHeight: 20 },
  retry: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  retryText: { fontWeight: '800', fontSize: 15 },
});
