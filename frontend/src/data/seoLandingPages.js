// Hand-written copy for the search-led landing pages under /export/* and
// /solutions/* (rendered by frontend/src/pages/SeoLandingPage.jsx).
//
// Deliberately static and backend-free, unlike the market pages under
// /:marketSlug: these are prerendered in CI where no API is reachable, so
// anything fetched at build time would ship as an empty shell to crawlers.
//
// These pages answer a different search intent from the market pages —
// "who manufactures this" rather than "who exports to my country" — so the
// copy is deliberately about the mill, the specification and the
// certifications, not about trade agreements and ports. Where a country
// page and a market page would otherwise say the same thing, the market
// page owns the trade framing and links here for the sourcing detail.
//
// Every claim below must already be true elsewhere on this site (mill,
// certifications, product range, process). Country-specific detail is
// limited to public geography (major ports) and publicly documented trade
// facts, always phrased so the export team confirms specifics per order.

/* ── Shared blocks ─────────────────────────────── */

export const CAPABILITIES = [
  {
    title: 'One mill, not a broker chain',
    body: 'Towels are made at our manufacturing partner V P Mundada in Solapur, weaving since 1972. Quotations and shipment come FOB direct from the mill, so your commercial relationship is with the people running the looms.',
  },
  {
    title: 'Specification fixed before production',
    body: 'GSM, size, colour, border, weave and packaging are set to your specification, and nothing enters bulk production until you have approved a physical sample.',
  },
  {
    title: 'Certified production floor',
    body: 'The mill holds OEKO-TEX STANDARD 100, OEKO-TEX MADE IN GREEN, OEKO-TEX STeP, ISO 9001:2015, GRS and BSCI certification. Organic cotton linen is made by our partner Cotonex in Karur under GOTS Version 7.0.',
  },
  {
    title: 'Repeat orders that match',
    body: 'Colour is approved by lab dip before bulk dyeing and every batch is checked against the approved sample, so your second container matches your first.',
  },
  {
    title: 'Export paperwork prepared',
    body: 'Certificates of origin, packing lists and the compliance documentation your customs broker asks for are prepared as a standard part of every order.',
  },
];

export const PRODUCT_RANGE = [
  'Bath towels & bath sheets',
  'Hand towels & face towels',
  'Hotel and border towels',
  'Zero-twist towels',
  'Vat-dyed towels',
  'Waffle & jacquard towels',
  'Pool & beach towels',
  'Bath mats',
  'Bathrobes',
];

const MOQ_FAQ = {
  q: 'What is the minimum order quantity?',
  a: 'MOQ varies by product and customisation level — for standard ranges it is typically container-load based, and for private label it depends on the finish. Tell us the product and market and our export team will confirm the exact figure.',
};

const MATCH_FAQ = {
  q: 'Can you match a towel we already buy from another supplier?',
  a: 'Yes — send a photograph or a physical reference and we will develop a matching specification (GSM, construction, border, colour) and quote against it before you commit to anything.',
};

const SAMPLE_FAQ = {
  q: 'Can we see a sample before ordering?',
  a: 'Always. Samples are developed to your specification and approved by you before bulk production begins — that is the standard sequence on every order, not an extra step you have to ask for.',
};

/* ── Per-page copy ─────────────────────────────── */

const PAGES = {
  'export/usa-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'United States',
    seoTitle: 'Cotton Towel Supplier for US Importers',
    seoDescription:
      'Cotton towel supplier for US importers, hotel groups and private-label brands — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct, with FTC-compliant fibre and origin labelling.',
    heading: 'Cotton towel supplier for United States importers.',
    lead: 'Bath towels, hotel towels, bathrobes and bath mats in 100% cotton ringspun, made to your approved specification at our partner mill in Solapur and shipped FOB direct — with fibre-content and country-of-origin labelling prepared to FTC standards.',
    faqs: [
      {
        q: 'Which US ports do you ship to?',
        a: 'We coordinate FOB shipment to major US ports including Los Angeles/Long Beach, New York/New Jersey, Savannah and Houston; your freight forwarder handles the onward leg from origin.',
      },
      {
        q: 'Will the labelling meet US requirements?',
        a: 'Fibre content, country of origin and care labelling are prepared to FTC standards as part of the order. Send us your own label artwork and we will apply it to the approved specification.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/usa', label: 'Exporting to the United States' },
  },

  'export/canada-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Canada',
    seoTitle: 'Cotton Towel Supplier for Canadian Importers',
    seoDescription:
      'Cotton towel supplier for Canadian importers, hospitality buyers and private-label brands — towels made at our partner mill in Solapur, sample-first, FOB direct, with bilingual English/French fibre labelling.',
    heading: 'Cotton towel supplier for Canadian importers.',
    lead: 'Terry bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, produced against an approved sample at our partner mill in Solapur and shipped FOB direct — with bilingual English/French fibre labelling prepared for the Canadian market.',
    faqs: [
      {
        q: 'Which Canadian ports do you ship to?',
        a: 'We coordinate FOB shipment to major Canadian ports including Vancouver, Montreal, Halifax and Toronto via inland routing; your freight forwarder handles the onward leg from origin.',
      },
      {
        q: 'Can labels be supplied in both English and French?',
        a: 'Yes — bilingual English/French fibre-content and care labelling is prepared as part of the order, and your own brand artwork can be applied to the same specification.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/canada', label: 'Exporting to Canada' },
  },

  'export/australia-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Australia',
    seoTitle: 'Cotton Towel Supplier for Australian Importers',
    seoDescription:
      'Cotton towel supplier for Australian importers, hotels and private-label brands — 100% cotton towels made at our partner mill in Solapur, sample-first and FOB direct, with most Indian terry textiles entering Australia duty-free under ECTA.',
    heading: 'Cotton towel supplier for Australian importers.',
    lead: 'Bath towels, pool and beach ranges, bathrobes and bath mats in 100% cotton ringspun, made to an approved sample at our partner mill in Solapur — with most Indian-made terry textiles now entering Australia duty-free under the India-Australia Economic Cooperation and Trade Agreement.',
    faqs: [
      {
        q: 'Which Australian ports do you ship to?',
        a: 'We coordinate FOB shipment to major Australian ports including Sydney, Melbourne, Brisbane and Fremantle; your freight forwarder handles the onward leg from origin.',
      },
      {
        q: 'Do Indian towels attract import duty in Australia?',
        a: 'For most categories, no — since the India-Australia Economic Cooperation and Trade Agreement took effect in December 2022, the large majority of India’s textile exports enter Australia duty-free. We will confirm the applicable tariff line for your specific product before you order.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/australia', label: 'Exporting to Australia' },
  },

  'export/south-africa-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'South Africa',
    seoTitle: 'Cotton Towel Supplier for South African Importers',
    seoDescription:
      'Cotton towel supplier for South African importers, hotel groups and retail buyers — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct, with export documentation prepared for clearance.',
    heading: 'Cotton towel supplier for South African importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made against an approved sample at our partner mill in Solapur and shipped FOB direct to South African importers, retail groups and hospitality buyers.',
    faqs: [
      {
        q: 'Which South African ports do you ship to?',
        a: 'We coordinate FOB shipment to major South African ports including Durban, Cape Town and Gqeberha (Port Elizabeth); your freight forwarder and clearing agent handle the onward leg.',
      },
      {
        q: 'What documentation is provided for customs clearance?',
        a: 'Certificate of origin, commercial invoice, packing list and the supporting compliance documentation your clearing agent asks for are prepared as a standard part of every shipment.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/south-america-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'South America',
    seoTitle: 'Cotton Towel Supplier for South American Importers',
    seoDescription:
      'Cotton towel supplier for importers and distributors across South America — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct, with full export documentation.',
    heading: 'Cotton towel supplier for South American importers.',
    lead: 'Bath towels, beach and pool ranges, bathrobes and bath mats in 100% cotton ringspun, produced to an approved specification at our partner mill in Solapur and shipped FOB direct to importers and distributors across South America.',
    faqs: [
      {
        q: 'Which South American ports do you ship to?',
        a: 'We coordinate FOB shipment to major regional ports including Santos, Buenos Aires, Callao and Cartagena; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Can you support distributors carrying several ranges?',
        a: 'Yes — a single order can combine multiple specifications, and because colour is lab-dip approved before bulk dyeing, repeat shipments stay consistent across your range.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/south-america', label: 'Exporting to South America' },
  },

  'export/uae-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'United Arab Emirates',
    seoTitle: 'Cotton Towel Supplier for UAE Importers & Hotels',
    seoDescription:
      'Cotton towel supplier for UAE importers, hotel groups and private-label brands — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first and FOB direct to Jebel Ali and other UAE ports.',
    heading: 'Cotton towel supplier for the United Arab Emirates.',
    lead: 'Hotel towels, bath ranges, pool towels and bathrobes in 100% cotton ringspun, made to an approved sample at our partner mill in Solapur — built for UAE hospitality groups, importers and private-label brands, shipped FOB direct.',
    faqs: [
      {
        q: 'Which UAE ports do you ship to?',
        a: 'We coordinate FOB shipment to major UAE ports including Jebel Ali (Dubai), Khalifa Port (Abu Dhabi) and Sharjah; your freight forwarder handles the onward leg from origin.',
      },
      {
        q: 'How does the India-UAE trade agreement affect duty?',
        a: 'The India-UAE Comprehensive Economic Partnership Agreement, in force since May 2022, lowered duty on a large share of Indian textile exports. We will confirm the applicable tariff line for your specific product with you before you order.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/saudi-arabia-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Saudi Arabia',
    seoTitle: 'Cotton Towel Supplier for Saudi Arabia Importers',
    seoDescription:
      'Cotton towel supplier for Saudi importers, hotel groups and retail buyers — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Jeddah and Dammam, with export documentation prepared.',
    heading: 'Cotton towel supplier for Saudi Arabia.',
    lead: 'Hotel towels, bath ranges, bathrobes and bath mats in 100% cotton ringspun, produced against an approved sample at our partner mill in Solapur and shipped FOB direct to Saudi importers, hospitality groups and retail buyers.',
    faqs: [
      {
        q: 'Which Saudi ports do you ship to?',
        a: 'We coordinate FOB shipment to major Saudi ports including Jeddah Islamic Port and King Abdulaziz Port in Dammam; your freight forwarder and clearing agent handle the onward leg.',
      },
      {
        q: 'What documentation do you prepare for Saudi clearance?',
        a: 'Certificate of origin, commercial invoice, packing list and the supporting conformity documentation your clearing agent requires are prepared with each shipment. Tell us what your agent needs and we will confirm it before dispatch.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'solutions/hotel-towel-manufacturer': {
    section: 'solutions',
    eyebrow: 'Hospitality',
    seoTitle: 'Hotel Towel Manufacturer & Supplier',
    seoDescription:
      'Hotel towel manufacturer supplying resorts, hotel groups and hospitality distributors — zero-twist and vat-dyed cotton towels built for commercial laundering, consistent GSM, made at our partner mill in Solapur.',
    heading: 'Hotel towel manufacturer for hospitality buyers.',
    lead: 'Towels that survive a commercial laundry. For hotels and resorts we build zero-twist and vat-dyed cotton ranges for absorbency and colour retention through repeated industrial washing — made to a consistent GSM at our partner mill in Solapur and supplied in bulk.',
    faqs: [
      {
        q: 'Which towels do you recommend for hotel use?',
        a: 'Zero-twist and vat-dyed cotton towels are our usual recommendation for hospitality — high absorbency, durable through commercial laundering, and available in bulk at a consistent GSM across repeat orders.',
      },
      {
        q: 'Can you supply a full hospitality set, not just bath towels?',
        a: 'Yes — bath towels and bath sheets, hand and face towels, pool and beach towels, bath mats and bathrobes can all be produced to a matched specification for the same property.',
      },
      {
        q: 'Will a reorder match the towels we already have in service?',
        a: 'Colour is approved by lab dip before bulk dyeing and every batch is checked against the approved sample, so a later shipment matches the one already in your linen room.',
      },
      MOQ_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'solutions/private-label-towel-manufacturer': {
    section: 'solutions',
    eyebrow: 'Private Label',
    seoTitle: 'Private Label Towel Manufacturer',
    seoDescription:
      'Private label towel manufacturer for retail brands and distributors — your specification, woven labels and branded packaging, produced sample-first at our partner mill in Solapur and shipped FOB direct.',
    heading: 'Private label towel manufacturer.',
    lead: 'Your brand, your specification, made at the mill. GSM, size, colour, border, weave and packaging are built to your brief, finished with your woven labels and branded packaging, and confirmed by a physical sample before anything goes to bulk.',
    faqs: [
      {
        q: 'What can be customised on a private-label order?',
        a: 'GSM, size, colour, border design, weave and construction, plus woven labels, hang tags and branded packaging. Send us a brief or a reference product and we will build the specification around it.',
      },
      {
        q: 'Do you produce under our own brand name?',
        a: 'Yes — the goods ship under your label and packaging. Your customers see your brand, not ours.',
      },
      MATCH_FAQ,
      MOQ_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/custom', label: 'Custom & Private Label' },
  },
};

/* ── Lookups used by the page, prerender and sitemap ── */

// Route paths, e.g. '/export/usa-cotton-towel-supplier'. Imported by
// scripts/prerender.mjs and scripts/generate-seo-files.js, so keep this a
// plain value with no build-tool aliases in this file.
export const SEO_LANDING_ROUTES = Object.keys(PAGES).map((key) => `/${key}`);

export function getSeoLandingPage(section, slug) {
  return PAGES[`${section}/${slug}`] || null;
}
