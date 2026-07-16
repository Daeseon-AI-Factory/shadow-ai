import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import boldSymbolWeight from 'expo-symbols/androidWeights/bold';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { completeOnboarding } from '@/lib/onboarding';
import { t } from '@/lib/i18n';

type SymbolName = SymbolViewProps['name'];

/**
 * First-run onboarding for a fresh signup: explain the ungated learning loop, distinguish the
 * invite-only AI actions, then hand off to Today's guided first action.
 */
export default function OnboardingScreen() {
  const theme = useTheme();
  const [step, setStep] = useState(0);

  const finish = async () => {
    try {
      await completeOnboarding();
    } catch {
      // A keychain write failure must not trap a signed-in learner on onboarding.
    } finally {
      router.replace('/');
    }
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <View style={styles.dots}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[styles.dot, { backgroundColor: i === step ? theme.primary : theme.border }]}
              />
            ))}
          </View>
          <Pressable onPress={finish} accessibilityRole="button" accessibilityLabel={t('onboard.skip')}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('onboard.skip')}
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView key={step} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {step === 0 && (
            <View style={styles.center}>
              <View style={[styles.hero, { backgroundColor: theme.primarySoft }]}>
                <SymbolView
                  name={{ ios: 'waveform', android: 'graphic_eq', web: 'graphic_eq' }}
                  size={48}
                  weight={{ ios: 'bold', android: boldSymbolWeight }}
                  tintColor={theme.primary}
                />
              </View>
              <ThemedText type="title" style={styles.title}>{t('onboard.welcomeTitle')}</ThemedText>
              <ThemedText style={styles.lead} themeColor="textSecondary">{t('onboard.welcomeBody')}</ThemedText>
            </View>
          )}

          {step === 1 && (
            <View style={styles.stepWrap}>
              <ThemedText type="title" style={styles.title}>{t('onboard.howTitle')}</ThemedText>
              <View style={styles.rows}>
                <HowRow icon={{ ios: 'plus.rectangle.on.rectangle', android: 'add_to_queue', web: 'add_to_queue' }} text={t('onboard.step1')} />
                <HowRow icon={{ ios: 'scissors', android: 'content_cut', web: 'content_cut' }} text={t('onboard.step2')} />
                <HowRow icon={{ ios: 'ear', android: 'hearing', web: 'hearing' }} text={t('onboard.step3')} />
                <HowRow icon={{ ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' }} text={t('onboard.step4')} />
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepWrap}>
              <ThemedText type="title" style={styles.title}>{t('onboard.accessTitle')}</ThemedText>
              <AccessCard
                icon={{ ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' }}
                badge={t('onboard.freeBadge')}
                title={t('onboard.freeTitle')}
                body={t('onboard.freeBody')}
                kind="free"
              />
              <AccessCard
                icon={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
                badge={t('onboard.inviteBadge')}
                title={t('onboard.inviteTitle')}
                body={t('onboard.inviteBody')}
                kind="invite"
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step < 2 ? (
            <Pressable style={[styles.primary, { backgroundColor: theme.primary }]} onPress={() => setStep((s) => s + 1)} accessibilityRole="button" accessibilityLabel={t('onboard.next')}>
              <ThemedText style={styles.primaryText}>{t('onboard.next')}</ThemedText>
            </Pressable>
          ) : (
            <Pressable style={[styles.primary, { backgroundColor: theme.primary }]} onPress={finish} accessibilityRole="button" accessibilityLabel={t('onboard.start')}>
              <ThemedText style={styles.primaryText}>{t('onboard.start')}</ThemedText>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function AccessCard({
  icon,
  badge,
  title,
  body,
  kind,
}: {
  icon: SymbolName;
  badge: string;
  title: string;
  body: string;
  kind: 'free' | 'invite';
}) {
  const theme = useTheme();
  const accent = kind === 'free' ? theme.accent : theme.coral;
  const iconBackground = kind === 'free' ? theme.accentSoft : theme.primarySoft;

  return (
    <View style={[styles.accessCard, { borderColor: theme.border, backgroundColor: theme.surfaceRaised }]}>
      <View style={styles.accessHead}>
        <View style={[styles.accessIcon, { backgroundColor: iconBackground }]}>
          <SymbolView
            name={icon}
            size={22}
            weight={{ ios: 'bold', android: boldSymbolWeight }}
            tintColor={accent}
          />
        </View>
        <ThemedText type="smallBold" style={{ color: accent }}>{badge}</ThemedText>
      </View>
      <ThemedText style={styles.accessTitle}>{title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.accessBody}>{body}</ThemedText>
    </View>
  );
}

function HowRow({ icon, text }: { icon: SymbolName; text: string }) {
  const theme = useTheme();
  return (
    <View style={styles.howRow}>
      <View style={[styles.howIcon, { backgroundColor: theme.primarySoft }]}>
        <SymbolView
          name={icon}
          size={22}
          weight={{ ios: 'bold', android: boldSymbolWeight }}
          tintColor={theme.primary}
        />
      </View>
      <ThemedText style={styles.howText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  body: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 24 },
  center: { alignItems: 'center', gap: 16 },
  hero: { width: 104, height: 104, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  title: { fontSize: 26, lineHeight: 32, textAlign: 'center' },
  lead: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  stepWrap: { gap: 18 },
  rows: { gap: 14 },
  howRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  howIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  howText: { flex: 1, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  accessCard: { borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 8 },
  accessHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  accessIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  accessTitle: { fontSize: 18, lineHeight: 24, fontWeight: '800' },
  accessBody: { lineHeight: 21 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, gap: 6 },
  primary: { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});
