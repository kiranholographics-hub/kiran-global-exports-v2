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


  'export/uk-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'United Kingdom',
    seoTitle: 'Cotton Towel Supplier for UK Importers',
    seoDescription:
      'Cotton towel supplier for UK importers, hotel groups and private-label brands — towels made to your specification at our partner mill in Solapur, sample-first, FOB direct, with UK fibre and care labelling prepared.',
    heading: 'Cotton towel supplier for United Kingdom importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats built to your specification at our partner mill in Solapur and shipped FOB direct — with fibre-content and care labelling prepared for the UK market.',
    intro: [
      'Since leaving the EU the UK sets its own import and labelling rules, which is the part most buyers want settled before anything else. Fibre-content and care labelling is prepared for the UK market as part of the order, and the certificate of origin, commercial invoice and packing list your customs broker asks for are prepared with every shipment rather than chased afterwards.',
      'The towels themselves are made to your brief — GSM, size, colour, border, weave and packaging — at our manufacturing partner V P Mundada in Solapur, weaving since 1972. Nothing goes to bulk until you have approved a physical sample, and colour is fixed by lab dip before bulk dyeing, so the container after this one matches this one.',
    ],
    buyers: [
      'Importers and wholesale distributors supplying UK retail',
      'Hotel groups, serviced apartments and hospitality suppliers',
      'Retail and e-commerce brands running own-label towel ranges',
      'Spa, gym and healthcare buyers ordering to specification',
    ],
    faqs: [
      {
        q: 'Which UK ports do you ship to?',
        a: 'We coordinate FOB shipment to major UK ports including Felixstowe, Southampton, London Gateway and Liverpool; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Does the labelling meet UK requirements?',
        a: 'Fibre content, care instructions and country of origin are prepared for the UK market as part of the order, and your own brand artwork can be applied to the same specification. Tell us what your retailer or buyer requires and we will confirm it before production.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/germany-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Germany',
    seoTitle: 'Cotton Towel Supplier for German Importers',
    seoDescription:
      'Cotton towel supplier for German importers, hotel groups and private-label brands — OEKO-TEX, BSCI and ISO 9001 certified production, sample-first, FOB direct to Hamburg and Bremerhaven.',
    heading: 'Cotton towel supplier for German importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur — produced under OEKO-TEX, BSCI and ISO 9001:2015 certification and shipped FOB direct.',
    intro: [
      'German buyers ask for supply-chain evidence earlier and in more detail than most, and increasingly they are required to. The mill holds OEKO-TEX STANDARD 100, OEKO-TEX MADE IN GREEN, OEKO-TEX STeP, ISO 9001:2015, GRS and amfori BSCI certification, and our organic cotton linen is made under GOTS Version 7.0 — the documentation your compliance team will ask for exists before you ask for it, not after.',
      'Production itself is straightforward: GSM, size, colour, border, weave and packaging to your brief, a physical sample approved before bulk, and lab-dip colour approval before bulk dyeing so a repeat order matches. Goods are REACH and GPSR compliant, and fibre-content and care labelling is prepared in German.',
    ],
    buyers: [
      'Importers and wholesale distributors supplying German retail',
      'Hotel groups, resorts and hospitality linen suppliers',
      'Retail and private-label brands with supply-chain reporting duties',
      'Spa, wellness and healthcare institutional buyers',
    ],
    faqs: [
      {
        q: 'Which German ports do you ship to?',
        a: 'We coordinate FOB shipment to Hamburg and Bremerhaven, and to Rotterdam or Antwerp where your forwarder prefers to route inland from there; the onward leg is handled by your freight forwarder.',
      },
      {
        q: 'What supply-chain documentation can you provide?',
        a: 'OEKO-TEX STANDARD 100, MADE IN GREEN and STeP, ISO 9001:2015, GRS and amfori BSCI certification for the mill, GOTS Version 7.0 for organic cotton linen, plus REACH and GPSR compliance. Tell us what your compliance team needs and we will confirm what can be supplied before you order.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/netherlands-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Netherlands',
    seoTitle: 'Cotton Towel Supplier for Dutch Importers',
    seoDescription:
      'Cotton towel supplier for Dutch importers and EU distributors — towels made to your specification at our partner mill in Solapur, sample-first, FOB direct to Rotterdam, REACH and GPSR compliant.',
    heading: 'Cotton towel supplier for Netherlands importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats built to your specification at our partner mill in Solapur and shipped FOB direct to Rotterdam — for importers and distributors supplying the Netherlands and the wider EU.',
    intro: [
      'A lot of what lands at Rotterdam does not stay in the Netherlands. Dutch buyers are often distributors serving customers across the EU, which makes consistency the specification: a range that looks slightly different from one container to the next becomes a complaint from every customer at once. Colour is approved by lab dip before bulk dyeing and every batch is checked against the approved sample, so a single order can carry several specifications and still arrive matched — and so can the reorder.',
      'Goods are REACH and GPSR compliant, and fibre-content and care labelling is prepared in Dutch or in whichever EU languages your customers need. The towels are woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct from the mill.',
    ],
    buyers: [
      'Importers and distributors supplying the Netherlands and the EU',
      'Hotel groups, resorts and hospitality linen suppliers',
      'Retail and private-label brands',
      'Spa, wellness and institutional buyers',
    ],
    faqs: [
      {
        q: 'Which Dutch ports do you ship to?',
        a: 'We coordinate FOB shipment to Rotterdam, Europe\'s largest container port, and to Amsterdam where your forwarder prefers it; the onward leg across the EU is handled by your freight forwarder.',
      },
      {
        q: 'Can you supply labelling for several EU markets in one order?',
        a: 'Yes — fibre-content and care labelling can be prepared in the languages your customers require, and a single order can combine specifications for several markets. Tell us the destination markets and we will confirm the labelling before production.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/france-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'France',
    seoTitle: 'Cotton Towel Supplier for French Importers',
    seoDescription:
      'Cotton towel supplier for French importers, hotel groups and retail brands — towels made to your specification at our partner mill in Solapur, sample-first, FOB direct to Le Havre and Marseille.',
    heading: 'Cotton towel supplier for French importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur and shipped FOB direct — with French fibre-content and care labelling prepared for the order.',
    intro: [
      'French hospitality buys towels the way it buys everything else for a room: to a specification that has to hold across every property in the group, for years. That is a manufacturing problem more than a sourcing one. Colour is approved by lab dip before bulk dyeing and every batch is checked against the sample you approved, so the towels that arrive for a second property match the ones already in service at the first.',
      'Fibre-content and care labelling is prepared in French, goods are REACH and GPSR compliant, and the certificate of origin, commercial invoice and packing list your clearing agent asks for are prepared with each shipment. Production is at our manufacturing partner V P Mundada in Solapur, weaving since 1972, quoted FOB direct from the mill.',
    ],
    buyers: [
      'Hotel groups, resorts and hospitality linen suppliers',
      'Importers and wholesale distributors supplying French retail',
      'Retail and private-label brands',
      'Spa, thalasso and wellness operators',
    ],
    faqs: [
      {
        q: 'Which French ports do you ship to?',
        a: 'We coordinate FOB shipment to Le Havre, Marseille-Fos and Dunkerque; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Is labelling prepared in French?',
        a: 'Yes — fibre content, care instructions and country of origin are prepared in French as part of the order, and your own brand artwork is applied to the same specification.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },


  'export/spain-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Spain',
    seoTitle: 'Cotton Towel Supplier for Spanish Importers & Hotels',
    seoDescription:
      'Cotton towel supplier for Spanish hotel groups, importers and retail brands — pool, beach and bath ranges made to your specification at our partner mill in Solapur, FOB direct to Valencia and Barcelona.',
    heading: 'Cotton towel supplier for Spain.',
    lead: 'Pool and beach towels, hotel bath ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur and shipped FOB direct — built for Spanish resort and hospitality volumes.',
    intro: [
      'Spanish hospitality runs on pool and beach towels in quantities most markets never touch, and they fail differently from bath towels: sun, chlorine and daily industrial washing pull colour out of a poorly dyed towel within a season. Vat-dyed cotton is the usual answer, and colour is approved by lab dip before bulk dyeing so a mid-season top-up matches the towels already at the poolside.',
      'Bath ranges, bathrobes and bath mats can be produced to one matched specification for the same property. Fibre-content and care labelling is prepared in Spanish, goods are REACH and GPSR compliant, and everything is woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct.',
    ],
    buyers: [
      'Hotel groups, resorts and beach clubs',
      'Importers and distributors supplying Spanish hospitality',
      'Retail and private-label brands',
      'Spa, wellness and holiday-apartment operators',
    ],
    faqs: [
      {
        q: 'Which Spanish ports do you ship to?',
        a: 'We coordinate FOB shipment to Valencia, Barcelona, Algeciras and Bilbao; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Will pool towel colour survive a season of sun and chlorine?',
        a: 'Vat-dyed cotton is what we usually recommend for pool and beach programmes precisely because it holds colour through sun exposure and repeated commercial washing. Tell us the colours you need and we will develop lab dips for your approval before bulk.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/italy-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Italy',
    seoTitle: 'Cotton Towel Supplier for Italian Importers',
    seoDescription:
      'Cotton towel supplier for Italian importers, hotel groups and private-label brands — jacquard, waffle and bordered towels made to your design at our partner mill in Solapur, FOB direct to Genoa and La Spezia.',
    heading: 'Cotton towel supplier for Italian importers.',
    lead: 'Jacquard, waffle, bordered and plain cotton towels developed to your design at our partner mill in Solapur — for Italian retail brands, hotel groups and distributors, shipped FOB direct.',
    intro: [
      'Italian buyers tend to arrive with a design rather than a product code, which is the kind of brief this mill is set up for. Jacquard and dobby patterns are woven in, not printed, so the design holds through the wash instead of fading out of step with the towel; waffle and one-side-terry constructions are available where the look matters as much as the absorbency.',
      'Send a drawing, a photograph or a towel you already buy, and we will develop a matching specification — construction, border, GSM, colour — and quote against it before you commit. Colour is approved by lab dip before bulk dyeing, labelling is prepared in Italian, and goods are REACH and GPSR compliant.',
    ],
    buyers: [
      'Retail and private-label brands developing own designs',
      'Hotel groups, resorts and hospitality linen suppliers',
      'Importers and wholesale distributors',
      'Spa and wellness operators',
    ],
    faqs: [
      {
        q: 'Which Italian ports do you ship to?',
        a: 'We coordinate FOB shipment to Genoa, La Spezia, Livorno and Trieste; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Can you weave our own jacquard design?',
        a: 'Yes — jacquard and dobby designs are developed to your artwork and woven into the towel rather than printed on it. Send the design and we will produce a sample for your approval before any bulk production begins.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/sweden-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Sweden',
    seoTitle: 'Cotton Towel Supplier for Swedish Importers',
    seoDescription:
      'Cotton towel supplier for Swedish importers, hotel groups and retail brands — OEKO-TEX and GOTS certified production, sample-first, FOB direct to Gothenburg.',
    heading: 'Cotton towel supplier for Swedish importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur — produced under OEKO-TEX and BSCI certification and shipped FOB direct to Gothenburg.',
    intro: [
      'Swedish buyers ask about the mill before they ask about the towel, and they ask for it in writing. The certification exists: OEKO-TEX STANDARD 100, MADE IN GREEN and STeP, ISO 9001:2015, GRS and amfori BSCI at our manufacturing partner V P Mundada in Solapur, and GOTS Version 7.0 for organic cotton linen through our partner Cotonex in Karur.',
      'Beyond the paperwork, the commercial relationship is direct — quotations and shipment come FOB from the mill, not through a trading chain — so a question about the dyehouse or the working conditions is answered by the people running the floor. Labelling is prepared in Swedish, and goods are REACH and GPSR compliant.',
    ],
    buyers: [
      'Importers and distributors supplying Swedish retail',
      'Hotel groups, spa and hospitality linen suppliers',
      'Retail and private-label brands with sustainability reporting',
      'Institutional and contract buyers',
    ],
    faqs: [
      {
        q: 'Which Swedish ports do you ship to?',
        a: 'We coordinate FOB shipment to Gothenburg, the largest port in Scandinavia, and to Stockholm, Helsingborg or Malmo where your forwarder prefers; the onward leg is handled by your freight forwarder.',
      },
      {
        q: 'Can you supply organic or recycled cotton?',
        a: 'Organic cotton linen is made by our partner Cotonex in Karur under GOTS Version 7.0, and the towel mill holds Global Recycled Standard certification. Tell us which standard your programme needs and we will confirm what can be supplied against it.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/sweden', label: 'Exporting to Sweden' },
  },

  'export/norway-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Norway',
    seoTitle: 'Cotton Towel Supplier for Norwegian Importers',
    seoDescription:
      'Cotton towel supplier for Norwegian importers, hotel groups and retail brands — towels made to your specification at our partner mill in Solapur, sample-first, FOB direct to Oslo, with full clearance documentation.',
    heading: 'Cotton towel supplier for Norwegian importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur and shipped FOB direct to Norway, with the documentation your customs agent needs prepared for each shipment.',
    intro: [
      'Norway sits outside the EU customs union, so a shipment clears differently from one going to Sweden or Denmark next door — and the paperwork is where that difference shows up. Certificate of origin, commercial invoice, packing list and the supporting compliance documentation your customs agent asks for are prepared as a standard part of every shipment, not assembled after the container has sailed.',
      'The towels are made to your brief at our manufacturing partner V P Mundada in Solapur, weaving since 1972, under OEKO-TEX, ISO 9001:2015, GRS and amfori BSCI certification. A physical sample is approved before bulk, and colour is fixed by lab dip before bulk dyeing so repeat orders match.',
    ],
    buyers: [
      'Importers and distributors supplying Norwegian retail',
      'Hotel groups, resorts and hospitality linen suppliers',
      'Retail and private-label brands',
      'Spa, wellness and institutional buyers',
    ],
    faqs: [
      {
        q: 'Which Norwegian ports do you ship to?',
        a: 'We coordinate FOB shipment to Oslo, and to Gothenburg or Hamburg where your forwarder prefers to route overland from there; the onward leg is handled by your freight forwarder.',
      },
      {
        q: 'Does Norway being outside the EU change anything for us?',
        a: 'It changes the clearance paperwork rather than the product. Certificate of origin, commercial invoice, packing list and supporting compliance documentation are prepared for each shipment — tell us what your customs agent requires and we will confirm it before dispatch.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/norway', label: 'Exporting to Norway' },
  },

  'export/denmark-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Denmark',
    seoTitle: 'Cotton Towel Supplier for Danish Importers',
    seoDescription:
      'Cotton towel supplier for Danish importers, hotel groups and design-led retail brands — OEKO-TEX certified towels made to your specification at our partner mill in Solapur, FOB direct to Aarhus and Copenhagen.',
    heading: 'Cotton towel supplier for Danish importers.',
    lead: 'Bath towels, waffle and bordered ranges, bathrobes and bath mats developed to your specification at our partner mill in Solapur — under OEKO-TEX certification, shipped FOB direct.',
    intro: [
      'Danish retail buys textiles on design and on provenance, usually in that order, and expects both to be verifiable. Weave, border, colour and finish are developed to your brief rather than picked from a range — waffle, dobby border, jacquard, zero-twist — and the mill\'s OEKO-TEX STANDARD 100, MADE IN GREEN and STeP certification, along with ISO 9001:2015, GRS and amfori BSCI, is the provenance side of that answered in documents rather than assurances.',
      'A physical sample is approved before bulk on every order, and colour is fixed by lab dip before bulk dyeing so the second production run matches the first. Labelling is prepared in Danish, and goods are REACH and GPSR compliant.',
    ],
    buyers: [
      'Design-led retail and private-label brands',
      'Importers and distributors supplying Danish retail',
      'Hotel groups, spa and hospitality operators',
      'Institutional and contract buyers',
    ],
    faqs: [
      {
        q: 'Which Danish ports do you ship to?',
        a: 'We coordinate FOB shipment to Aarhus and Copenhagen, and to Hamburg or Gothenburg where your forwarder prefers to route from there; the onward leg is handled by your freight forwarder.',
      },
      {
        q: 'Can you develop a towel to our own design?',
        a: 'Yes — weave, border, GSM, colour and finish are built to your brief, and a physical sample is developed for your approval before any bulk production. Send a design, a reference product or a towel you already buy and we will quote against it.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },


  'export/japan-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Japan',
    seoTitle: 'Cotton Towel Supplier for Japanese Importers',
    seoDescription:
      'Cotton towel supplier for Japanese importers, hotel groups and retail brands — towels made to an approved sample at our partner mill in Solapur, OEKO-TEX certified, FOB direct to Tokyo, Yokohama and Kobe.',
    heading: 'Cotton towel supplier for Japanese importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats produced against an approved sample at our partner mill in Solapur and shipped FOB direct — for Japanese importers, hospitality groups and retail brands.',
    intro: [
      'Japanese buyers judge a supplier on the third shipment, not the first. Anyone can make a good sample; the question is whether production two years from now still matches it. That is why colour is approved by lab dip before bulk dyeing and every batch is checked against the approved sample — and why nothing enters bulk production before you have had a physical sample in your hands and said yes to it.',
      'Orders often start small and grow, and that is a normal way to begin here rather than something to apologise for: a first order at trial volume tells you more about a mill than any certificate. The mill holds OEKO-TEX STANDARD 100, MADE IN GREEN and STeP, ISO 9001:2015, GRS and amfori BSCI certification, and quotations come FOB direct from the mill, not through a trading chain.',
    ],
    buyers: [
      'Importers and trading companies supplying Japanese retail',
      'Hotel groups, ryokan and hospitality linen suppliers',
      'Retail and private-label brands',
      'Spa, onsen and wellness operators',
    ],
    faqs: [
      {
        q: 'Which Japanese ports do you ship to?',
        a: 'We coordinate FOB shipment to Tokyo, Yokohama, Kobe, Osaka and Nagoya; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Can we start with a trial order before committing to volume?',
        a: 'Yes, and it is a sensible way to begin. Tell us the specification and the trial quantity you have in mind and our export team will confirm what is workable for that product before you order.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/south-korea-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'South Korea',
    seoTitle: 'Cotton Towel Supplier for South Korean Importers',
    seoDescription:
      'Cotton towel supplier for Korean importers, hotel groups and private-label brands — OEKO-TEX certified towels made to your specification at our partner mill in Solapur, FOB direct to Busan and Incheon.',
    heading: 'Cotton towel supplier for South Korean importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur and shipped FOB direct to Busan and Incheon — for Korean importers, hospitality groups and retail brands.',
    intro: [
      'Korean hospitality and retail both move quickly on ranges, which puts the pressure on development time rather than on price alone. Send a reference product or a brief and we will develop a matching specification — GSM, construction, border, colour — and quote against it before you commit to anything, with a physical sample approved before bulk.',
      'Production is at our manufacturing partner V P Mundada in Solapur, weaving since 1972, under OEKO-TEX STANDARD 100, MADE IN GREEN and STeP, ISO 9001:2015, GRS and amfori BSCI certification. Colour is approved by lab dip before bulk dyeing, so when a range reorders it matches what is already on the shelf.',
    ],
    buyers: [
      'Importers and distributors supplying Korean retail',
      'Hotel groups, resorts and hospitality linen suppliers',
      'Retail, e-commerce and private-label brands',
      'Spa, jjimjilbang and wellness operators',
    ],
    faqs: [
      {
        q: 'Which Korean ports do you ship to?',
        a: 'We coordinate FOB shipment to Busan, one of the world\'s largest container ports, and to Incheon; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'How quickly can you develop a sample from our reference?',
        a: 'Development time depends on the construction and whether new colours need lab dips. Send the reference and we will confirm a realistic sample timeline along with the quotation, rather than promising a date before we have seen it.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/new-zealand-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'New Zealand',
    seoTitle: 'Cotton Towel Supplier for New Zealand Importers',
    seoDescription:
      'Cotton towel supplier for New Zealand importers, hotels and retail brands — bath, pool and beach ranges made to your specification at our partner mill in Solapur, FOB direct to Auckland and Tauranga.',
    heading: 'Cotton towel supplier for New Zealand importers.',
    lead: 'Bath towels, pool and beach ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur and shipped FOB direct to New Zealand.',
    intro: [
      'New Zealand orders are usually smaller than Australian ones and the freight leg is longer, which makes what goes into a container matter more than how often one ships. A single order can combine several specifications — bath, pool and beach, bathrobes, bath mats — so a season\'s range travels together instead of arriving in pieces across three shipments.',
      'Everything is built to your brief at our manufacturing partner V P Mundada in Solapur, with a physical sample approved before bulk and lab-dip colour approval before bulk dyeing, so next season\'s repeat matches this one. Certificate of origin, commercial invoice and packing list are prepared with each shipment.',
    ],
    buyers: [
      'Importers and wholesale distributors supplying NZ retail',
      'Hotels, lodges, motels and holiday-park operators',
      'Surf, beach and lifestyle brands running private label',
      'Spa, gym and aged-care buyers',
    ],
    faqs: [
      {
        q: 'Which New Zealand ports do you ship to?',
        a: 'We coordinate FOB shipment to Auckland, Tauranga and Lyttelton; your freight forwarder handles routing and the onward leg from origin.',
      },
      {
        q: 'Can we combine several products in one shipment?',
        a: 'Yes — a single order can carry several specifications across bath, pool, beach, robes and mats. Because colour is lab-dip approved before bulk dyeing, the whole range still arrives consistent with what you approved.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/poland-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Poland',
    seoTitle: 'Cotton Towel Supplier for Polish Importers',
    seoDescription:
      'Cotton towel supplier for Polish importers, hotel groups and retail buyers — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct, with EU-standard export documentation.',
    heading: 'Cotton towel supplier for Polish importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Polish importers, distributors and hospitality buyers.',
    intro: [
      "Poland's hotel and hospitality sector has expanded faster than its neighbours over the last decade, and a fair share of that growth is in mid-market and business hotels rather than five-star flagships — which puts a premium on towels that hold a consistent standard across a large property count rather than a single showpiece property. As an EU member state, Poland sits in the same regulatory framework as our existing German, Dutch and French buyers, so the same certification and documentation set already answers most compliance questions before they're asked.",
      "Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct. Bath towels, hotel and border ranges, bathrobes and bath mats are built to your GSM, size, colour and border, with a physical sample approved and colour fixed by lab dip before anything goes to bulk — the sequence that keeps a hundred-property rollout consistent rather than assembled from whatever shipped closest to on time.",
    ],
    buyers: [
      'Importers and distributors supplying Polish and Central European retail',
      'Hotel groups and property management companies running multiple sites',
      'Retail and private-label brands developing own-brand towel lines',
      'Spa, wellness and healthcare institutional buyers',
    ],
    faqs: [
      {
        q: 'Does EU membership change anything about how you document a shipment to Poland?',
        a: 'The compliance documentation is the same set we prepare for our German, Dutch and French shipments — certificate of origin, commercial invoice, packing list and supporting paperwork — since Poland sits in the same EU regulatory framework as those markets.',
      },
      {
        q: 'Can you support a rollout across multiple properties at once?',
        a: 'Yes — one order can be built to a single specification and shipped as one consignment, with colour fixed by lab dip so every property in the rollout receives the same standard rather than a batch-to-batch drift.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/poland', label: 'Exporting to Poland' },
  },

  'export/qatar-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Qatar',
    seoTitle: 'Cotton Towel Supplier for Qatar Importers & Hotels',
    seoDescription:
      'Cotton towel supplier for Qatar hotel groups, importers and private-label brands — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Hamad Port.',
    heading: 'Cotton towel supplier for Qatar importers and hotels.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Qatar.',
    intro: [
      "Qatar has been building hotel capacity faster than almost anywhere else in the Gulf over the past several years, and a lot of that new supply sits at the upper end — five-star and luxury properties where guests notice towel quality specifically, not just whether one was provided. That raises the bar on GSM, hand-feel and colour consistency compared with a budget or mid-market programme, and it's worth specifying accordingly rather than defaulting to a standard hospitality spec.",
      'Qatar is a member of the Gulf Cooperation Council alongside the UAE and Saudi Arabia, both existing export markets for us, so the certification and compliance documentation we already prepare for those shipments — OEKO-TEX, ISO, BSCI, certificate of origin — covers the same ground here. Production is at our manufacturing partner V P Mundada in Solapur, weaving since 1972, with FOB shipment coordinated to Hamad Port.',
    ],
    buyers: [
      'Luxury and five-star hotel groups and resort operators',
      'Importers and distributors supplying Qatari hospitality',
      'Private-label brands developing branded guest amenity ranges',
      'Spa and wellness operators within hotel and resort properties',
    ],
    faqs: [
      {
        q: 'Can you meet the specification expected at a five-star property?',
        a: "Yes — GSM, yarn and finish are built to your brief rather than a fixed standard hospitality spec, and a physical sample is approved before bulk so you can confirm hand-feel and weight match what a luxury property expects before committing.",
      },
      {
        q: 'Which port do you ship to for Qatar?',
        a: 'FOB shipment is coordinated to Hamad Port; your freight forwarder confirms routing and the onward leg to your warehouse or property.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/oman-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Oman',
    seoTitle: 'Cotton Towel Supplier for Oman Importers & Hotels',
    seoDescription:
      'Cotton towel supplier for Oman hotel groups, importers and distributors — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Sohar and Salalah.',
    heading: 'Cotton towel supplier for Oman importers and hotels.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Oman.',
    intro: [
      "Oman's tourism sector has been growing more deliberately than its Gulf neighbours — fewer mega-developments, more mid-size resorts and heritage properties — which tends to favour buyers who want a mill relationship they can reorder from consistently over several years rather than a one-off bulk purchase for a single opening. That consistency is largely a colour and batch-tracking question: lab-dip approval before bulk dyeing, and every batch checked against what you approved originally.",
      "As a member of the Gulf Cooperation Council alongside the UAE, Saudi Arabia and Qatar, Oman sits in a regulatory environment our export documentation already covers. Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct with shipment coordinated to Sohar or Salalah depending on your onward routing.",
    ],
    buyers: [
      'Resort, heritage and boutique hotel operators',
      'Importers and distributors supplying Omani hospitality and retail',
      'Private-label brands developing own-brand towel ranges',
      'Spa and wellness operators',
    ],
    faqs: [
      {
        q: 'Which ports do you ship to for Oman?',
        a: 'FOB shipment is coordinated to Sohar or Salalah depending on your preferred routing; your freight forwarder confirms which suits your onward leg.',
      },
      {
        q: 'Can we reorder years later and still match the original order?',
        a: "Yes — colour is fixed by lab dip before bulk dyeing and every batch is checked against the sample you originally approved, which is what keeps a reorder placed years later matching what's already in service.",
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/brazil-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Brazil',
    seoTitle: 'Cotton Towel Supplier for Brazilian Importers',
    seoDescription:
      'Cotton towel supplier for Brazilian importers, hotel groups and retail distributors — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Santos.',
    heading: 'Cotton towel supplier for Brazilian importers.',
    lead: 'Bath towels, beach and pool ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Brazil.',
    intro: [
      "Brazil is the largest single hospitality and retail market in South America, and buyers here are as likely to be sourcing beach and pool ranges as bath programmes — Brazil's own coastline drives a genuinely large domestic pool-towel and beach-towel category alongside standard hotel bath ranges, which is worth specifying separately since the colour and weight decisions for each are different (striped or patterned for pool and beach, matched-set consistency for bath).",
      "Brazil is a founding member of Mercosur, the regional trade bloc it shares with Argentina, Uruguay and Paraguay. Towels are woven at our manufacturing partner V P Mundada in Solapur and quoted FOB direct, with shipment coordinated to Santos — Brazil's principal container port — and certificate of origin, commercial invoice and packing list prepared as standard.",
    ],
    buyers: [
      'Importers and distributors supplying Brazilian retail and hospitality',
      'Hotel, resort and beach-club operators',
      'Retail chains and private-label brands',
      'Spa and wellness operators',
    ],
    faqs: [
      {
        q: 'Which Brazilian port do you ship to?',
        a: 'FOB shipment is coordinated to Santos, Brazil’s principal container port; your freight forwarder handles routing and the onward leg from there.',
      },
      {
        q: 'Can you supply beach and pool towels alongside a hotel bath programme?',
        a: 'Yes — both can be produced to a matched or separately specified colourway in the same order, with striped or patterned colourways generally recommended for pool and beach use since they hide chlorine and sun staining better than solid white.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/south-america', label: 'Exporting to South America' },
  },

  'export/mexico-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Mexico',
    seoTitle: 'Cotton Towel Supplier for Mexican Importers & Resorts',
    seoDescription:
      'Cotton towel supplier for Mexican resorts, hotel groups and importers — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Manzanillo.',
    heading: 'Cotton towel supplier for Mexican importers and resorts.',
    lead: 'Bath towels, pool and beach ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Mexico.',
    intro: [
      "Mexico's resort corridor — Cancun, the Riviera Maya, Los Cabos and Puerto Vallarta among others — runs some of the highest towel turnover of any hospitality market we quote for, since pool and beach towels there are used once per lounger session rather than reused across a stay. That volume makes colourway the first decision rather than an afterthought: striped or patterned pool towels visibly outlast solid white against chlorine and sun exposure, which matters more at resort-scale turnover than it does for a standard city hotel.",
      "Mexico is part of the USMCA trade agreement alongside the United States and Canada, both existing export markets for us. Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct, with shipment coordinated to Manzanillo, Mexico's principal Pacific container port.",
    ],
    buyers: [
      'Resort groups and beach-club operators along Mexico’s coastal corridors',
      'Importers and distributors supplying Mexican retail and hospitality',
      'Private-label brands developing resort-branded amenity ranges',
      'Spa and wellness operators within resort properties',
    ],
    faqs: [
      {
        q: 'Which Mexican port do you ship to?',
        a: 'FOB shipment is coordinated to Manzanillo, Mexico’s principal Pacific container port; your freight forwarder confirms routing and the onward leg to your destination.',
      },
      {
        q: 'What colourway do you recommend for a resort pool programme?',
        a: 'Striped or patterned colourways over solid white, since resort-scale turnover means more chlorine and sun exposure per towel than a standard hotel sees, and pattern hides that staining far better than white does.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/chile-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Chile',
    seoTitle: 'Cotton Towel Supplier for Chilean Importers',
    seoDescription:
      'Cotton towel supplier for Chilean importers, hotel groups and retail distributors — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to San Antonio.',
    heading: 'Cotton towel supplier for Chilean importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Chile.',
    intro: [
      "Chilean distributors buying towels from India are usually comparing an Indian mill against options from China or Brazil on landed cost first, and on whether quality holds through a second and third order second — which is exactly where a supplier's process, not its price list, ends up mattering. Lab-dip colour approval before bulk dyeing and batch checking against the original sample are what keep a reorder placed a year later matching the one already on the shelf.",
      'Chile is a member of the Pacific Alliance alongside Mexico, Colombia and Peru — all export markets for us. Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct, with shipment coordinated to San Antonio, Chile’s principal container port.',
    ],
    buyers: [
      'Importers and distributors supplying Chilean retail and hospitality',
      'Hotel groups and resort operators',
      'Retail chains and private-label brands',
      'Spa and wellness institutional buyers',
    ],
    faqs: [
      {
        q: 'Which Chilean port do you ship to?',
        a: 'FOB shipment is coordinated to San Antonio, Chile’s principal container port; your freight forwarder handles routing and the onward leg from there.',
      },
      {
        q: 'How do you compare on landed cost against a Chinese or Brazilian supplier?',
        a: 'We quote FOB direct from the mill so you can build the landed cost comparison yourself with your own freight rates — what we can tell you directly is the process behind the price: sample-first, lab-dip colour approval, and batch checking against what you approved.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/colombia-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Colombia',
    seoTitle: 'Cotton Towel Supplier for Colombian Importers',
    seoDescription:
      'Cotton towel supplier for Colombian importers, hotel groups and resort operators — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Cartagena.',
    heading: 'Cotton towel supplier for Colombian importers.',
    lead: 'Bath towels, pool and beach ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Colombia.',
    intro: [
      "Cartagena's hotel and resort sector has grown into one of the more established hospitality markets on Colombia's coast, and buyers there tend to need both a bath-towel programme for rooms and a separate pool or beach specification for the waterfront side of the property — two different colour and weight decisions under one order rather than one specification stretched to cover both jobs.",
      'Colombia is a member of the Pacific Alliance alongside Mexico, Chile and Peru. Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct, with shipment coordinated to Cartagena, Colombia’s principal Caribbean container port.',
    ],
    buyers: [
      'Hotel and resort operators along Colombia’s Caribbean coast',
      'Importers and distributors supplying Colombian retail and hospitality',
      'Retail chains and private-label brands',
      'Spa and wellness operators',
    ],
    faqs: [
      {
        q: 'Which Colombian port do you ship to?',
        a: 'FOB shipment is coordinated to Cartagena, Colombia’s principal Caribbean container port; your freight forwarder confirms routing and the onward leg from there.',
      },
      {
        q: 'Can a bath and pool towel programme be ordered together?',
        a: 'Yes — they are usually specified separately even within one order, since a bath programme is built for matched-set consistency while a pool or beach range is usually better in a striped or patterned colourway to handle chlorine and sun exposure.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'export/peru-cotton-towel-supplier': {
    section: 'export',
    eyebrow: 'Peru',
    seoTitle: 'Cotton Towel Supplier for Peruvian Importers',
    seoDescription:
      'Cotton towel supplier for Peruvian importers, hotel groups and retail distributors — 100% cotton ringspun towels made at our partner mill in Solapur, sample-first, FOB direct to Callao.',
    heading: 'Cotton towel supplier for Peruvian importers.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats in 100% cotton ringspun, made to your specification at our partner mill in Solapur and shipped FOB direct to Peru.',
    intro: [
      "Peru's hospitality demand runs across two quite different property types — city hotels in Lima serving business travel, and the tourism circuit around Cusco and the Sacred Valley serving a completely different guest — and a specification that works for one doesn't automatically suit the other. Altitude properties around Cusco run smaller, more boutique operations where a consistent matched set across a modest room count matters more than volume pricing.",
      'Peru is a member of the Pacific Alliance alongside Mexico, Chile and Colombia. Towels are woven at our manufacturing partner V P Mundada in Solapur, weaving since 1972, and quoted FOB direct, with shipment coordinated to Callao, Peru’s principal container port near Lima.',
    ],
    buyers: [
      'City hotels and business-travel properties in Lima',
      'Boutique hotels and lodges on the Cusco and Sacred Valley tourism circuit',
      'Importers and distributors supplying Peruvian retail and hospitality',
      'Private-label brands and spa operators',
    ],
    faqs: [
      {
        q: 'Which Peruvian port do you ship to?',
        a: 'FOB shipment is coordinated to Callao, Peru’s principal container port near Lima; your freight forwarder handles routing and the onward leg from there.',
      },
      {
        q: 'Can a small boutique property still get a matched specification?',
        a: "Yes — order size doesn't change the process. A physical sample is approved before bulk regardless of quantity, so even a modest room count gets the same matched-set consistency a larger property would.",
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'solutions/cotton-towel-manufacturer-india': {
    section: 'solutions',
    eyebrow: 'Sourcing from India',
    // "Manufacturer" and "exporter" are searched about equally for this —
    // covering both here, rather than picking one, is why both appear.
    seoTitle: 'Cotton Towel Manufacturer & Exporter in India',
    seoDescription:
      'Cotton towel manufacturer and exporter in Solapur, India, since 1972 — OEKO-TEX, ISO and BSCI certified, plus GOTS-certified organic cotton linen via our partner in Karur. Sample-first, FOB direct from Nhava Sheva and Mundra.',
    heading: 'Cotton towel manufacturer in India.',
    lead: 'Bath towels, hotel ranges, bathrobes and bath mats made to your specification at our partner mill in Solapur — one of India\'s oldest towel-weaving centres — and shipped FOB direct from Nhava Sheva or Mundra to importers worldwide.',
    intro: [
      'Solapur has been a towel-weaving city for longer than most of the mills operating there today, and ours is one of them: V P Mundada has been weaving in Solapur since 1972. That matters to a buyer evaluating India as a source, not just this one supplier, because a manufacturing cluster this established means depth — trained weaving and finishing labour, dyehouses built for cotton terry specifically, and a supply chain used to producing at export volume, not a single factory operating in isolation.',
      'India also grows a large share of the world\'s cotton, which is the other half of why buyers evaluate it as a source in the first place — raw material proximity keeps cost and lead time more predictable than importing cotton to weave elsewhere. What we add on top of that is process: a physical sample approved before bulk, colour fixed by lab dip before bulk dyeing, and certification — OEKO-TEX STANDARD 100, MADE IN GREEN and STeP, ISO 9001:2015, GRS and amfori BSCI at the towel mill — that answers the compliance questions a first-time buyer from India usually has before anything else.',
      'Cotton is not one product here, either. Towels are woven at V P Mundada in Solapur; organic cotton bed and table linen is made by our partner Cotonex in Karur under GOTS Version 7.0 — a separate certification, for a separate line, and one worth naming correctly rather than folding into the towel mill\'s certifications as if it were the same claim.',
    ],
    buyers: [
      'Importers and distributors opening a new supply line from India',
      'Retail and hospitality brands diversifying their supplier base',
      'Private-label brands looking for a mill rather than a trading company',
      'Buyers already importing from India who want to add towels to an existing supply chain',
    ],
    faqs: [
      {
        q: 'Why do so many towel buyers source from India?',
        a: 'Raw cotton availability, weaving expertise concentrated in established manufacturing clusters like Solapur, and export infrastructure built specifically around textile shipments all keep FOB pricing competitive without a compromise on certification or process — which is why India remains one of the largest towel-exporting countries rather than a low-cost alternative to something better made elsewhere.',
      },
      {
        q: 'Which Indian ports do you ship from?',
        a: 'FOB shipment is coordinated from Nhava Sheva (JNPT) near Mumbai and from Mundra in Gujarat, the two ports handling the large majority of India\'s containerised textile exports; your freight forwarder confirms routing and the onward leg to your destination.',
      },
      {
        q: 'Which countries do you currently export to?',
        a: 'North America (the USA, Canada and Mexico), Europe (the UK, Germany, the Netherlands, France, Spain, Italy, Sweden, Norway, Denmark and Poland), the Middle East (the UAE, Saudi Arabia, Qatar and Oman), Asia-Pacific (Japan, South Korea, New Zealand and Australia), South Africa, and South America (including Brazil, Chile, Colombia and Peru). Container-load FOB shipping from Nhava Sheva or Mundra reaches all of these on standard commercial routes — see the sourcing guide for your own country for the specifics that differ by destination, like labelling and customs documentation.',
      },
      {
        q: 'Do we deal with the mill directly, or through a trading company?',
        a: 'Directly. Kiran Global Exports quotes and ships FOB from our manufacturing partner V P Mundada in Solapur, so a specification question is answered by the people running the production floor, not relayed through an intermediary.',
      },
      {
        q: 'Can we also source organic cotton linen from India through you?',
        a: 'Yes — bed and table linen in organic cotton is made by our partner Cotonex in Karur, certified under GOTS Version 7.0. It ships alongside a towel order or on its own, quoted and documented separately since it is a different certification from the towel mill\'s.',
      },
      {
        q: 'How do I actually request a quotation?',
        a: 'Send us the product, an approximate quantity and your destination port — a reference product or photo helps if you already buy something similar elsewhere. We reply with a proposed specification and, once you confirm it, a physical sample follows before anything goes to bulk. For a container-load order, see our bulk hotel towels page for how packing and lead time are confirmed at that volume.',
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

  'solutions/bulk-hotel-towels': {
    section: 'solutions',
    eyebrow: 'Bulk Orders',
    seoTitle: 'Bulk Hotel Towels: Sizes, GSM, Materials & Customisation',
    seoDescription:
      'Bulk hotel towels by the container load — sizing, GSM and customisation explained, sample-first ordering, FOB shipping from our partner mill in Solapur.',
    heading: 'Bulk hotel towels, ordered right the first time.',
    lead: 'A container-load order behaves differently to a trial order — the sizing, packing and sampling sequence all change once quantity is real. Here is what to lock down before you place one, and how the process runs at our partner mill in Solapur.',
    intro: [
      "Buying towels by the container load is a different exercise to buying a case for a trial. Carton weight and packing efficiency start to matter — how many pieces fold into a standard carton, how that carton stacks in a container, and whether the size and fold you've specified actually uses the space efficiently or leaves a container part-empty on a fixed freight cost. None of this shows up on a small sample order, which is exactly why it's worth raising before the bulk order, not after the container is already booked.",
      'The sequence that protects a bulk order is the same one regardless of quantity, just with more at stake if a step is skipped: a physical sample approved first, colour fixed by lab dip before the bulk dyeing run, then production against the approved reference, followed by in-line quality checks before packing rather than only at the end. Skipping the lab-dip step on a large order is the single most common way a buyer ends up with a container of towels that technically match the sample but visibly do not sit right next to it.',
      'Customisation scales into bulk orders the same way it does into smaller ones — woven labels, hang tags, branded packaging and carton marking are all built into the production run rather than added afterward, which is both cheaper and more consistent than a separate branding pass on finished stock. Buyers building a private label range at bulk volume should also see our dedicated private-label page, which covers what can and cannot be customised in more depth.',
    ],
    buyers: [
      'Hotel groups and procurement teams placing container-load orders',
      'Distributors and wholesalers restocking multiple properties',
      'Hospitality group purchasing organisations (GPOs)',
      'Contract linen suppliers sourcing for several client hotels at once',
    ],
    faqs: [
      {
        q: 'How is a bulk order packed for shipping?',
        a: "Towels are folded and cartoned to make efficient use of container space — carton size and fold are agreed as part of the specification, not decided after production, since changing them late affects how many cartons fit per container and therefore the freight cost per piece.",
      },
      {
        q: 'How long does a bulk order take from sample approval to shipment?',
        a: 'It depends on the quantity, the specification and current production scheduling, so we confirm a realistic timeline once we know the product and the volume — tell us both and we will give you a real date, not a general estimate.',
      },
      {
        q: 'Can a bulk order still be customised, or only standard stock?',
        a: 'Customisation is built into the production run itself — GSM, size, colour, border, woven labels and packaging are all specified upfront for the full order, the same way they would be for a smaller batch.',
      },
      MOQ_FAQ,
      MATCH_FAQ,
      SAMPLE_FAQ,
    ],
    relatedMarket: { href: '/custom', label: 'Custom & Private Label' },
  },

  'solutions/hotel-towels-supplier-what-to-check': {
    section: 'solutions',
    eyebrow: 'Buyer Checklist',
    seoTitle: 'Hotel Towels Supplier for Bulk Orders: What Buyers Should Check',
    seoDescription:
      'What to verify before committing to a hotel towels supplier — sampling process, certification proof and mill transparency, from our partner mill in Solapur.',
    heading: 'Choosing a hotel towels supplier: what to check before you commit.',
    lead: "Most hotel towel disappointments trace back to a question that was never asked before the first order, not a defect in the product itself. This is the checklist worth running through with any supplier — including us — before committing to a bulk order.",
    intro: [
      "A hotel towel supplier's website almost always looks credible. Product photos, certification logos, a professional tone — none of that tells you whether the person you're emailing actually controls production or is relaying your questions to someone else three steps removed. The questions below are the ones that surface that difference quickly, and they apply whether you're evaluating us or anyone else.",
      "Ask which mill actually produces the order, by name, and whether you can request a sample directly tied to that mill's current production rather than a stock reference sample that may be years old. A supplier who answers this specifically and quickly is usually working close to the factory floor; one who deflects to \"our manufacturing partners\" without naming one is often further from production than their marketing suggests.",
      "Ask how colour is approved before bulk dyeing runs, not after. Lab-dip approval — a small dyed swatch signed off before the full batch is dyed — is standard practice among suppliers who actually manage their own quality process. Its absence is one of the more reliable predictors of a reorder that doesn't quite match the first shipment.",
    ],
    buyers: [
      'First-time importers evaluating suppliers before an initial order',
      'Procurement teams running a formal supplier qualification process',
      'Buyers who have been burned by a mismatch between sample and bulk before',
      'Hotel groups switching suppliers and wanting to avoid repeating a past mistake',
    ],
    faqs: [
      {
        q: 'How do I know if a supplier actually owns or controls the factory?',
        a: "Ask them to name the mill directly and describe their relationship to it plainly — a direct manufacturing partner will answer this without hesitation. Kiran Global Exports works with manufacturing partners in India, principally V P Mundada in Solapur, and quotes and ships directly from that relationship rather than through an intermediary trading company.",
      },
      {
        q: 'What certifications should I actually ask to see, not just read about?',
        a: 'Ask for the current certificate, not a logo on a webpage — OEKO-TEX Standard 100 for the finished product is the baseline most hospitality buyers check first, alongside ISO 9001 for quality management and BSCI or an equivalent for social compliance. A supplier should be able to produce these on request without delay.',
      },
      {
        q: 'What is a reasonable sampling process before a bulk order?',
        a: 'A physical sample developed to your specification, approved by you before production starts, with colour fixed by lab dip ahead of the bulk dyeing run. If a supplier proposes skipping straight to bulk production to save time on a first order, treat that as a cost saving that usually gets paid back with interest on the reorder.',
      },
      {
        q: 'What is a warning sign in early conversations with a supplier?',
        a: "Vagueness on the things that should have a direct answer — which mill, what the sampling sequence looks like, which certifications are current — is a more useful signal than price. A supplier confident in their own process answers these directly; one relaying between you and someone else tends to answer around them.",
      },
      MOQ_FAQ,
      SAMPLE_FAQ,
    ],
  },

  'solutions/hotel-pool-towels': {
    section: 'solutions',
    eyebrow: 'Pool & Resort',
    seoTitle: 'Hotel Pool Towels: A Practical Buyer’s Guide',
    seoDescription:
      'What makes a hotel pool towel hold up — colourway, weight and branding that survive chlorine and sun, supplied from our partner mill in Solapur.',
    heading: 'Hotel pool towels: built for chlorine, sun and daily turnover.',
    lead: "A pool towel fails differently to every other towel in a hotel — usually by looking worn out long before it actually is. That gap between how it looks and how it performs is mostly a colour decision, not a fabric one, and it's the first thing worth getting right.",
    intro: [
      "Solid white is the default most first-time buyers reach for, and it's usually the wrong one for a pool programme specifically. Chlorine bleaches unevenly rather than all at once, so a white pool towel develops patchy, faded areas that read as dirty well before the fabric has actually worn out. Sunscreen and tanning oil leave marks that don't fully launder out of white cotton either. Striped and patterned colourways hide all three problems, which is why almost every established resort pool programme has moved away from solid white — the ones still using it are usually the newest programmes, not the most experienced ones.",
      'Cotton terry remains the right base fabric for the absorbency guests expect straight out of a pool, at a weight chosen for reasonable dry time rather than maximum plushness — pool towel turnover is higher than an in-room programme, since a towel is typically used once per lounger session rather than reused across a stay, which puts more pressure on laundry throughput than a standard guest-room order does. Sizing also differs from a bath towel: a pool towel is used lying on a lounger as much as for drying, so buyers tend to specify larger than an equivalent bath towel while keeping the weight moderate.',
      "Branding — resort logos, property names — needs to survive the same sun and chlorine exposure the towel does. Woven labels and jacquard borders hold up best in this specific environment; heat-transfer branding is usually the first element to crack or fade poolside, faster than it would on an indoor towel that never sees direct sun.",
    ],
    buyers: [
      'Resorts and hotels with pool or beach-club facilities',
      'Property groups replacing a pool towel programme that faded or bleached faster than expected',
      'Leisure and wellness operators buying pool towels alongside spa or gym linen',
      'Distributors supplying pool towel programmes to multiple resort clients',
    ],
    faqs: [
      {
        q: 'Why do most resort pool towels use stripes instead of solid white?',
        a: "Chlorine, sunscreen and sun exposure all show up faster and more visibly on solid white than on a striped or patterned colourway. The fabric underneath often still has plenty of service life left when a white towel starts looking tired — the colour choice, not the cotton, is usually what's actually failing.",
      },
      {
        q: 'Should a pool towel be the same weight as a bath towel?',
        a: "Not necessarily. Pool towels are laundered more often — typically once per lounger session — so a moderate weight that dries faster between uses often works better than a heavier bath-towel-grade fabric, even though pool towels are usually sized larger than an equivalent bath towel.",
      },
      {
        q: 'What branding method holds up best on a poolside towel?',
        a: 'Woven labels and jacquard borders survive sun and chlorine exposure better than heat-transfer branding, which tends to crack or fade first in a poolside environment specifically.',
      },
      {
        q: 'Can pool towels be supplied alongside a bath towel programme from the same order?',
        a: 'Yes — pool and beach towels can be produced to match a property’s existing bath towel programme in border, branding and quality standard, or specified separately if the pool programme needs a different colourway.',
      },
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
