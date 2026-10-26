// Which languages get their own URLs, and which pages are translated well
// enough to be indexed in them.
//
// The language used to live only in localStorage, so every language shared
// one URL and a crawler — which has no localStorage — only ever saw English.
// German, Arabic, Spanish and the rest could not rank anywhere. Now the
// language is the first path segment: /de/about, /es/towels, /ar. English
// stays unprefixed so no existing URL moves.
//
// Plain data with no imports, because the deploy workflow and the sitemap
// script read it from plain Node, the same way they read deployRoutes.js.

export const DEFAULT_LOCALE = 'en';

// Every language with a locale file in src/i18n/locales, minus English.
// Adding a language means adding it here and in src/i18n/index.js.
export const PREFIXED_LOCALES = ['es', 'de', 'ar', 'pt', 'ja', 'ko', 'hi'];

export const ALL_LOCALES = [DEFAULT_LOCALE, ...PREFIXED_LOCALES];

// Pages whose title, description and body all come from the locale files,
// in every language. Anything else — most /export and /solutions landing
// pages (the exceptions are LOCALIZED_LANDING_PAGES below), product
// descriptions from the API, guides — is still English-only copy, so under
// a language prefix it renders with translated navigation around English
// text. Those pages canonicalise to their English URL and carry no
// hreflang, rather than being submitted as a German page that is really an
// English one. A page joins this list once its copy is translated.
export const LOCALIZED_PAGES = [
  '/',
  '/about',
  '/custom',
  '/contact',
  '/towels',
  '/linen',
  // Not /collections: most of that page is product cards whose
  // descriptions come from the API in English only.
];

/** Drops one trailing slash, keeping the root as "/". */
function trimSlash(path) {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Splits "/de/about" into { locale: 'de', path: '/about' }. A path with no
 * language prefix is English.
 */
export function splitLocale(pathname) {
  const match = /^\/([a-z]{2})(?=\/|$)/.exec(pathname || '/');
  if (match && PREFIXED_LOCALES.includes(match[1])) {
    return { locale: match[1], path: pathname.slice(3) || '/' };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}

/** "/about" in German is "/de/about"; in English it stays "/about". */
export function localizePath(path, locale) {
  const clean = trimSlash(path || '/');
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

// Country landing pages translated into the language their market reads,
// and only that one: the German buyer's page in German, the Gulf pages in
// Arabic, the Latin American ones in Spanish. Unlike LOCALIZED_PAGES these
// are not translated into every language, so each one names its own. The
// copy lives in src/data/landingTranslations/; public/.htaccess carries the
// same list for its redirect, and the build checks all three agree.
export const LOCALIZED_LANDING_PAGES = {
  '/export/germany-cotton-towel-supplier': ['de'],
  '/export/uae-cotton-towel-supplier': ['ar'],
  '/export/saudi-arabia-cotton-towel-supplier': ['ar'],
  '/export/qatar-cotton-towel-supplier': ['ar'],
  '/export/oman-cotton-towel-supplier': ['ar'],
  '/export/japan-cotton-towel-supplier': ['ja'],
  '/export/south-korea-cotton-towel-supplier': ['ko'],
  '/export/brazil-cotton-towel-supplier': ['pt'],
  '/export/spain-cotton-towel-supplier': ['es'],
  '/export/mexico-cotton-towel-supplier': ['es'],
  '/export/chile-cotton-towel-supplier': ['es'],
  '/export/colombia-cotton-towel-supplier': ['es'],
  '/export/peru-cotton-towel-supplier': ['es'],
  '/export/south-america-cotton-towel-supplier': ['es'],
};

/** Every language a page exists in, English first. */
export function pageLocales(path) {
  const clean = trimSlash(path || '/');
  if (LOCALIZED_PAGES.includes(clean)) return ALL_LOCALES;
  return [DEFAULT_LOCALE, ...(LOCALIZED_LANDING_PAGES[clean] || [])];
}

/** Whether a page has its own version in this language. */
export function isTranslatedIn(path, locale) {
  return pageLocales(path).includes(locale);
}

/** Whether a page exists in more than one language (so carries hreflang). */
export function isLocalizedPage(path) {
  return pageLocales(path).length > 1;
}

/**
 * The URL a localized page is actually served at. Every prerendered route
 * is a directory, and .htaccess redirects /de/about to /de/about/, so the
 * slashed form is the one canonical and hreflang must name — pointing them
 * at a URL that redirects makes Google ignore them.
 */
export function localizedPageUrl(siteUrl, path, locale) {
  const localized = localizePath(path, locale);
  return `${siteUrl}${localized === '/' ? '/' : `${localized}/`}`;
}

// hreflang values. Portuguese is written for Brazil (the market page this
// site has), Spanish for Spain and Latin America alike, so both stay
// language-only rather than naming one country.
export const HREFLANG = {
  en: 'en', es: 'es', de: 'de', ar: 'ar', pt: 'pt', ja: 'ja', ko: 'ko', hi: 'hi',
};

// Every non-English URL to prerender and ship: each localized page in each
// prefixed language, and each landing page in its own languages.
export const LOCALIZED_ROUTES = [
  ...PREFIXED_LOCALES.flatMap((locale) =>
    LOCALIZED_PAGES.map((path) => localizePath(path, locale))
  ),
  ...Object.entries(LOCALIZED_LANDING_PAGES).flatMap(([path, locales]) =>
    locales.map((locale) => localizePath(path, locale))
  ),
];
