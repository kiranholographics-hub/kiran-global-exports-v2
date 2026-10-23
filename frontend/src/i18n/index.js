import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import ko from './locales/ko.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';
import es from './locales/es.json';
import { DEFAULT_LOCALE, splitLocale } from '@/data/localeRoutes';

// Single source of truth for supported languages — Header's language
// selector reads this list directly, so adding a new language only ever
// means: add its locale JSON here, add one entry to this array.
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', shortLabel: 'ES', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', shortLabel: 'HI', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', shortLabel: 'AR', dir: 'rtl' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', shortLabel: 'DE', dir: 'ltr' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', shortLabel: 'KO', dir: 'ltr' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', shortLabel: 'PT', dir: 'ltr' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', shortLabel: 'JA', dir: 'ltr' },
];

const STORAGE_KEY = 'kge-language';

/**
 * The language a visitor last picked in the switcher, or null. Only read to
 * send a returning visitor from an English URL to their language's URL (see
 * main.jsx) — the page itself always renders in the language its URL names,
 * so a crawler, which has no storage, sees exactly what the URL promises.
 */
export function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    // private browsing / storage unavailable
  }
  return null;
}

/** Records an explicit choice from the language switcher. */
export function rememberLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore
  }
}

/** Applies <html lang> + <html dir> for the given language code. RTL (Arabic)
 * flips text direction and native browser bidi handling site-wide; most of
 * this app's custom flex/grid layouts still read left-to-right visually —
 * that's a further, layout-by-layout pass beyond text-direction support. */
export function applyDocumentLanguage(code) {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
  document.documentElement.lang = lang.code;
  document.documentElement.dir = lang.dir;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ar: { translation: ar },
    de: { translation: de },
    ko: { translation: ko },
    pt: { translation: pt },
    ja: { translation: ja },
    es: { translation: es },
  },
  // The URL decides: /de/... is German, an unprefixed path is English.
  lng: splitLocale(window.location.pathname).locale,
  fallbackLng: DEFAULT_LOCALE, // any key/page not yet translated silently falls back to English
  interpolation: { escapeValue: false }, // React already escapes
  returnObjects: true,
});

i18n.on('languageChanged', (code) => {
  applyDocumentLanguage(code);
});

// Apply once on load for the initially-resolved language.
applyDocumentLanguage(i18n.language);

export default i18n;
