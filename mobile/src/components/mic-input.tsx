import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { useMutation } from '@tanstack/react-query';
import { uploadAsync, FileSystemUploadType } from 'expo-file-system/legacy';

import { ThemedText } from '@/components/themed-text';
import { getApiBaseUrl } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

// Whisper hallucinates stock phrases when it's fed silence / no clear speech — most infamously
// "Thank you for watching" (it was trained on YouTube). Treat these (and near-empty output) as
// "no speech" so the learner gets a retry prompt instead of garbage.
const HALLUCINATIONS = new Set([
  'thank you', 'thank you for watching', 'thanks for watching', 'thank you very much',
  'thank you so much', 'please subscribe', 'subscribe', 'you', 'bye', "i'm sorry",
  'so', 'the', 'okay', 'ok', 'thanks', 'thank you.',
]);
function looksHallucinated(raw: string): boolean {
  const n = raw.toLowerCase().replace(/[.!?]+$/g, '').trim();
  if (n.length < 2) return true;
  if (HALLUCINATIONS.has(n)) return true;
  if (/^[\[(].*[\])]$/.test(n)) return true; // "[music]", "(upbeat music)"
  return false;
}

const MIN_MS = 900; // recordings shorter than this are almost always an accidental tap → silence

/**
 * Tap-to-talk → record audio → upload → Whisper (Groq) transcription. Records via the system mic
 * (AirPods used automatically when connected). Guards against Whisper's silence-hallucination and
 * too-short taps so a bad clip prompts a retry instead of transcribing "Thank you for watching".
 */
export function MicInput({ onText }: { onText: (text: string) => void }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);

  const transcribe = useMutation({
    // Native multipart upload via expo-file-system — RN's fetch FormData can't send a file-URI part.
    mutationFn: async (uri: string) => {
      const token = useAuthStore.getState().token;
      const res = await uploadAsync(`${getApiBaseUrl()}/api/practice/transcribe`, uri, {
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: 'audio/m4a',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`HTTP ${res.status}`);
      }
      const env = JSON.parse(res.body) as { data?: { text?: string }; error?: { message?: string } };
      if (env.error) throw new Error(env.error.message || 'transcribe error');
      return env.data?.text ?? '';
    },
    onSuccess: (text) => {
      if (looksHallucinated(text)) setError(t('mic.noSpeech'));
      else onText(text);
    },
    onError: () => setError(t('mic.error')),
  });

  const start = async () => {
    setError(null);
    try {
      const perm = await AudioModule.requestRecordingPermissionsAsync();
      if (!perm.granted) {
        setError(t('mic.denied'));
        Alert.alert(t('record.micDeniedTitle'), t('record.micDeniedBody'), [
          { text: t('record.micDeniedCancel'), style: 'cancel' },
          { text: t('record.micDeniedOpen'), onPress: () => void Linking.openSettings() },
        ]);
        return;
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      startedAt.current = Date.now();
      setRecording(true);
    } catch {
      setError(t('mic.error'));
      setRecording(false);
    }
  };

  const stop = async () => {
    setRecording(false);
    const elapsed = Date.now() - startedAt.current;
    try {
      await recorder.stop();
    } catch {
      setError(t('mic.error'));
      return;
    } finally {
      try {
        await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      } catch {
        // A reset failure should not discard a completed take or trap the UI in recording state.
      }
    }
    if (elapsed < MIN_MS) {
      setError(t('mic.tooShort'));
      return;
    }
    const uri = recorder.uri;
    if (!uri) {
      setError(t('mic.error'));
      return;
    }
    transcribe.mutate(uri);
  };

  const busy = transcribe.isPending;
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.btn, recording && styles.btnOn, busy && styles.disabled]}
        disabled={busy}
        onPress={() => (recording ? stop() : start())}
      >
        {busy ? (
          <ActivityIndicator color="#208AEF" />
        ) : (
          <ThemedText style={recording ? styles.btnOnText : styles.btnText}>
            {recording ? t('mic.listening') : t('mic.tap')}
          </ThemedText>
        )}
      </Pressable>
      {busy ? <ThemedText type="small" style={styles.hint}>{t('mic.transcribing')}</ThemedText> : null}
      {error ? <ThemedText style={styles.err}>{error}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  btn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#208AEF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnOn: { backgroundColor: '#dc2626', borderColor: '#dc2626' },
  disabled: { opacity: 0.6 },
  btnText: { color: '#208AEF', fontWeight: '700' },
  btnOnText: { color: '#fff', fontWeight: '700' },
  hint: { textAlign: 'center', opacity: 0.7 },
  err: { color: '#dc2626', textAlign: 'center' },
});
