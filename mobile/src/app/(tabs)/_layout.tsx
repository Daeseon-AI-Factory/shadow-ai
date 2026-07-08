import { StyleSheet, View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { useTheme } from '@/hooks/use-theme';
import { t } from '@/lib/i18n';

type SymbolName = SymbolViewProps['name'];

const tabIcon =
  (name: SymbolName) =>
  ({ focused, color }: { focused: boolean; color: ColorValue }) => (
    <View style={[styles.iconShell, focused && styles.iconShellActive]}>
      <SymbolView name={name} size={20} weight={focused ? 'bold' : 'regular'} tintColor={color} />
    </View>
  );

export default function TabsLayout() {
  const theme = useTheme();

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
          height: 74,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      {/* Home draws its own SafeAreaView + "Mimi" title — no native header. */}
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
          title: t('nav.library'),
          tabBarIcon: tabIcon({ ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' }),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: t('nav.review'),
          tabBarIcon: tabIcon({ ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' }),
        }}
      />
      {/* Practice = the packs hub (Base verbs, Mix, Story, AI coding prompts…). A primary tab so the
          study content is one tap away, not buried behind Today's "More practice" card. */}
      <Tabs.Screen
        name="practice"
        options={{
          title: t('nav.practiceTab'),
          tabBarIcon: tabIcon({ ios: 'graduationcap.fill', android: 'school', web: 'school' }),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('nav.settings'),
          tabBarIcon: tabIcon({ ios: 'person.fill', android: 'person', web: 'person' }),
        }}
      />
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
  iconShellActive: {
    backgroundColor: '#E1EFFF',
  },
});
