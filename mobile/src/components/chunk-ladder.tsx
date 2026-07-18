import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { ChunkPair } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { haptic } from '@/lib/haptics';
import { t } from '@/lib/i18n';

/**
 * The "어순" pillar — train ACTIVE English-word-order thinking on the learner's own clip.
 * The clip's chunkedTranslation (English chunks + Korean gloss, already in English order) is
 * the answer key BY INDEX. The learner taps the shuffled English chunks into the next slot;
 * a tap is accepted only when its original index == the next needed rung, so a wrong (Korean
 * SOV) order is physically unbuildable. Clearing it auto-replays the clip audio (binds order
 * to sound); a Blind pass then hides the Korean so the English-order schema itself is the only
 * cue. Mastery (3 Blind clears) persists per-clip → later visits open straight into Blind, and
 * the Korean crutch falls away. Pure client-side: reuses chunkedTranslation, no backend/AI.
 */
const MASTERY_TARGET = 3;

function shuffle(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ChunkLadder({
  chunks,
  clipId,
  onReplayAudio,
  embedded,
}: {
  chunks?: ChunkPair[];
  clipId: string;
  onReplayAudio?: () => void;
  // When the drill is the sole content of a tab, skip the collapsed "build" button.
  embedded?: boolean;
}) {
  const items = chunks ?? [];
  const n = items.length;
  const storeKey = `chunkladder:${clipId}`;

  const [expanded, setExpanded] = useState(!!embedded);
  const [placed, setPlaced] = useState<number[]>([]);
  const [tray, setTray] = useState<number[]>(() => shuffle(n));
  const [stage, setStage] = useState<'guided' | 'blind'>(n < 3 ? 'blind' : 'guided');
  const [blindClears, setBlindClears] = useState(0);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  // Mastery: if the learner has cleared the Blind pass enough times before, open in Blind.
  useEffect(() => {
    let alive = true;
    SecureStore.getItemAsync(storeKey)
      .then((v) => {
        if (!alive) return;
        const cleared = v ? parseInt(v, 10) || 0 : 0;
        setBlindClears(cleared);
        if (cleared >= MASTERY_TARGET && n >= 2) setStage('blind');
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [storeKey, n]);

  if (n < 2) return null;

  const done = placed.length === n;
  const mastered = blindClears >= MASTERY_TARGET;

  const reset = (toStage: 'guided' | 'blind') => {
    setPlaced([]);
    setTray(shuffle(n));
    setWrongIdx(null);
    setStage(toStage);
  };

  const place = (origIdx: number) => {
    if (origIdx === placed.length) {
      const next = [...placed, origIdx];
      setPlaced(next);
      setTray((tr) => tr.filter((x) => x !== origIdx));
      setWrongIdx(null);
      (next.length === n ? haptic.success : haptic.tap)();
      if (next.length === n) {
        onReplayAudio?.();
        if (stage === 'blind') {
          const cleared = blindClears + 1;
          setBlindClears(cleared);
          SecureStore.setItemAsync(storeKey, String(cleared)).catch(() => {});
        }
      }
    } else {
      // Wrong order — reject. The slot does not fill, so a Korean-order solve is impossible.
      setWrongIdx(origIdx);
      haptic.error();
    }
  };

  const undoLast = () => {
    if (placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced((p) => p.slice(0, -1));
    setTray((tr) => [...tr, last]);
    setWrongIdx(null);
  };

  if (!expanded) {
    return (
      <Pressable
        style={styles.buildBtn}
        onPress={() => setExpanded(true)}
        accessibilityRole="button"
        accessibilityLabel={t('chunkLadder.build')}
      >
        <ThemedText style={styles.buildText}>
          {t('chunkLadder.build')} · {t('chunkLadder.preview', { n })}
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <ThemedText type="smallBold">{t('chunkLadder.title')}</ThemedText>
        {mastered ? (
          <ThemedText type="small" style={styles.mastered}>★ {t('chunkLadder.mastered')}</ThemedText>
        ) : null}
      </View>

      <View style={styles.ladder}>
        {items.map((ch, i) => {
          const isFilled = i < placed.length;
          const isLast = i === placed.length - 1;
          return (
            <View key={i} style={styles.rung}>
              {stage === 'guided' ? (
                <ThemedText type="small" style={styles.gloss}>{ch.ko}</ThemedText>
              ) : null}
              {isFilled ? (
                isLast ? (
                  <Pressable
                    style={[styles.slot, styles.slotFilled]}
                    onPress={undoLast}
                    accessibilityRole="button"
                    accessibilityLabel={ch.en}
                  >
                    <ThemedText style={styles.slotEn}>{ch.en}</ThemedText>
                  </Pressable>
                ) : (
                  <View style={[styles.slot, styles.slotFilled]}>
                    <ThemedText style={styles.slotEn}>{ch.en}</ThemedText>
                  </View>
                )
              ) : (
                <View style={[styles.slot, styles.slotEmpty]}>
                  <ThemedText style={styles.slotPlaceholder}>—</ThemedText>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {!done ? (
        <View style={styles.tray}>
          {tray.map((origIdx) => (
            <Pressable
              key={origIdx}
              style={[styles.chip, wrongIdx === origIdx && styles.chipWrong]}
              onPress={() => place(origIdx)}
              accessibilityRole="button"
              accessibilityLabel={items[origIdx].en}
            >
              <ThemedText style={styles.chipEn}>{items[origIdx].en}</ThemedText>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.doneRow}>
          <ThemedText type="smallBold" style={styles.solved}>✓ {t('chunkLadder.solved')}</ThemedText>
          <View style={styles.btnRow}>
            <Pressable
              style={styles.secondaryBtn}
              onPress={() => reset('blind')}
              accessibilityRole="button"
              accessibilityLabel={t('chunkLadder.blind')}
            >
              <ThemedText style={styles.secondaryText}>{t('chunkLadder.blind')}</ThemedText>
            </Pressable>
            <Pressable
              style={styles.secondaryBtn}
              onPress={() => reset(stage)}
              accessibilityRole="button"
              accessibilityLabel={t('chunkLadder.again')}
            >
              <ThemedText style={styles.secondaryText}>{t('chunkLadder.again')}</ThemedText>
            </Pressable>
          </View>
        </View>
      )}

      {!embedded ? (
        <Pressable
          style={styles.ghostBtn}
          onPress={() => setExpanded(false)}
          accessibilityRole="button"
          accessibilityLabel={t('chunkLadder.showLiteral')}
        >
          <ThemedText type="small" style={styles.ghost}>{t('chunkLadder.showLiteral')}</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buildBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buildText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mastered: { color: '#b45309' },
  ladder: { gap: 8 },
  rung: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  gloss: { flex: 1, color: '#6b7280', fontSize: 13 },
  slot: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  slotEmpty: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#9ca3af' },
  slotFilled: { borderWidth: 1, borderColor: '#10b98155', backgroundColor: '#10b98111' },
  slotEn: { fontFamily: Fonts.mono, fontSize: 14 },
  slotPlaceholder: { color: '#9ca3af' },
  tray: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9ca3af77',
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  chipWrong: { borderColor: '#dc2626', backgroundColor: '#dc262611' },
  chipEn: { fontFamily: Fonts.mono, fontSize: 14 },
  doneRow: { gap: 10 },
  solved: { color: '#059669' },
  btnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  secondaryText: { fontWeight: '600' },
  ghostBtn: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  ghost: { color: '#9ca3af', textAlign: 'center', marginTop: 2 },
});
