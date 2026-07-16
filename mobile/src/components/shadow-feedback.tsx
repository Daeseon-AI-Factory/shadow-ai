import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { t } from '@/lib/i18n';
import { diffWords } from '@/lib/word-diff';

/**
 * Shadowing feedback — closes the app's biggest hole: RecordPanel could only record + play back,
 * so the learner never knew if their shadowing was right. This sends the just-recorded audio to
 * the existing STT endpoint (practiceApi.transcribe → text), then diffs that against the clip's
 * own transcript CLIENT-side (the shared word-diff), surfacing exactly which words the learner
 * dropped or mangled. Reuses codex's transcription pipeline — no new backend, no new dependency.
 *
 * Cost note: each tap is one paid STT call, so it is strictly opt-in (a button), never automatic.
 */
export function ShadowFeedback({ uri, target }: { uri: string; target?: string | null }) {
  const [text, setText] = useState<string | null>(null);

  const transcribe = useMutation({
    mutationFn: () =>
      practiceApi.transcribe({ uri, name: 'shadow.m4a', type: 'audio/mp4' }),
    onSuccess: (res) => setText(res.text),
  });

  const diff = useMemo(
    () => (text && target ? diffWords(target, text) : null),
    [text, target],
  );

  // Nothing to grade against → the diff would be meaningless, so don't offer it.
  if (!target || target.trim().split(/\s+/).length < 2) return null;

  if (text === null) {
    return (
      <View style={styles.gap}>
        <Pressable
          style={[styles.checkBtn, transcribe.isPending && styles.disabled]}
          disabled={transcribe.isPending}
          onPress={() => transcribe.mutate()}
        >
          {transcribe.isPending ? (
            <View style={styles.row}>
              <ActivityIndicator size="small" color="#208AEF" />
              <ThemedText style={styles.checkText}>{t('shadow.checking')}</ThemedText>
            </View>
          ) : (
            <ThemedText style={styles.checkText}>{t('shadow.check')}</ThemedText>
          )}
        </Pressable>
        {transcribe.isError ? (
          <ThemedText type="small" style={styles.errorText}>
            {(transcribe.error as Error)?.message || t('shadow.failed')}
          </ThemedText>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.result}>
      {diff ? (
        <ThemedText type="small" style={styles.score}>
          🎯 {t('shadow.score', { n: diff.matchedCount, total: diff.total })}
        </ThemedText>
      ) : null}

      <View style={styles.section}>
        <ThemedText type="small" style={styles.label}>{t('shadow.heard')}</ThemedText>
        <ThemedText style={styles.heard}>{text}</ThemedText>
      </View>

      {diff ? (
        <View style={styles.section}>
          <ThemedText type="small" style={styles.label}>{t('shadow.target')}</ThemedText>
          <View style={styles.diff}>
            {diff.ref.map((w, i) => (
              <ThemedText key={i} style={[styles.word, !w.matched && styles.wordMissed]}>
                {w.word}
              </ThemedText>
            ))}
          </View>
        </View>
      ) : null}

      <Pressable
        style={styles.againBtn}
        onPress={() => {
          setText(null);
          transcribe.reset();
        }}
      >
        <ThemedText style={styles.againText}>{t('shadow.again')}</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  disabled: { opacity: 0.6 },
  gap: { gap: 6 },
  errorText: { color: '#dc2626' },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  checkText: { color: '#208AEF', fontWeight: '700' },
  result: { gap: 10, marginTop: 2 },
  score: { color: '#059669', fontWeight: '700' },
  section: { gap: 4 },
  label: { color: '#6b7280', textTransform: 'uppercase', fontSize: 11 },
  heard: { fontStyle: 'italic', color: '#6b7280' },
  diff: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  word: { fontFamily: Fonts.mono, fontSize: 14, marginRight: 6, marginBottom: 2 },
  wordMissed: { color: '#dc2626', textDecorationLine: 'underline' },
  againBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  againText: { fontWeight: '600' },
});
