import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, ApiError, reviewApi, practiceApi, clipsApi } from '@shadow-ai/core';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import {
  createPressableRipple,
  usePressableFeedback,
} from '@/components/pressable-feedback';
import { PrimaryButton } from '@/components/talk-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function SettingsScreen() {
  const theme = useTheme();
  const token = useAuthStore((s) => s.token);
  const signOut = useAuthStore((s) => s.signOut);
  const qc = useQueryClient();
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const me = useQuery({ queryKey: ['me'], queryFn: () => authApi.me(), enabled: !!token });
  // "What I've built" stats — all from existing endpoints, no new backend.
  const streak = useQuery({ queryKey: ['streak'], queryFn: () => reviewApi.streak(), enabled: !!token });
  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });
  const clipCount = useQuery({
    queryKey: ['clips', 'count'],
    queryFn: () => clipsApi.list({ size: 1 }),
    enabled: !!token,
  });

  // Seed the name field once the profile loads.
  useEffect(() => {
    if (me.data?.displayName && displayName === '') setDisplayName(me.data.displayName);
  }, [me.data?.displayName, displayName]);

  const profile = useMutation({
    mutationFn: () => authApi.updateProfile({ displayName: displayName.trim() }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
      Alert.alert(t('settings.savedTitle'), t('settings.savedMsg'));
    },
    onError: (e) =>
      Alert.alert(t('settings.failedTitle'), e instanceof ApiError ? e.message : t('settings.saveError')),
  });

  const changePw = useMutation({
    mutationFn: () => authApi.changePassword({ currentPassword, newPassword }),
    onSuccess: () => {
      setCurrentPassword('');
      setNewPassword('');
      Alert.alert(t('settings.doneTitle'), t('settings.pwChangedMsg'));
    },
    onError: (e) =>
      Alert.alert(t('settings.failedTitle'), e instanceof ApiError ? e.message : t('settings.pwChangeError')),
  });

  const del = useMutation({
    mutationFn: () => authApi.deleteAccount(password),
    onSuccess: async () => {
      await signOut();
      router.replace('/login');
    },
    onError: (e) =>
      Alert.alert(
        t('settings.deleteFailedTitle'),
        e instanceof ApiError ? e.message : t('settings.deleteError'),
      ),
  });
  const deleteDisabled = !password || del.isPending;
  const deleteFeedback = usePressableFeedback({
    disabled: deleteDisabled,
    focusRingColor: theme.textSecondary,
    style: [styles.deleteBtn, { backgroundColor: theme.backgroundSelected }],
  });

  if (!token) return <Redirect href="/login" />;

  const confirmDelete = () => {
    Alert.alert(
      t('settings.deleteConfirmTitle'),
      t('settings.deleteConfirmMsg'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        { text: t('settings.delete'), style: 'destructive', onPress: () => del.mutate() },
      ],
    );
  };

  const srsList = srs.data ?? [];
  const stats = [
    { n: streak.data?.streakDays ?? 0, label: t('me.streakDays') },
    { n: clipCount.data?.total ?? 0, label: t('me.clips') },
    { n: srsList.filter((s) => s.box >= 5).length, label: t('me.mastered') },
    { n: srsList.length, label: t('me.seen') },
  ];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">{t('nav.settings')}</ThemedText>

          {/* What I've built — a sense of advancement, from existing data. */}
          <Card style={styles.sectionCard}>
            <ThemedText type="smallBold" style={styles.statsTitle}>{t('me.statsTitle')}</ThemedText>
            <View style={styles.statsGrid}>
              {stats.map((s) => (
                <View key={s.label} style={styles.statTile}>
                  <ThemedText style={[styles.statNum, { color: theme.primary }]}>{s.n}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{s.label}</ThemedText>
                </View>
              ))}
            </View>
          </Card>

          {me.data && (
            <Card style={styles.sectionCard}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.planBadge,
                    {
                      backgroundColor:
                        me.data.plan === 'pro' ? theme.primary : theme.backgroundSelected,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.badgeText,
                      { color: me.data.plan === 'pro' ? theme.onPrimary : theme.text },
                    ]}
                  >
                    {me.data.plan === 'pro' ? t('settings.planPro') : t('settings.planFree')}
                  </ThemedText>
                </View>
                <ThemedText type="small">{me.data.email}</ThemedText>
              </View>
            </Card>
          )}

          <Card style={styles.sectionCard}>
            <ThemedText type="smallBold">{t('settings.displayName')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              value={displayName}
              onChangeText={setDisplayName}
              maxLength={80}
              placeholder={t('settings.namePlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
            />
            <PrimaryButton
              accessibilityLabel={t('settings.save')}
              accessibilityState={{ busy: profile.isPending }}
              style={styles.saveBtn}
              disabled={
                !displayName.trim() || profile.isPending || displayName.trim() === me.data?.displayName
              }
              onPress={() => profile.mutate()}
            >
              {profile.isPending ? (
                <ActivityIndicator color={theme.onPrimary} />
              ) : (
                t('settings.save')
              )}
            </PrimaryButton>
          </Card>

          <Card style={styles.sectionCard}>
            <ThemedText type="smallBold">{t('settings.changePassword')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('settings.currentPwPlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              secureTextEntry
              autoComplete="current-password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('settings.newPwPlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              secureTextEntry
              autoComplete="new-password"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <PrimaryButton
              accessibilityLabel={t('settings.changePassword')}
              accessibilityState={{ busy: changePw.isPending }}
              style={styles.saveBtn}
              disabled={!currentPassword || newPassword.length < 8 || changePw.isPending}
              onPress={() => changePw.mutate()}
            >
              {changePw.isPending ? (
                <ActivityIndicator color={theme.onPrimary} />
              ) : (
                t('settings.changePassword')
              )}
            </PrimaryButton>
          </Card>

          <Card
            style={[styles.sectionCard, styles.signOutCard]}
            onPress={() => signOut()}
            accessibilityLabel={t('settings.signOut')}
          >
            <ThemedText style={styles.signOutText} themeColor="primary">
              {t('settings.signOut')}
            </ThemedText>
          </Card>

          <Card style={[styles.sectionCard, styles.danger]}>
            <ThemedText type="smallBold">
              {t('settings.deleteAccount')}
            </ThemedText>
            <ThemedText type="small">
              {t('settings.deleteDescription')}
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('settings.confirmPwPlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              secureTextEntry
              autoComplete="current-password"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              accessibilityLabel={t('settings.deleteMyAccount')}
              accessibilityRole="button"
              accessibilityState={{ busy: del.isPending, disabled: deleteDisabled }}
              android_ripple={createPressableRipple(theme.pressed)}
              disabled={deleteDisabled}
              onBlur={deleteFeedback.onBlur}
              onFocus={deleteFeedback.onFocus}
              onPress={confirmDelete}
              style={deleteFeedback.style}
            >
              {del.isPending ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                <ThemedText style={styles.deleteText}>
                  {t('settings.deleteMyAccount')}
                </ThemedText>
              )}
            </Pressable>
          </Card>

          <View style={styles.legal}>
            <Chip
              tone="neutral"
              style={styles.legalChip}
              onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/terms')}
            >
              {t('settings.terms')}
            </Chip>
            <Chip
              tone="neutral"
              style={styles.legalChip}
              onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/privacy')}
            >
              {t('settings.privacy')}
            </Chip>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 16 },
  sectionCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    gap: 12,
  },
  statsTitle: { opacity: 0.7 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statTile: { alignItems: 'center', gap: 2, flex: 1 },
  statNum: { fontSize: 24, lineHeight: 28, fontWeight: '900' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  planBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  signOutCard: { minHeight: 56, justifyContent: 'center' },
  signOutText: { fontWeight: '700', fontSize: 16 },
  danger: {
    borderWidth: 1,
    gap: 10,
    marginTop: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  deleteBtn: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  deleteText: { fontSize: 16, fontWeight: '800' },
  saveBtn: { marginTop: 2 },
  legal: { flexDirection: 'row', gap: 18, paddingTop: 8 },
  legalChip: { minHeight: 44 },
});
