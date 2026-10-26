// Buyer guides in other languages, keyed by language and then by article
// slug. Which guides exist in which language is LOCALIZED_GUIDES in
// src/data/localeRoutes.js; the build fails if the two disagree.
//
// Plain data with relative imports only: scripts/generate-seo-files.js
// reads it from plain Node.

import ar from './ar.js';
import de from './de.js';
import es from './es.js';

export const GUIDE_TRANSLATIONS = { ar, de, es };
