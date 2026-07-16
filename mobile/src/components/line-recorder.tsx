import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

import { ThemedText } from '@/components/themed-text';
import { t } from '@/lib/i18n';

/**
 * On-device shadowing recorder for the video screen. Records your take of the currently-looped line,
 * then lets you A/B it: play YOUR take vs the ORIGINAL line, back to back. No upload, no clip — the
 * value is the immediate self-comparison. (Saving to the account stays in the clip player's RecordPanel.)
 *
 * @param onPlayOriginal called when the user taps "Original" — the parent seeks the YouTube player
 *        to the looped line and plays it once.
 * @param disabled true when no single line is loop-selected (recording a moving target makes no sense).
 */
export function LineRecorder({
  onPlayOriginal,
  disabled,
}: {
  onPlayOriginal: () => void;
  disabled: boolean;
}) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);
  const [takeUri, setTakeUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const player = useAudioPlayer(takeUri ? { uri: takeUri } : undefined);

  // Drop any held take if recording becomes impossible (no line selected).
  useEffect(() => {
    if (disabled) setTakeUri(null);
  }, [disabled]);

  const start = async () => {
    const perm = await AudioModule.requestRecordingPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(t('record.micDeniedTitle'), t('record.micDeniedBody'), [
        { text: t('record.micDeniedCancel'), style: 'cancel' },
        { text: t('record.micDeniedOpen'), onPress: () => void Linking.openSettings() },
      ]);
      return;
    }
    setBusy(true);
    try {
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
    } finally {
      setBusy(false);
    }
  };

  const stop = async () => {
    await recorder.stop();
    // Leave record mode so playback routes to the loudspeaker, not the iOS earpiece.
    await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
    if (recorder.uri) setTakeUri(recorder.uri);
  };

  const playTake = () => {
    if (!takeUri) return;
    player.seekTo(0);
    player.play();
  };

  const recording = state.isRecording;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {recording ? (
          <Pressable style={[styles.btn, styles.stop]} onPress={stop}>
            <ThemedText style={styles.btnText}>■ {t('rec.stop')}</ThemedText>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.btn, styles.rec, disabled && styles.disabled]}
            disabled={disabled || busy}
            onPress={start}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.btnText}>🎙 {t('rec.record')}</ThemedText>
            )}
          </Pressable>
        )}

        <Pressable
          style={[styles.btn, styles.compare, !takeUri && styles.disabled]}
          disabled={!takeUri}
          onPress={playTake}
        >
          <ThemedText style={styles.btnTextDark}>▶ {t('rec.mine')}</ThemedText>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.compare, disabled && styles.disabled]}
          disabled={disabled}
          onPress={onPlayOriginal}
        >
          <ThemedText style={styles.btnTextDark}>▶ {t('rec.original')}</ThemedText>
        </Pressable>
      </View>
      {disabled && (
        <ThemedText type="small" style={styles.hint}>
          {t('rec.pickLine')}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 8, gap: 6 },
  row: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  btn: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, alignItems: 'center', minWidth: 86 },
  rec: { backgroundColor: '#dc2626' },
  stop: { backgroundColor: '#111827' },
  compare: { borderWidth: StyleSheet.hairlineWidth, borderColor: '#9ca3af' },
  disabled: { opacity: 0.4 },
  btnText: { color: '#fff', fontWeight: '700' },
  btnTextDark: { fontWeight: '700' },
  hint: { textAlign: 'center', color: '#6b7280' },
});
