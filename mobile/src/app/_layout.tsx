import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, router, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';

import { t } from '@/lib/i18n';
import { bootstrapApi } from '@/lib/api';
import { queryClient, setUnauthorizedHandler } from '@/lib/query-client';
import { useAuthStore } from '@/lib/auth-store';
import { loadToken } from '@/lib/secure-token';

// Configure the shared API client once, before any screen renders.
bootstrapApi();

const SCREENSHOT_FLOW = process.env.EXPO_PUBLIC_SCREENSHOT_FLOW === '1';
const SCREENSHOT_ROUTE = process.env.EXPO_PUBLIC_SCREENSHOT_ROUTE;
const SCREENSHOT_ROUTES = ['/', '/videos', '/practice', '/review', '/settings', '/import'] as const;
const SCREENSHOT_ROUTE_START_MS = 2500;
const SCREENSHOT_ROUTE_INTERVAL_MS = 8000;

// On any 401 (expired / revoked JWT), sign out and route to login — registered here to keep
// the query-client module free of an auth-store import cycle.
setUnauthorizedHandler(() => {
  useAuthStore.getState().signOut();
  router.replace('/login');
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hydrate = useAuthStore((s) => s.hydrate);
  const hydrated = useAuthStore((s) => s.hydrated);

  // Read the persisted JWT once at startup so a returning user skips the login screen.
  useEffect(() => {
    loadToken().then((token) => hydrate(token));
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    if (SCREENSHOT_ROUTE) {
      const timer = setTimeout(() => router.replace(SCREENSHOT_ROUTE as never), 800);
      return () => clearTimeout(timer);
    }
    if (!SCREENSHOT_FLOW) return;
    const timers = SCREENSHOT_ROUTES.map((route, index) =>
      setTimeout(() => router.replace(route as never), SCREENSHOT_ROUTE_START_MS + index * SCREENSHOT_ROUTE_INTERVAL_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [hydrated]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!hydrated ? (
          // Hold every route until the token is loaded. Without this, a cold-start deep link
          // mounts a sub-screen before hydration and bounces a logged-in user to /login.
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            {/* Home / My Videos / Review / Practice / Settings live in the (tabs) group's own
                bottom-tab navigator. Everything below is pushed on top of the tab bar. */}
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" options={{ presentation: 'modal' }} />
            <Stack.Screen name="signup" options={{ presentation: 'modal' }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="gym" options={{ headerShown: true, title: t('nav.gym') }} />
            <Stack.Screen name="collocations" options={{ headerShown: true, title: t('nav.collocations') }} />
            <Stack.Screen name="verbs" options={{ headerShown: true, title: t('nav.verbs') }} />
            <Stack.Screen name="english-patterns" options={{ headerShown: true, title: t('nav.dailyPatterns') }} />
            <Stack.Screen name="phrasal-500" options={{ headerShown: true, title: t('nav.phrasal500') }} />
            <Stack.Screen name="it-patterns" options={{ headerShown: true, title: t('nav.itPatterns') }} />
            <Stack.Screen name="it-terms" options={{ headerShown: true, title: t('nav.itTerms') }} />
            <Stack.Screen name="ai-coding" options={{ headerShown: true, title: t('nav.aiCoding') }} />
            <Stack.Screen name="mix" options={{ headerShown: true, title: t('nav.mix') }} />
            <Stack.Screen name="story" options={{ headerShown: true, title: t('nav.story') }} />
            <Stack.Screen name="today" options={{ headerShown: true, title: t('nav.today') }} />
            <Stack.Screen name="sparring" options={{ headerShown: true, title: t('nav.sparring') }} />
            <Stack.Screen name="compose" options={{ headerShown: true, title: t('nav.compose') }} />
            <Stack.Screen name="weak" options={{ headerShown: true, title: t('nav.weak') }} />
            <Stack.Screen name="prepositions" options={{ headerShown: true, title: t('nav.prepositions') }} />
            <Stack.Screen name="video/[id]" options={{ headerShown: true, title: t('nav.video') }} />
            <Stack.Screen name="import" options={{ headerShown: true, title: t('nav.import') }} />
            <Stack.Screen name="discover" options={{ headerShown: true, title: t('nav.discover') }} />
            <Stack.Screen name="discover/[slug]" options={{ headerShown: true, title: t('nav.collection') }} />
            <Stack.Screen name="player/[clipId]" options={{ headerShown: true, title: t('nav.clip') }} />
            {/* Drills run as full-screen pushes so iOS swipe-back works; their own header handles exit. */}
            <Stack.Screen name="interview-run" options={{ headerShown: false }} />
            <Stack.Screen name="pattern-run" options={{ headerShown: true, title: t('nav.practice') }} />
          </Stack>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
