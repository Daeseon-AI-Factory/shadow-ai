// Lightweight i18n for the mobile app. The web uses next-intl (not portable to RN), so this is
// a thin dictionary lookup keyed like the web messages. Device language is resolved once at
// startup: a Korean device gets Korean, everything else falls back to English.
import { getLocales } from 'expo-localization';
import { messages, type Locale } from './i18n-messages';
import { sessionMessages } from './i18n-session-messages';

const code = getLocales()[0]?.languageCode;
export const locale: Locale = code === 'ko' ? 'ko' : 'en';

type Vars = Record<string, string | number>;

/** Translate a flat key (e.g. "home.welcome"), interpolating {placeholders}. Falls back to en, then the key. */
export function t(key: string, vars?: Vars): string {
  let s =
    sessionMessages[locale][key] ??
    messages[locale][key] ??
    sessionMessages.en[key] ??
    messages.en[key] ??
    key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.split(`{${k}}`).join(String(v));
    }
  }
  return s;
}
