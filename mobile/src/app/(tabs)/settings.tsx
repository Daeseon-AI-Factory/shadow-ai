import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, ApiError, reviewApi, practiceApi, clipsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { pressableRipple, pressableStyle, useTheme } from '@/hooks/use-theme';
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
          <View style={styles.statsCard}>
            <ThemedText type="smallBold" style={styles.statsTitle}>{t('me.statsTitle')}</ThemedText>
            <View style={styles.statsGrid}>
              {stats.map((s) => (
                <View key={s.label} style={styles.statTile}>
                  <ThemedText style={styles.statNum}>{s.n}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{s.label}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {me.data && (
            <View style={styles.box}>
              <View style={styles.row}>
                <View style={me.data.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                  <ThemedText style={styles.badgeText}>
                    {me.data.plan === 'pro' ? t('settings.planPro') : t('settings.planFree')}
                  </ThemedText>
                </View>
                <ThemedText type="small">{me.data.email}</ThemedText>
              </View>
            </View>
          )}

          <View style={styles.box}>
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
            <Pressable
              style={pressableStyle([
                styles.saveBtn,
                (!displayName.trim() ||
                  profile.isPending ||
                  displayName.trim() === me.data?.displayName) &&
                  styles.disabled,
              ])}
              android_ripple={pressableRipple}
              disabled={
                !displayName.trim() || profile.isPending || displayName.trim() === me.data?.displayName
              }
              onPress={() => profile.mutate()}
            >
              {profile.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.saveText}>{t('settings.save')}</ThemedText>
              )}
            </Pressable>
          </View>

          <View style={styles.box}>
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
            <Pressable
              style={pressableStyle([
                styles.saveBtn,
                (!currentPassword || newPassword.length < 8 || changePw.isPending) && styles.disabled,
              ])}
              android_ripple={pressableRipple}
              disabled={!currentPassword || newPassword.length < 8 || changePw.isPending}
              onPress={() => changePw.mutate()}
            >
              {changePw.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.saveText}>{t('settings.changePassword')}</ThemedText>
              )}
            </Pressable>
          </View>

          <Pressable
            style={pressableStyle(styles.signOut)}
            android_ripple={pressableRipple}
            onPress={() => signOut()}
          >
            <ThemedText style={styles.signOutText}>{t('settings.signOut')}</ThemedText>
          </Pressable>

          <View style={styles.danger}>
            <ThemedText type="smallBold" style={styles.dangerTitle}>
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
              style={pressableStyle([
                styles.deleteBtn,
                (!password || del.isPending) && styles.disabled,
              ])}
              android_ripple={pressableRipple}
              disabled={!password || del.isPending}
              onPress={confirmDelete}
            >
              {del.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.deleteText}>{t('settings.deleteMyAccount')}</ThemedText>
              )}
            </Pressable>
          </View>

          <View style={styles.legal}>
            <Pressable
              style={pressableStyle(undefined)}
              android_ripple={pressableRipple}
              onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/terms')}
            >
              <ThemedText style={styles.link}>{t('settings.terms')}</ThemedText>
            </Pressable>
            <Pressable
              style={pressableStyle(undefined)}
              android_ripple={pressableRipple}
              onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/privacy')}
            >
              <ThemedText style={styles.link}>{t('settings.privacy')}</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 16 },
  statsCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 12,
  },
  statsTitle: { opacity: 0.7 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statTile: { alignItems: 'center', gap: 2, flex: 1 },
  statNum: { fontSize: 24, lineHeight: 28, fontWeight: '900', color: '#208AEF' },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  proBadge: { backgroundColor: '#208AEF', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  freeBadge: { backgroundColor: '#9ca3af', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  signOut: { paddingVertical: 12 },
  signOutText: { color: '#208AEF', fontWeight: '600', fontSize: 16 },
  danger: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc262655',
    backgroundColor: '#dc26260a',
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  dangerTitle: { color: '#dc2626' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  deleteBtn: { backgroundColor: '#dc2626', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  disabled: { opacity: 0.5 },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  saveBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  legal: { flexDirection: 'row', gap: 18, paddingTop: 8 },
  link: { color: '#9ca3af', fontWeight: '600' },
});
