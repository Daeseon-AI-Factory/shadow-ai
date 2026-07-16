import { Platform, Pressable, StyleSheet, Text, View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';
import { boldSymbolWeight, regularSymbolWeight } from '@/lib/symbol-weights';

type SymbolName = SymbolViewProps['name'];
// Minimal shape of the props expo-router hands a custom tabBarButton (avoids depending on
// @react-navigation/bottom-tabs types, which aren't a direct dependency here).
type TabBarButtonProps = {
  onPress?: (...args: any[]) => void;
  onLongPress?: ((...args: any[]) => void) | null;
  accessibilityState?: { selected?: boolean };
  'aria-label'?: string;
  'aria-selected'?: boolean;
};

export default function TabsLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  // Keep the existing 62-point content area, then reserve the real device inset below it.
  const tabBarBottomInset = Math.max(insets.bottom, 12);

  const tabIcon =
    (name: SymbolName) =>
    ({ focused, color }: { focused: boolean; color: ColorValue }) => (
      <View style={[styles.iconShell, focused && { backgroundColor: theme.primarySoft }]}>
        <SymbolView
          key={focused ? 'bold' : 'regular'}
          name={name}
          size={20}
          weight={{
            ios: focused ? 'bold' : 'regular',
            android: focused ? boldSymbolWeight : regularSymbolWeight,
          }}
          tintColor={color}
        />
      </View>
    );

  // Sparring is the app's one loud action — a raised, "live" coral center button, not a flat tab.
  // Its own color signals it's a different KIND of place (a conversation, not a study surface).
  const SparringTabButton = ({
    onPress,
    onLongPress,
    accessibilityState,
    'aria-label': ariaLabel,
    'aria-selected': ariaSelected,
  }: TabBarButtonProps) => {
    // Expo Router 56 passes the focused state as aria-selected. Keep the legacy
    // accessibilityState fallback so the shared tab stays usable across Router revisions.
    const active = ariaSelected ?? accessibilityState?.selected ?? false;
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole={Platform.OS === 'ios' ? 'button' : 'tab'}
        accessibilityState={{ selected: active }}
        accessibilityLabel={ariaLabel ?? t('nav.sparring')}
        style={styles.centerWrap}
      >
        {({ pressed }) => (
          <View style={styles.centerCol}>
            <View
              style={[
                styles.centerBtn,
                { backgroundColor: theme.live, shadowColor: theme.live },
                (pressed || active) && styles.centerBtnPressed,
              ]}
            >
              <SymbolView
                name={{ ios: 'waveform', android: 'graphic_eq', web: 'graphic_eq' }}
                size={26}
                weight={{ ios: 'bold', android: boldSymbolWeight }}
                tintColor={theme.onLive}
              />
            </View>
            <Text style={[styles.centerLabel, { color: theme.live }]}>{t('nav.sparring')}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
        headerTitleStyle: { color: theme.text, fontWeight: '800' },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surfaceRaised,
          borderTopColor: theme.border,
          height: 62 + tabBarBottomInset,
          paddingTop: 8,
          paddingBottom: tabBarBottomInset,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      {/* Order = tab-bar order: Home · Shadow · [Speaking] · Write · Me */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t('nav.home'),
          tabBarIcon: tabIcon({ ios: 'sun.max.fill', android: 'light_mode', web: 'light_mode' }),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: t('nav.shadowing'),
          tabBarIcon: tabIcon({
            ios: 'play.rectangle.fill',
            android: 'smart_display',
            web: 'smart_display',
          }),
        }}
      />
      {/* The hero — its own studio room, no native header. */}
      <Tabs.Screen
        name="sparring"
        options={{
          headerShown: false,
          title: t('nav.sparring'),
          tabBarButton: (props) => <SparringTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="compose"
        options={{
          title: t('nav.write'),
          tabBarIcon: tabIcon({
            ios: 'square.and.pencil',
            android: 'edit_note',
            web: 'edit_note',
          }),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('nav.settings'),
          tabBarIcon: tabIcon({ ios: 'person.fill', android: 'person', web: 'person' }),
        }}
      />
      {/* Reference and review routes stay alive, but Home owns their entry points. */}
      <Tabs.Screen name="practice" options={{ href: null, title: t('nav.practiceTab') }} />
      <Tabs.Screen name="review" options={{ href: null, title: t('nav.review') }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconShell: {
    width: 34,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  centerCol: { alignItems: 'center', transform: [{ translateY: -14 }] },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  centerBtnPressed: { transform: [{ scale: 0.94 }], shadowOpacity: 0.35 },
  centerLabel: { fontSize: 9.5, fontWeight: '800', marginTop: 3 },
});
