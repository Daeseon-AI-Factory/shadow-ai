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
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  videosApi,
  ApiError,
  type TranscriptSegment,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { pressableRipple, pressableStyle, useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import {
  YoutubeTranscriptWebView,
  type DeviceTranscriptResult,
} from '@/lib/youtube-transcript-webview';

export default function ImportScreen() {
  const theme = useTheme();
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  // Discover deep-links here with a ?url= to prefill (tap a curated video to import it).
  const params = useLocalSearchParams<{ url?: string }>();
  const [url, setUrl] = useState(params.url ?? '');
  const [deviceFetchUrl, setDeviceFetchUrl] = useState<string | null>(null);
  const [deviceError, setDeviceError] = useState<string | null>(null);

  const importVideo = useMutation({
    mutationFn: (request: {
      sourceUrl: string;
      transcriptSegments?: TranscriptSegment[];
      title?: string;
    }) =>
      videosApi.importByUrl(request.sourceUrl, {
        transcriptSegments: request.transcriptSegments,
        title: request.title,
      }),
    onSuccess: (v) => {
      // The video is saved (auto-added to the user's library server-side). Land on the video
      // detail screen — full transcript, tap-to-seek, and clip from any line — instead of forcing
      // a single clip. The video stays in "My Videos" to reopen anytime.
      qc.invalidateQueries({ queryKey: ['library', 'videos'] });
      router.replace(`/video/${v.id}`);
    },
  });

  if (!token) return <Redirect href="/login" />;

  const importError =
    importVideo.error instanceof ApiError
      ? importVideo.error.message
      : importVideo.error
        ? t('import.importFailed')
        : null;
  const isImporting = importVideo.isPending || deviceFetchUrl !== null;

  const startImport = () => {
    const trimmed = url.trim();
    if (!trimmed || isImporting) return;
    setDeviceError(null);
    setDeviceFetchUrl(trimmed);
  };

  const handleDeviceTranscript = (result: DeviceTranscriptResult) => {
    const sourceUrl = deviceFetchUrl ?? url.trim();
    setDeviceFetchUrl(null);
    if (result.ok && result.segments.length > 0) {
      setDeviceError(null);
      importVideo.mutate({
        sourceUrl,
        transcriptSegments: result.segments,
        title: result.title,
      });
      return;
    }
    setDeviceError(result.ok ? 'device transcript returned no segments' : result.error);
    importVideo.mutate({ sourceUrl });
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            {deviceFetchUrl && (
              <YoutubeTranscriptWebView
                url={deviceFetchUrl}
                onResult={handleDeviceTranscript}
              />
            )}

            <ThemedText type="title">{t('import.title')}</ThemedText>
            <ThemedText type="small">{t('import.subtitle')}</ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
              placeholder={t('import.urlPlaceholder')}
              placeholderTextColor={theme.textSecondary}
              selectionColor={theme.primary}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              value={url}
              onChangeText={setUrl}
            />

            {importError && <ThemedText style={styles.error}>{importError}</ThemedText>}
            {deviceError && __DEV__ && (
              <ThemedText type="small" style={styles.error}>
                device transcript: {deviceError}
              </ThemedText>
            )}

            <Pressable
              style={pressableStyle([
                styles.primaryBtn,
                (!url.trim() || isImporting) && styles.disabled,
              ])}
              android_ripple={pressableRipple}
              disabled={!url.trim() || isImporting}
              onPress={startImport}
            >
              {isImporting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryText}>{t('import.importBtn')}</ThemedText>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mt: { marginTop: 16 },
  container: { flex: 1, padding: 24, gap: 14, justifyContent: 'center' },
  resultHeader: { padding: 24, paddingBottom: 8, gap: 4 },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: 8 },
  line: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 14,
  },
  empty: { textAlign: 'center', marginTop: 24 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: { color: '#dc2626' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
