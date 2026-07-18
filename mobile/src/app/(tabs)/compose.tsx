import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { COLLOCATIONS, practiceApi, ApiError } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { pressableRipple, pressableStyle, useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

// Targets to compose around: each collocation anchor + its gloss.
const TARGETS = COLLOCATIONS.map((c) => ({ target: c.anchor, gloss: c.gloss }));

function pickIndex(): number {
  return Math.floor(Math.random() * TARGETS.length);
}

export default function ComposeScreen() {
  const theme = useTheme();
  const token = useAuthStore((s) => s.token);
  const [idx, setIdx] = useState(() => pickIndex());
  const [text, setText] = useState('');
  const current = useMemo(() => TARGETS[idx], [idx]);

  const check = useMutation({
    mutationFn: () => practiceApi.composeCheck(current.target, current.gloss, text.trim()),
  });

  if (!token) return <Redirect href="/login" />;

  const fb = check.data;
  const inviteOnly =
    check.error instanceof ApiError &&
    check.error.status === 403 &&
    check.error.code === 'AI_NOT_ALLOWED';
  const errorMessage = check.error && !inviteOnly ? t('compose.checkFailed') : null;

  const next = () => {
    setIdx(pickIndex());
    setText('');
    check.reset();
  };

  if (inviteOnly) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex} edges={['bottom']}>
          <View style={styles.inviteScreen}>
            <View
              style={[
                styles.inviteCard,
                { backgroundColor: theme.backgroundSelected, borderColor: theme.amber },
              ]}
            >
              <ThemedText style={styles.inviteIcon}>🔒</ThemedText>
              <ThemedText type="title" style={styles.inviteTitle}>
                {t('aiInvite.title')}
              </ThemedText>
              <ThemedText type="small" style={styles.inviteBody}>
                {t('aiInvite.body')}
              </ThemedText>
              <Pressable
                style={[styles.inviteButton, { backgroundColor: theme.primary }]}
                onPress={() => router.replace('/practice')}
                accessibilityRole="button"
              >
                <ThemedText style={[styles.inviteButtonText, { color: theme.onPrimary }]}>
                  {t('aiInvite.freePractice')}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <ThemedText type="title">{t('compose.title')}</ThemedText>
            <ThemedText type="small">{t('compose.subtitle')}</ThemedText>

            <View
              style={[
                styles.targetBox,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
              ]}
            >
              <ThemedText type="small">{t('compose.useThis')}</ThemedText>
              <ThemedText style={[styles.target, { color: theme.primary }]}>{current.target}</ThemedText>
              <ThemedText type="small">{current.gloss}</ThemedText>
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('compose.inputPlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              multiline
              value={text}
              onChangeText={setText}
            />

            {errorMessage && <ThemedText style={{ color: theme.live }}>{errorMessage}</ThemedText>}

            {fb && (
              <View
                style={[
                  styles.fbBox,
                  {
                    backgroundColor: fb.ok ? theme.mintSoft : theme.backgroundSelected,
                    borderColor: fb.ok ? theme.mint : theme.amber,
                  },
                ]}
              >
                <ThemedText type="smallBold">
                  {fb.ok ? t('compose.good') : t('compose.needsWork')}
                  {!fb.usesTarget ? t('compose.targetNotUsed') : ''}
                </ThemedText>
                <ThemedText type="small">{fb.feedback}</ThemedText>
                {fb.better ? (
                  <ThemedText style={styles.better}>{t('compose.better', { text: fb.better })}</ThemedText>
                ) : null}
              </View>
            )}

            <View style={styles.row}>
              <Pressable
                style={pressableStyle([
                  styles.primaryBtn,
                  { backgroundColor: theme.primary },
                  (!text.trim() || check.isPending) && styles.disabled,
                ])}
                android_ripple={pressableRipple}
                disabled={!text.trim() || check.isPending}
                onPress={() => check.mutate()}
                accessibilityRole="button"
                accessibilityLabel={t('compose.check')}
              >
                {check.isPending ? (
                  <ActivityIndicator color={theme.onPrimary} />
                ) : (
                  <ThemedText style={[styles.primaryText, { color: theme.onPrimary }]}>
                    {t('compose.check')}
                  </ThemedText>
                )}
              </Pressable>
              <Pressable
                style={pressableStyle([styles.secondaryBtn, { borderColor: theme.border }])}
                android_ripple={pressableRipple}
                onPress={next}
                accessibilityRole="button"
                accessibilityLabel={t('compose.next')}
              >
                <ThemedText style={styles.secondaryText}>{t('compose.next')}</ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 14 },
  targetBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  target: { fontSize: 22, fontFamily: Fonts.mono },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  fbBox: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 6 },
  better: { fontStyle: 'italic' },
  inviteScreen: { flex: 1, justifyContent: 'center', padding: 24 },
  inviteCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  inviteIcon: { fontSize: 34 },
  inviteTitle: { textAlign: 'center' },
  inviteBody: { textAlign: 'center', lineHeight: 20 },
  inviteButton: {
    alignSelf: 'stretch',
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  inviteButtonText: { fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12, marginTop: 4 },
  primaryBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  primaryText: { fontWeight: '700', fontSize: 16 },
  secondaryBtn: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryText: { fontWeight: '600' },
});
