// Which buyer guides (content-drafts/*.md, served at /updates/:slug) belong
// with which landing pages. One list, read both ways: an article shows its
// landing pages under "Related sourcing guides", and a landing page shows
// the articles that name it under "Further reading".
//
// Kept here rather than as links inside the article bodies because the
// body renderer deliberately has no inline links (see UpdateDetail.jsx).
// Titles must match the `title:` line of the draft they point at.

import { getSeoLandingPage } from './seoLandingPages.js';

const ARTICLE_GUIDES = [
  {
    slug: 'what-to-send-a-towel-manufacturer-when-you-ask-for-a-quote',
    title: 'What to send a towel manufacturer when you ask for a quote',
    pages: [
      'solutions/cotton-towel-manufacturer-india',
      'solutions/private-label-towel-manufacturer',
      'solutions/bulk-hotel-towels',
    ],
  },
  {
    slug: 'how-to-specify-a-hotel-towel',
    title: 'How to specify a hotel towel',
    pages: [
      'solutions/dobby-border-towel-manufacturer',
      'solutions/hotel-towel-manufacturer',
      'solutions/bulk-hotel-towels',
      'solutions/hotel-towels-supplier-what-to-check',
    ],
  },
  {
    slug: 'zero-twist-ringspun-waffle-which-towel-construction-suits-which-buyer',
    title: 'Zero twist, ringspun, waffle: which towel construction suits which buyer',
    pages: [
      'solutions/zero-twist-towel-manufacturer',
      'solutions/dobby-border-towel-manufacturer',
      'solutions/hotel-towel-manufacturer',
      'solutions/hotel-pool-towels',
    ],
  },
  {
    slug: 'what-fob-actually-means-when-buying-towels-from-india',
    title: "What FOB actually means when you're buying towels from India",
    pages: [
      'solutions/cotton-towel-manufacturer-india',
      'solutions/bulk-hotel-towels',
    ],
  },
  {
    slug: 'oeko-tex-gots-bsci-iso-what-each-certification-actually-means',
    title: 'OEKO-TEX, GOTS, BSCI, ISO: what each certification actually means for you',
    pages: [
      'solutions/hotel-towels-supplier-what-to-check',
      'solutions/organic-cotton-linen-manufacturer',
      'solutions/cotton-towel-manufacturer-india',
    ],
  },
  {
    slug: 'hotel-towel-gsm-guide',
    title: '400 GSM vs 500 GSM vs 600 GSM towels — which is right for a hotel?',
    pages: [
      'solutions/bulk-hotel-towels',
      'solutions/hotel-towel-manufacturer',
    ],
  },
  {
    slug: 'cotton-towels-for-hotels-spas-salons',
    title: 'How to choose cotton towels for hotels, spas and salons',
    pages: [
      'solutions/hotel-towel-manufacturer',
      'solutions/bathrobe-manufacturer',
      'solutions/hotel-pool-towels',
    ],
  },
  {
    slug: 'lab-dip-and-colour-matching-explained',
    title: 'What is a lab dip? Colour matching explained',
    pages: [
      'solutions/hotel-towel-manufacturer',
      'solutions/private-label-towel-manufacturer',
      'solutions/bulk-hotel-towels',
    ],
  },
  {
    slug: 'reading-a-pre-shipment-sample-properly',
    title: 'Reading a pre-shipment sample properly',
    pages: [
      'solutions/hotel-towels-supplier-what-to-check',
      'solutions/bulk-hotel-towels',
    ],
  },
  {
    slug: 'private-label-vs-white-label',
    title: 'Private label vs white label — what is actually being customised',
    pages: ['solutions/private-label-towel-manufacturer'],
  },
  {
    slug: 'container-loading-for-towels',
    title: 'Container loading for towels — what actually decides what fits',
    pages: [
      'solutions/bulk-hotel-towels',
      'solutions/cotton-towel-manufacturer-india',
    ],
  },
  {
    slug: 'organic-cotton-vs-conventional-quotation',
    title: 'What changes in a quotation when a buyer asks for organic cotton',
    pages: ['solutions/organic-cotton-linen-manufacturer'],
  },
  {
    slug: 'what-sample-first-actually-protects-against',
    title: 'What "sample-first" actually protects a buyer from, and what it cannot',
    pages: [
      'solutions/hotel-towels-supplier-what-to-check',
      'solutions/private-label-towel-manufacturer',
    ],
  },
  {
    slug: 'keeping-a-towel-reorder-consistent',
    title: 'Keeping a reorder consistent — what to keep on file, and what to ask before a second order',
    pages: [
      'solutions/hotel-towel-manufacturer',
      'solutions/bulk-hotel-towels',
      'solutions/private-label-towel-manufacturer',
      'solutions/hotel-towels-supplier-what-to-check',
    ],
  },
  {
    slug: 'importing-cotton-towels-from-india-into-the-us',
    title: 'Importing cotton towels from India into the US — what the importer of record handles',
    pages: [
      'export/usa-cotton-towel-supplier',
      'solutions/cotton-towel-manufacturer-india',
      'solutions/private-label-towel-manufacturer',
    ],
  },
  {
    slug: 'terry-vs-woven-towels',
    title: 'Terry vs woven towels — what the construction difference actually changes',
    pages: [
      'solutions/hotel-towel-manufacturer',
      'solutions/hotel-pool-towels',
      'solutions/bathrobe-manufacturer',
      'solutions/zero-twist-towel-manufacturer',
    ],
  },
  {
    slug: 'reading-a-towel-spec-sheet',
    title: 'Reading a towel spec sheet — what each line is actually promising',
    pages: [
      'solutions/hotel-towel-manufacturer',
      'solutions/bulk-hotel-towels',
      'solutions/private-label-towel-manufacturer',
      'solutions/hotel-towels-supplier-what-to-check',
    ],
  },
  {
    slug: 'what-a-certificate-of-origin-proves',
    title: 'What a certificate of origin does and does not prove',
    pages: [
      'solutions/cotton-towel-manufacturer-india',
      'export/australia-cotton-towel-supplier',
      'export/norway-cotton-towel-supplier',
      'export/usa-cotton-towel-supplier',
    ],
  },
];

export function getLandingPagesForArticle(articleSlug) {
  const guide = ARTICLE_GUIDES.find((g) => g.slug === articleSlug);
  if (!guide) return [];
  return guide.pages
    .map((key) => {
      const [section, slug] = key.split('/');
      const page = getSeoLandingPage(section, slug);
      return page && { href: `/${key}`, label: page.seoTitle };
    })
    .filter(Boolean);
}

export function getArticlesForLandingPage(section, slug) {
  const key = `${section}/${slug}`;
  return ARTICLE_GUIDES
    .filter((g) => g.pages.includes(key))
    .map((g) => ({ href: `/updates/${g.slug}`, label: g.title }));
}
