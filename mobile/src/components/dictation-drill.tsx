import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { haptic } from '@/lib/haptics';
import { t } from '@/lib/i18n';
import { diffWords, splitWords } from '@/lib/word-diff';

/**
 * The "decode" pillar — train real LISTENING on the learner's own clip. The clip's transcript
 * is the answer key, but it stays HIDDEN: loop the audio, type what you hear, then check. A
 * word-level LCS diff reveals the transcript with the words you MISSED in red, so you see exactly
 * what your ear dropped (the schwa, the linked "kind-of", the swallowed "to"). Pure client-side —
 * reuses the transcript already on the clip, no STT/AI/backend. Replaces the old always-visible
 * transcript box (which spoiled the listen), and sits FIRST so it isn't spoiled by the English
 * shown in ChunkLadder / the analysis below.
 */
export function DictationDrill({
  transcript,
  onReplayAudio,
  embedded,
}: {
  transcript?: string | null;
  onReplayAudio?: () => void;
  // When the drill is the sole content of a tab, skip the collapsed "start" button.
  embedded?: boolean;
}) {
  const [expanded, setExpanded] = useState(!!embedded);
  const [draft, setDraft] = useState('');
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const refWords = useMemo(() => (transcript ? splitWords(transcript) : []), [transcript]);
  const diff = useMemo(
    () => (checked && transcript ? diffWords(transcript, draft) : null),
    [checked, transcript, draft],
  );

  if (!transcript || refWords.length < 2) return null;

  if (!expanded) {
    return (
      <Pressable
        style={styles.startBtn}
        onPress={() => setExpanded(true)}
        accessibilityRole="button"
        accessibilityLabel={t('dictation.start')}
      >
        <ThemedText style={styles.startText}>{t('dictation.start')}</ThemedText>
      </Pressable>
    );
  }

  // The transcript is revealed either by checking an attempt or by skipping the drill.
  const showAnswer = checked || revealed;

  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <ThemedText type="smallBold">{t('dictation.title')}</ThemedText>
        {diff ? (
          <ThemedText type="small" style={styles.score}>
            {t('dictation.score', { n: diff.matchedCount, total: diff.total })}
          </ThemedText>
        ) : null}
      </View>

      {!showAnswer ? (
        <ThemedText type="small" style={styles.instruction}>{t('dictation.instruction')}</ThemedText>
      ) : null}

      <Pressable
        style={styles.replayBtn}
        onPress={() => onReplayAudio?.()}
        accessibilityRole="button"
        accessibilityLabel={t('dictation.replay')}
      >
        <ThemedText style={styles.replayText}>{t('dictation.replay')}</ThemedText>
      </Pressable>

      {!checked ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={t('dictation.placeholder')}
            placeholderTextColor="#9ca3af"
            multiline
            value={draft}
            onChangeText={setDraft}
          />
          <Pressable
            style={[styles.checkBtn, draft.trim().length === 0 && styles.disabled]}
            disabled={draft.trim().length === 0}
            onPress={() => {
              (diff && diff.matchedCount === diff.total ? haptic.success : haptic.light)();
              setChecked(true);
            }}
            accessibilityRole="button"
            accessibilityLabel={t('dictation.check')}
          >
            <ThemedText style={styles.checkText}>{t('dictation.check')}</ThemedText>
          </Pressable>
        </>
      ) : null}

      {showAnswer ? (
        <View style={styles.answer}>
          <ThemedText type="small" style={styles.label}>{t('dictation.answer')}</ThemedText>
          <View style={styles.diff}>
            {(diff ? diff.ref : refWords.map((word) => ({ word, matched: true }))).map((w, i) => (
              <ThemedText key={i} style={[styles.word, !w.matched && styles.wordMissed]}>
                {w.word}
              </ThemedText>
            ))}
          </View>
        </View>
      ) : null}

      {checked ? (
        <Pressable
          style={styles.retryBtn}
          onPress={() => {
            setDraft('');
            setChecked(false);
          }}
          accessibilityRole="button"
          accessibilityLabel={t('dictation.retry')}
        >
          <ThemedText style={styles.retryText}>{t('dictation.retry')}</ThemedText>
        </Pressable>
      ) : !revealed ? (
        <Pressable
          style={styles.skipBtn}
          onPress={() => setRevealed(true)}
          accessibilityRole="button"
          accessibilityLabel={t('dictation.skip')}
        >
          <ThemedText type="small" style={styles.ghost}>{t('dictation.skip')}</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  startBtn: {
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  startText: { fontWeight: '700', fontSize: 16 },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  score: { color: '#059669', fontWeight: '700' },
  instruction: { color: '#6b7280' },
  replayBtn: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#208AEF',
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  replayText: { color: '#208AEF', fontWeight: '600' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  checkBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.5 },
  checkText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  answer: { gap: 6 },
  label: { color: '#6b7280', textTransform: 'uppercase', fontSize: 11 },
  diff: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  word: { fontFamily: Fonts.mono, fontSize: 14, marginRight: 6, marginBottom: 2 },
  wordMissed: { color: '#dc2626', textDecorationLine: 'underline' },
  retryBtn: {
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  retryText: { fontWeight: '600' },
  skipBtn: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  ghost: { color: '#9ca3af', textAlign: 'center', marginTop: 2 },
});
