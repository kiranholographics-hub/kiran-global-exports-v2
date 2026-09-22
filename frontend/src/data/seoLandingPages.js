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
    intro: [
      'Most US importers reach an Indian towel through two or three intermediaries, and every one of them sits between you and the loom that decides whether your reorder matches. We supply from one place: our manufacturing partner V P Mundada in Solapur, weaving since 1972. You buy cotton bath towels, hotel towels, bathrobes and bath mats at mill prices, FOB, and when a specification question comes up it is answered by the people running the production floor rather than relayed down a chain.',
      'What US buyers usually need settled first is labelling and consistency. Fibre content, country of origin and care instructions are prepared to FTC standards, your own artwork goes onto woven labels and packaging, and colour is fixed by lab dip before bulk dyeing so the second container matches the first. For retail programmes, hotel groups and private-label brands alike, nothing enters bulk production until a physical sample has been in your hands and approved.',
    ],
    buyers: [
      'Importers and wholesale distributors stocking bath towels and bath sheets',
      'Hotel groups, resorts and hospitality supply companies',
      'Retail and e-commerce brands running private-label towel lines',
      'Spa, gym and healthcare buyers ordering to a fixed specification',
    ],
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
    intro: [
      'Canadian importers buying cotton towels from India usually have two problems that have nothing to do with the towel itself: bilingual labelling and repeat-order consistency. We handle both as part of the order. English and French fibre-content and care labelling is prepared with the shipment, and colour is approved by lab dip before bulk dyeing so a reorder matches what is already on your shelves or in your linen room.',
      'The towels themselves — terry bath towels, hotel and border ranges, bathrobes and bath mats — are woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct from the mill. You are not buying through a trading chain, so the specification you approve on the sample is the specification the looms are set to.',
    ],
    buyers: [
      'Importers and distributors supplying Canadian retail and hospitality',
      'Hotel groups and resort operators ordering in bulk',
      'Private-label and e-commerce brands needing bilingual packaging',
      'Institutional buyers in spa, fitness and healthcare',
    ],
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
    intro: [
      'Since the India-Australia Economic Cooperation and Trade Agreement took effect in December 2022, the large majority of Indian textile exports enter Australia duty-free — which is what has made buying cotton towels direct from an Indian mill worth doing rather than routing through a third country. We quote FOB from our manufacturing partner V P Mundada in Solapur and confirm the applicable tariff line for your specific product before you commit.',
      'Australian demand skews towards pool and beach ranges alongside the usual bath programmes, and both are built the same way here: GSM, size, colour and border set to your specification, a physical sample approved before bulk, and lab-dip colour approval so a repeat order matches. Bath towels, bath sheets, bathrobes and bath mats can all be produced to a matched specification for the same property or the same retail line.',
    ],
    buyers: [
      'Importers and wholesalers supplying Australian retail',
      'Hotels, resorts, pools and holiday-park operators',
      'Surf, beach and lifestyle brands running private-label ranges',
      'Spa, gym and aged-care buyers ordering to specification',
    ],
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
    intro: [
      'South African importers and hotel groups buying cotton towels from India are usually weighing an Indian mill against a domestic or Chinese supplier on landed cost and on whether the quality holds through a second and third order. Our answer to the second half is process rather than promise: a physical sample approved before bulk, lab-dip colour approval before bulk dyeing, and every batch checked against the approved sample.',
      'Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct. Bath towels, hotel and border ranges, bathrobes and bath mats are built to your GSM, size, colour and border. Certificate of origin, commercial invoice, packing list and supporting compliance documents are prepared with each shipment so your clearing agent is not waiting on paperwork at Durban or Cape Town.',
    ],
    buyers: [
      'Importers and wholesale distributors supplying South African retail',
      'Hotel groups, lodges and resort operators',
      'Retail and private-label brands developing own-brand towel lines',
      'Spa, gym and healthcare institutional buyers',
    ],
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
    intro: [
      'Distributors across Brazil, Argentina, Peru, Chile and Colombia typically carry several towel ranges at once, and the risk in buying from a new mill is that the ranges stop matching each other between shipments. Because colour is approved by lab dip before bulk dyeing and every batch is checked against the approved sample, a single order can combine several specifications and still arrive consistent — and so can the reorder six months later.',
      'Cotton bath towels, beach and pool ranges, bathrobes and bath mats are woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct from the mill, with certificate of origin, commercial invoice and packing list prepared as a standard part of every shipment.',
    ],
    buyers: [
      'Importers and distributors carrying multiple towel ranges',
      'Hotel, resort and beach-club operators',
      'Retail chains and private-label brands',
      'Wholesalers supplying regional hospitality markets',
    ],
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
    intro: [
      'The UAE buys towels at hospitality volumes, and the specification that matters is the one that survives an industrial laundry — not the one that feels best in a showroom. For hotel groups in Dubai and Abu Dhabi we usually build zero-twist and vat-dyed cotton ranges: high absorbency, and colour that holds through repeated commercial washing rather than greying out over a season.',
      'Production is at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quotations are FOB direct to Jebel Ali, Khalifa Port or Sharjah. The India-UAE Comprehensive Economic Partnership Agreement, in force since May 2022, lowered duty on a large share of Indian textile exports — we confirm the applicable tariff line for your product before you order. Hotel towels, bath ranges, pool towels and bathrobes can be produced to one matched specification across a property.',
    ],
    buyers: [
      'Hotel groups, resorts and hospitality supply companies',
      'Importers and distributors serving the UAE and wider Gulf',
      'Private-label and retail brands',
      'Spa, pool, gym and serviced-apartment operators',
    ],
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
    intro: [
      'Saudi hospitality buying runs to scale — hotel groups, serviced apartments and institutional contracts ordering the same towel repeatedly for years. That makes consistency the specification, so colour is approved by lab dip before bulk dyeing and every batch is checked against the sample you approved, which is what lets a shipment two years from now match the towels already in service.',
      'Cotton bath towels, hotel and border ranges, bathrobes and bath mats are woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct to Jeddah Islamic Port or King Abdulaziz Port in Dammam. Certificate of origin, commercial invoice, packing list and the supporting conformity documentation your clearing agent asks for are prepared with each shipment.',
    ],
    buyers: [
      'Hotel groups, resorts and serviced-apartment operators',
      'Importers and wholesale distributors supplying Saudi retail',
      'Institutional and contract buyers in healthcare and education',
      'Private-label and retail brands',
    ],
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
    intro: [
      'A hotel towel fails in one of three ways: the pile mats down, the white goes grey, or the colour drifts so the third order no longer matches the first two. All three are decided at the mill, not in the linen room. We build hospitality ranges around that — zero-twist cotton for absorbency and a hand-feel that survives the wash cycle, vat-dyed colour for retention through industrial laundering, and a dobby border woven in rather than printed, so housekeeping can tell a hand towel from a bath towel from a bath mat at a glance in a stack.',
      'Everything is produced at our manufacturing partner V P Mundada in Solapur, weaving since 1972, to one consistent GSM across repeat orders. A full property set — bath towels and bath sheets, hand and face towels, pool and beach towels, bath mats and bathrobes — can be made to a single matched specification, and lab-dip colour approval before bulk dyeing is what keeps a reorder matching what is already in service.',
    ],
    buyers: [
      'Hotel groups, resorts and boutique properties',
      'Hospitality linen distributors and contract suppliers',
      'Spa, pool, gym and wellness operators',
      'Serviced apartments, cruise and healthcare linen buyers',
    ],
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
    intro: [
      'Private label only works if the product is genuinely yours, not a stock towel with your label sewn on. GSM, size, colour, border design, weave and construction are all built to your brief, then finished with your woven labels, hang tags and branded packaging — so what reaches your customer carries your brand from the towel outward, and nothing identifies us.',
      'Send a brief, a reference product or a towel you already buy from another supplier, and we will develop a matching specification and quote against it before you commit to anything. Production is at our manufacturing partner V P Mundada in Solapur, weaving since 1972, under OEKO-TEX STANDARD 100, MADE IN GREEN, STeP, ISO 9001:2015, GRS and BSCI certification — the compliance evidence retail buyers increasingly ask to see before they list a line. A physical sample is approved before bulk on every order.',
    ],
    buyers: [
      'Retail chains and department stores building own-brand lines',
      'E-commerce and DTC brands launching a towel range',
      'Distributors and wholesalers supplying under their own label',
      'Hotel and spa brands wanting branded guest towels',
    ],
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

// The whole set, grouped, for the hub section on /export. Nothing on the
// site linked to these pages at all — not the nav, not the footer, not
// /export, whose own breadcrumb claims to be their parent — so the only
// route in was the sitemap. A page nothing links to is one Google treats
// as peripheral however good it is, which is most of why they sat in
// "Discovered - currently not indexed".
export function getLandingPageGroups() {
  const groups = { export: [], solutions: [] };
  Object.entries(PAGES).forEach(([key, page]) => {
    groups[page.section]?.push({
      href: `/${key}`,
      // The eyebrow ("United States", "Private Label") is the short form;
      // seoTitle is written for a search result and is too long for a link.
      label: page.eyebrow,
      blurb: page.heading,
    });
  });
  return groups;
}

// The sourcing guide for a market page, if one exists. The guides
// already link out to the market pages via relatedMarket; this is the
// same relationship read the other way, so the pair link to each other
// instead of the market page being a dead end.
export function getLandingPageForMarket(marketSlug) {
  const entry = Object.entries(PAGES).find(
    ([, page]) => page.relatedMarket?.href === `/${marketSlug}`
  );
  if (!entry) return null;
  const [key, page] = entry;
  return { href: `/${key}`, label: page.seoTitle, eyebrow: page.eyebrow };
}

// Sibling pages, for the cross-links at the foot of each one. Derived
// rather than hand-listed per page so a tenth page is linked from the
// other nine the moment it is added above — a page nothing links to is
// one Google finds late and treats as peripheral, which is most of why
// these sat in "Discovered - currently not indexed".
export function getRelatedLandingPages(section, slug) {
  const current = `${section}/${slug}`;
  return Object.entries(PAGES)
    .filter(([key]) => key !== current)
    // Same section first: a country page's closest neighbours are the
    // other country pages, not the two solutions pages.
    .sort(([a], [b]) => {
      const rank = (k) => (k.startsWith(`${section}/`) ? 0 : 1);
      return rank(a) - rank(b);
    })
    .map(([key, page]) => ({ href: `/${key}`, label: page.seoTitle }));
}
