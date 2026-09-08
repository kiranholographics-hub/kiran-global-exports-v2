import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import ko from './locales/ko.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';

// Single source of truth for supported languages — Header's language
// selector reads this list directly, so adding a new language only ever
// means: add its locale JSON here, add one entry to this array.
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', shortLabel: 'HI', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', shortLabel: 'AR', dir: 'rtl' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', shortLabel: 'DE', dir: 'ltr' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', shortLabel: 'KO', dir: 'ltr' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', shortLabel: 'PT', dir: 'ltr' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', shortLabel: 'JA', dir: 'ltr' },
];

const STORAGE_KEY = 'kge-language';

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    // private browsing / storage unavailable
  }
  return 'en';
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
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en', // any key/page not yet translated silently falls back to English
  interpolation: { escapeValue: false }, // React already escapes
  returnObjects: true,
});

i18n.on('languageChanged', (code) => {
  applyDocumentLanguage(code);
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore
  }
});

// Apply once on load for the initially-resolved language.
applyDocumentLanguage(i18n.language);

export default i18n;
