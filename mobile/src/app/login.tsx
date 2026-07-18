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

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useAuthStore((s) => s.signIn);

  const login = useMutation({
    mutationFn: () => authApi.login({ email: email.trim(), password }),
    onSuccess: async (res) => {
      await signIn(res.accessToken);
      router.replace('/');
    },
  });

  const errorMessage =
    login.error instanceof ApiError ? login.error.message : login.error ? t('login.failed') : null;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <ThemedText type="title">{t('login.title')}</ThemedText>
            <ThemedText type="small">{t('login.subtitle')}</ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('login.email')}
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
              placeholder={t('login.password')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              secureTextEntry
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            <Pressable
              style={pressableStyle([
                styles.button,
                (!email || !password) && styles.buttonDisabled,
              ])}
              android_ripple={pressableRipple}
              disabled={!email || !password || login.isPending}
              onPress={() => login.mutate()}
            >
              {login.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>{t('login.signIn')}</ThemedText>
              )}
            </Pressable>

            <Pressable
              style={pressableStyle(styles.linkRow)}
              android_ripple={pressableRipple}
              onPress={() => router.replace('/signup')}
            >
              <ThemedText type="small">{t('login.newHere')} </ThemedText>
              <ThemedText style={styles.link}>{t('login.createAccount')}</ThemedText>
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
