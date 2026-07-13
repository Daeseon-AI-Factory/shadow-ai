import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { authApi, ApiError } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { pressableRipple, pressableStyle, useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function SignupScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useAuthStore((s) => s.signIn);

  const signup = useMutation({
    mutationFn: () =>
      authApi.signup({ email: email.trim(), password, displayName: displayName.trim() }),
    onSuccess: async (res) => {
      await signIn(res.accessToken);
      // Fresh accounts go through onboarding once; returning logins skip straight to Today.
      router.replace('/onboarding');
    },
  });

  const errorMessage =
    signup.error instanceof ApiError ? signup.error.message : signup.error ? t('signup.failed') : null;

  const canSubmit = email.trim() && password.length >= 8 && displayName.trim();

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <ThemedText type="title">{t('signup.title')}</ThemedText>
            <ThemedText type="small">{t('signup.subtitle')}</ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('signup.email')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
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
              placeholder={t('signup.displayName')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              autoComplete="name"
              value={displayName}
              onChangeText={setDisplayName}
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
              placeholder={t('signup.password')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              secureTextEntry
              autoComplete="new-password"
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            <Pressable
              style={pressableStyle([styles.button, !canSubmit && styles.buttonDisabled])}
              android_ripple={pressableRipple}
              disabled={!canSubmit || signup.isPending}
              onPress={() => signup.mutate()}
            >
              {signup.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>{t('signup.createAccount')}</ThemedText>
              )}
            </Pressable>

            <Pressable
              style={pressableStyle(styles.linkRow)}
              android_ripple={pressableRipple}
              onPress={() => router.replace('/login')}
            >
              <ThemedText type="small">{t('signup.haveAccount')} </ThemedText>
              <ThemedText style={styles.link}>{t('signup.signIn')}</ThemedText>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, gap: 14, justifyContent: 'center' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: { color: '#dc2626' },
  button: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  link: { color: '#208AEF', fontWeight: '700' },
});
