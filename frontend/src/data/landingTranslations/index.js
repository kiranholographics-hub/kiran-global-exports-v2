// Country landing pages in their market's language, keyed by language and
// then by the page key used in src/data/seoLandingPages.js. Which pages
// exist in which language is LOCALIZED_LANDING_PAGES in
// src/data/localeRoutes.js; the build fails if the two disagree.
//
// Plain data with relative imports only: scripts/generate-seo-files.js
// reads it from plain Node.

import ar from './ar.js';
import de from './de.js';
import es from './es.js';
import ja from './ja.js';
import ko from './ko.js';
import pt from './pt.js';

export const LANDING_TRANSLATIONS = { ar, de, es, ja, ko, pt };
