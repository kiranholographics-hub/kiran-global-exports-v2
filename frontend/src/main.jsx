// Self-hosted via @fontsource (no runtime/build-time call to Google Fonts —
// works offline and behind restrictive network policies).
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/fraunces/500-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/globals.css';
import { getStoredLanguage } from './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { initGA } from './lib/analytics';
import { DEFAULT_LOCALE, localizePath, splitLocale } from './data/localeRoutes';

// The language is the first path segment (/de/about), and the router runs
// under it as its basename, so every <Link to="/towels"> on a German page
// stays German without any link knowing about languages.
const { locale, path } = splitLocale(window.location.pathname);

// A visitor who picked a language before and lands on an English URL is
// sent to the same page in their language. Never for a crawler: it has no
// storage, and navigator.webdriver covers the prerender's headless browser,
// which must capture every English URL as English. The /hq admin is left
// where it is.
const stored = navigator.webdriver ? null : getStoredLanguage();
const redirectTo =
  locale === DEFAULT_LOCALE && stored && stored !== DEFAULT_LOCALE && !path.startsWith('/hq')
    ? localizePath(path, stored) + window.location.search + window.location.hash
    : null;

if (redirectTo) {
  window.location.replace(redirectTo);
} else {
  initGA();
  render();
}

function render() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter basename={locale === DEFAULT_LOCALE ? undefined : `/${locale}`}>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
