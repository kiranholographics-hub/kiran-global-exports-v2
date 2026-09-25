import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/config';

/* ═══════════════════════════════════════════════
   SEO — Client-side Meta Tag Manager
   Towels & Linen Luxury Brand
═══════════════════════════════════════════════ */

/* ── Helpers ───────────────────────────────────── */

/** Set or update a <meta> tag */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(
    `meta[${attr}="${CSS.escape(key)}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', String(content));
}

/** Remove a <meta> tag if content is empty */
function removeMeta(attr, key) {
  const el = document.head.querySelector(
    `meta[${attr}="${CSS.escape(key)}"]`
  );
  el?.remove();
}

/** Set or update a <link> tag */
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Set or update a JSON-LD <script> block */
function setJsonLd(id, data) {
  let el = document.head.querySelector(
    `script[data-seo-jsonld="${id}"]`
  );
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.seoJsonld = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 0);
}

/** Remove a JSON-LD block */
function removeJsonLd(id) {
  document.head
    .querySelector(`script[data-seo-jsonld="${id}"]`)
    ?.remove();
}

/** Resolve absolute image URL */
function resolveImage(image) {
  if (!image) {
    return `${siteConfig.siteUrl}/images/hero/kiran-hero-poster.webp`;
  }
  try {
    return new URL(image, siteConfig.siteUrl).toString();
  } catch {
    return `${siteConfig.siteUrl}${image}`;
  }
}

/**
 * Whether a spec value is a real figure rather than a note standing in for
 * one. The catalogue says "Confirmed on quotation" where the mill has not
 * given a figure yet, and "Buyer specified" where there is no single
 * answer — the honest thing to show a buyer, and not a specification,
 * which is what this markup would present it as.
 */
function isRealSpec(value) {
  if (!value) return false;
  const text = String(value);
  // "Confirmed on quotation", "Buyer specified", "Specified per project":
  // honest answers for a buyer reading the page, and not specifications,
  // which is what this markup would present them as.
  return !/confirm|specifi/i.test(text);
}

/** A weight is only a weight if it states a number. */
function isRealWeight(value) {
  return isRealSpec(value) && /\d/.test(String(value));
}

/** Truncate description to recommended length */
function truncate(str, max = 155) {
  if (!str || str.length <= max) return str;
  return `${str.slice(0, max - 1).trimEnd()}…`;
}

/* ═══════════════════════════════════════════════ */
/**
 * SEO — Per-route metadata manager for CSR SPA.
 *
 * Imperatively updates <head> on every route change:
 *  - <title>
 *  - meta description
 *  - canonical link
 *  - Open Graph tags
 *  - Twitter Card tags
 *  - robots directives
 *  - JSON-LD structured data
 *
 * Note: Crawlers that don't execute JS will only see
 * index.html's static tags. Add SSR/prerendering later
 * if full crawlability is required.
 *
 * Props:
 *  title       — page title (appended with brand name)
 *  description — meta description (auto-truncated to 155ch)
 *  image       — OG image path or URL
 *  noindex     — set robots to noindex, nofollow
 *  type        — OG type: 'website' | 'article' | 'product'
 *  product     — optional product data for Product schema
 *  article     — optional article data for Article schema
 *  faqs        — optional [{ q, a }] for FAQPage schema. Pass the same
 *                array the page already renders; a question Google finds
 *                only in the schema and not on the page is a structured-
 *                data violation, not a shortcut.
 *  breadcrumbs — optional [{ label, href? }] in the same shape PageIntro
 *                takes, for BreadcrumbList schema. The last crumb is the
 *                current page and needs no href.
 */
export default function SEO({
  title,
  description,
  image,
  noindex  = false,
  type     = 'website',
  product,
  article,
  faqs,
  breadcrumbs,
}) {
  const location = useLocation();
  const { i18n } = useTranslation();

  const OG_LOCALES = {
    en: 'en_US', hi: 'hi_IN', ar: 'ar_AR', de: 'de_DE', ko: 'ko_KR', pt: 'pt_BR', ja: 'ja_JP',
  };
  const ogLocale = OG_LOCALES[i18n.language] || 'en_US';
  const htmlLang = i18n.language || 'en';

  useEffect(() => {
    /* ── Core values ─────────────────────────── */
    const fullTitle    = title
      ? (title.includes(siteConfig.brandName)
        ? title
        : `${title} | ${siteConfig.brandName}`)
      : `${siteConfig.brandName} — Premium Towels & Linen`;

    const metaDesc     = truncate(description);
    // .htaccess 301-redirects every prerendered route to its trailing-slash
    // form (e.g. /export/usa-cotton-towel-supplier -> .../supplier/) to
    // keep one canonical URL per page — so the canonical tag has to match
    // that same form, or it names a URL that immediately redirects away
    // from itself.
    const pathWithSlash = location.pathname === '/'
      ? '/'
      : `${location.pathname.replace(/\/+$/, '')}/`;
    const canonicalUrl = `${siteConfig.siteUrl}${pathWithSlash}`;
    const absoluteImg  = resolveImage(image);

    /* ── Title ───────────────────────────────── */
    document.title = fullTitle;

    /* ── Description ─────────────────────────── */
    if (metaDesc) {
      setMeta('name', 'description', metaDesc);
    } else {
      removeMeta('name', 'description');
    }

    /* ── Canonical ───────────────────────────── */
    setLink('canonical', canonicalUrl);

    /* ── Robots ──────────────────────────────── */
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    /* ── Open Graph ──────────────────────────── */
    setMeta('property', 'og:site_name',   siteConfig.brandName);
    setMeta('property', 'og:type',        type);
    setMeta('property', 'og:title',       fullTitle);
    setMeta('property', 'og:description', metaDesc);
    setMeta('property', 'og:url',         canonicalUrl);
    setMeta('property', 'og:image',       absoluteImg);
    setMeta('property', 'og:image:width',  '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt',    fullTitle);
    setMeta('property', 'og:locale',       ogLocale);

    /* ── Twitter Card ────────────────────────── */
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       fullTitle);
    setMeta('name', 'twitter:description', metaDesc);
    setMeta('name', 'twitter:image',       absoluteImg);
    setMeta('name', 'twitter:image:alt',   fullTitle);
    if (siteConfig.twitterHandle) {
      setMeta('name', 'twitter:site', siteConfig.twitterHandle);
    }

    /* ── Extra SEO meta ──────────────────────── */
    setMeta('name', 'author',   siteConfig.brandName);
    setMeta('name', 'category', 'Textiles, Export, Manufacturing');

    /* ── JSON-LD: Organization ───────────────── */
    setJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type':    'Organization',
      name:       siteConfig.brandName,
      url:        siteConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url:     `${siteConfig.siteUrl}/favicon.svg`,
      },
      contactPoint: {
        '@type':       'ContactPoint',
        telephone:     siteConfig.contact.phone,
        email:         siteConfig.contact.email,
        contactType:   'Sales',
        availableLanguage: ['English', 'Hindi', 'Arabic', 'German', 'Korean', 'Portuguese', 'Japanese'],
        areaServed:    'Worldwide',
      },
      address: {
        '@type':           'PostalAddress',
        addressLocality:   'India',
        addressCountry:    'IN',
        streetAddress:     siteConfig.contact.address,
      },
      sameAs: siteConfig.socials?.map((s) => s.href) ?? [],
    });

    /* ── JSON-LD: WebSite ────────────────────── */
    setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type':    'WebSite',
      name:       siteConfig.brandName,
      url:        siteConfig.siteUrl,
      description: 'Cotton towels, bathrobes and hotel linen supplied to importers and distributors worldwide. Made at our partner mill in Solapur since 1972.',
      potentialAction: {
        '@type':       'SearchAction',
        target:        `${siteConfig.siteUrl}/collections?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    /* ── JSON-LD: WebPage ────────────────────── */
    setJsonLd('webpage', {
      '@context':   'https://schema.org',
      '@type':      'WebPage',
      name:         fullTitle,
      description:  metaDesc,
      url:          canonicalUrl,
      inLanguage:   htmlLang,
      isPartOf: {
        '@type': 'WebSite',
        url:     siteConfig.siteUrl,
      },
    });

    /* ── JSON-LD: FAQPage (optional) ─────────── */
    // Every FAQ on this site is already written as a real question with a
    // self-contained answer, which is exactly what this markup wants —
    // it just makes the pairs machine-readable so they can win the
    // expandable FAQ result instead of being read as body prose.
    if (faqs?.length) {
      setJsonLd('faq', {
        '@context': 'https://schema.org',
        '@type':    'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name:    f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    } else {
      removeJsonLd('faq');
    }

    /* ── JSON-LD: BreadcrumbList (optional) ──── */
    // Gives the search result the Home › Export › United States trail
    // instead of the bare URL, and tells Google how these pages nest —
    // which a flat /export/<slug> path does not say on its own.
    if (breadcrumbs?.length) {
      setJsonLd('breadcrumbs', {
        '@context': 'https://schema.org',
        '@type':    'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type':  'ListItem',
          position: i + 1,
          name:     crumb.label,
          // The current page is the last crumb and links nowhere, so it
          // carries no item — that is what the spec expects, not the
          // canonical URL repeated.
          ...(crumb.href
            ? { item: new URL(crumb.href, siteConfig.siteUrl).toString() }
            : {}),
        })),
      });
    } else {
      removeJsonLd('breadcrumbs');
    }

    /* ── JSON-LD: Product (optional) ─────────── */
    if (product) {
      setJsonLd('product', {
        '@context':   'https://schema.org',
        '@type':      'Product',
        name:         product.name,
        description:  product.shortDescription || metaDesc,
        image:        absoluteImg,
        brand: {
          '@type': 'Brand',
          name:    siteConfig.brandName,
        },
        offers: {
          '@type':       'Offer',
          availability:  'https://schema.org/InStock',
          priceCurrency: 'USD',
          seller: {
            '@type': 'Organization',
            name:    siteConfig.brandName,
          },
        },
        ...(isRealSpec(product.material) && { material: product.material }),
        // The catalogue already writes gsm as "400 GSM", so appending the
        // unit again gave "400 GSM GSM".
        ...(isRealWeight(product.gsm) && {
          weight: /gsm/i.test(product.gsm) ? product.gsm : `${product.gsm} GSM`,
        }),
      });
    } else {
      removeJsonLd('product');
    }

    /* ── JSON-LD: Article (optional) ─────────── */
    if (article) {
      setJsonLd('article', {
        '@context':        'https://schema.org',
        '@type':           'Article',
        headline:          fullTitle,
        description:       metaDesc,
        image:             absoluteImg,
        author: {
          '@type': 'Organization',
          name:    siteConfig.brandName,
        },
        publisher: {
          '@type': 'Organization',
          name:    siteConfig.brandName,
          logo: {
            '@type': 'ImageObject',
            url:     `${siteConfig.siteUrl}/favicon.svg`,
          },
        },
        datePublished: article.datePublished,
        dateModified:  article.dateModified || article.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id':   canonicalUrl,
        },
      });
    } else {
      removeJsonLd('article');
    }

  }, [title, description, image, noindex, type, product, article, faqs, breadcrumbs, location.pathname, i18n.language]);

  return null;
}