// Bespoke, hand-written copy for each market page (frontend/src/pages/
// MarketPage.jsx). Deliberately code, not a database field — copy lives
// here the same way every other page's copy lives in its own .jsx file
// (e.g. Export.jsx). The Market database record only controls activation
// (slug, status) — this file controls what the page actually says.
//
// The 4 REASONS are shared across every market on purpose: they're facts
// about how Kiran Global Exports operates (sample-first, direct mill
// terms, batch matching, export documentation), true regardless of the
// buyer's country — reusing them is honest, not templated. What must
// differ per market is the intro framing and at least one genuinely
// factual, country-specific detail (here: real major ports/logistics
// hubs — public geography, never an invented claim about buyers or
// shipment history we don't actually have).

export const REASONS = [
  {
    title: 'Sample-first, always',
    body: 'GSM, size, colour, border and packaging are set to your specification. Nothing goes to bulk production until you have approved a physical sample.',
  },
  {
    title: 'Direct mill terms',
    body: 'Quotations and shipment come directly from the mill on FOB terms — your commercial relationship is with the manufacturer, not a trading middleman.',
  },
  {
    title: 'Batch-matched repeat orders',
    body: 'Colour is approved by lab dip before bulk dyeing, and every batch is checked against the approved sample, so your second container matches your first.',
  },
  {
    title: 'Export documentation ready',
    body: 'Certificates of origin, packing lists and the compliance documentation your customs broker will ask for are prepared as a standard part of every order.',
  },
];

const MARKET_CONTENT = {
  australia: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Australia',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Australian importers and distributors — sample-first, FOB direct from our partner mill in Solapur, duty-free under the India-Australia ECTA.',
    heading: 'Terry towels, exported to Australia.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill, with most Indian-made terry textiles now entering Australia duty-free under the India-Australia Economic Cooperation and Trade Agreement — built for hospitality, retail and private-label buyers across Australia.',
    portsFaq: {
      q: 'Which Australian ports can you ship to?',
      a: 'We coordinate FOB shipment to major Australian ports including Sydney, Melbourne, Brisbane and Fremantle — your freight forwarder handles the onward leg from origin.',
    },
    tradeFaq: {
      q: 'Do Indian textile exports still attract import duty in Australia?',
      a: 'For most categories, no — since the India-Australia Economic Cooperation and Trade Agreement (ECTA) took effect in December 2022, over 90% of India’s textile and apparel exports enter Australia duty-free. We can confirm the applicable tariff line for your specific product before you order.',
    },
  },
  usa: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to the USA',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to US importers and distributors — sample-first, FOB direct from our partner mill in Solapur, with FTC-compliant fibre and origin labelling.',
    heading: 'Terry towels, exported to the United States.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill, with fibre-content and country-of-origin labelling prepared to FTC standards — built for hospitality groups, retail chains and private-label buyers across the US market.',
    portsFaq: {
      q: 'Which US ports can you ship to?',
      a: 'We coordinate FOB shipment to major US ports including Los Angeles/Long Beach, New York/New Jersey, Savannah and Houston — your freight forwarder handles the onward leg from origin.',
    },
    tradeFaq: {
      q: 'Do you meet US textile labelling requirements?',
      a: 'Yes — the US Textile Fiber Products Identification Act, enforced by the FTC, requires every textile product to disclose fibre content by percentage and country of origin. We prepare labelling to this standard as a default part of every US order.',
    },
  },
  canada: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Canada',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Canadian importers and distributors — sample-first, FOB direct from our partner mill in Solapur, with bilingual English/French fibre labelling.',
    heading: 'Terry towels, exported to Canada.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill, with fibre-content labelling produced in both English and French to meet Canada’s Textile Labelling Regulations — built for hospitality, retail and private-label buyers across Canada.',
    portsFaq: {
      q: 'Which Canadian ports can you ship to?',
      a: 'We coordinate FOB shipment to major Canadian ports including Vancouver, Montreal and Halifax — your freight forwarder handles the onward leg from origin.',
    },
    tradeFaq: {
      q: 'Do you provide bilingual labelling for the Canadian market?',
      a: 'Yes — Canada’s Textile Labelling and Advertising Regulations, enforced by the Competition Bureau, require fibre-content information in both English and French. We produce labels to this standard, with Quebec’s additional provincial requirements handled on request.',
    },
  },
  'south-america': {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to South America',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to importers and distributors across South America — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels, exported across South America.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across both Mercosur markets (Brazil, Argentina, Paraguay, Uruguay) and independently-tariffed markets like Peru, Colombia and Chile.',
    portsFaq: {
      q: 'Which South American ports can you ship to?',
      a: 'We coordinate FOB shipment to major ports across the region, including Santos (Brazil), Buenos Aires (Argentina), Callao (Peru) and Cartagena (Colombia) — confirm the exact port with our export team based on your country.',
    },
    tradeFaq: {
      q: 'Is the import duty the same across South America?',
      a: 'No — Brazil, Argentina, Paraguay and Uruguay apply Mercosur’s common external tariff (roughly 0-35% depending on the product, with some country-specific exceptions), while Peru, Colombia and Chile set their own independent import duties. Tell us your country and product and we’ll help you get the correct HS-code duty figure.',
    },
  },
  poland: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Poland',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Polish importers and distributors — sample-first, FOB direct from our partner mill in Solapur, cleared once for duty-free onward EU distribution.',
    heading: 'Terry towels, exported to Poland.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — cleared once into the EU and moved duty-free from there, which is why many buyers use Poland’s growing warehousing network to redistribute across Central and Eastern Europe.',
    portsFaq: {
      q: 'Which ports or routes can you ship to for Poland?',
      a: 'We coordinate FOB shipment to Baltic ports including Gdańsk and Gdynia, or via major Western European ports with onward trucking — our export team confirms the most efficient route for your volume.',
    },
    tradeFaq: {
      q: 'Does clearing customs in Poland affect onward EU distribution?',
      a: 'No extra duty is due — as an EU member, goods that clear customs in Poland (or any EU port) can then move freely to other EU countries without a further import duty, which is why several of our Polish buyers also supply neighbouring EU markets from the same shipment.',
    },
  },
  finland: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Finland',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Finnish importers and distributors — sample-first, FOB direct from our partner mill in Solapur, with OEKO-TEX certified options for sauna and wellness ranges.',
    heading: 'Terry towels, exported to Finland.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill, with OEKO-TEX Standard 100 certified cotton available — suited to Finland’s high per-capita demand for towels and robes through its sauna and spa culture, as well as hospitality and retail buyers generally.',
    portsFaq: {
      q: 'Which Finnish ports can you ship to?',
      a: 'We coordinate FOB shipment to Finnish ports including Helsinki and Kotka — your freight forwarder handles the onward leg from origin.',
    },
    tradeFaq: {
      q: 'Can you supply OEKO-TEX certified towels for Nordic buyers?',
      a: 'Yes — OEKO-TEX Standard 100 certification, commonly requested by Nordic retailers and hospitality buyers, is available on our cotton ranges; we provide the test certificate alongside your shipping documents.',
    },
  },
  sweden: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Sweden',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Swedish importers and distributors — sample-first, FOB direct from our partner mill in Solapur, with OEKO-TEX certified options.',
    heading: 'Terry towels, exported to Sweden.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill, with OEKO-TEX Standard 100 certified cotton available for buyers who need it — built for hospitality, retail and private-label buyers across Sweden and the wider Nordic market.',
    portsFaq: {
      q: 'Which Swedish ports can you ship to?',
      a: 'We coordinate FOB shipment to Swedish ports including Gothenburg — the largest port in Scandinavia — and Stockholm, with onward distribution across the Nordics.',
    },
    tradeFaq: {
      q: 'Can you meet Nordic sustainability and certification expectations?',
      a: 'Yes — OEKO-TEX Standard 100 certification, widely requested across Nordic retail and hospitality sourcing, is available on our cotton ranges, and we can quote against a specific certification requirement your buyer needs.',
    },
  },
  norway: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Norway',
    seoDescription:
      'Kiran Global Exports supplies cotton towels and bathrobes to Norwegian importers and distributors — sample-first, FOB direct from our partner mill in Solapur, with customs handled directly since Norway sits outside the EU customs union.',
    heading: 'Terry towels, exported to Norway.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — since Norway is part of the European Economic Area but not the EU customs union, we prepare shipments for direct Norwegian customs clearance rather than routing through another EU port.',
    portsFaq: {
      q: 'Which Norwegian ports can you ship to?',
      a: 'We coordinate FOB shipment to Norwegian ports including Oslo and Bergen — your freight forwarder handles the onward leg from origin.',
    },
    tradeFaq: {
      q: 'Is shipping to Norway handled the same way as EU countries like Sweden or Poland?',
      a: 'Not quite — Norway is in the European Economic Area but outside the EU customs union, so shipments clear Norwegian customs directly (typically via Oslo) rather than moving in duty-free from another EU port the way they would between EU member states.',
    },
  },
};

const MOQ_FAQ = {
  q: 'What is the minimum order quantity?',
  a: 'MOQ varies by product and is confirmed per specification once your sample is approved — ask our export team for the figure on the specific towel you need.',
};

const MATCH_FAQ = {
  q: 'Can you match an existing product we already import?',
  a: 'Yes — send a photo or a physical reference and we will develop a matching specification (GSM, construction, border, colour) before quoting.',
};

const PRIVATE_LABEL_FAQ = {
  q: 'Do you provide private-label or branded packaging?',
  a: 'Yes — woven labels, branded packaging and custom construction are all available; see our Custom & Private Label page for details.',
};

// Used when a market is created via the /hq dashboard with no bespoke
// entry above yet — an honest generic page rather than an error or a
// fabricated country-specific claim. Upgradeable any time by adding a
// real entry to MARKET_CONTENT.
function genericContent(countryName) {
  return {
    seoTitle: `Cotton Towel & Bathrobe Exporter to ${countryName}`,
    seoDescription: `Kiran Global Exports supplies cotton towels and bathrobes to importers and distributors in ${countryName} — sample-first, FOB direct from our partner mill in Solapur.`,
    heading: `Terry towels, exported to ${countryName}.`,
    lead: `Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers in ${countryName}.`,
    portsFaq: {
      q: `How do you handle shipping to ${countryName}?`,
      a: `We coordinate FOB shipment to your nearest major port or logistics hub — our export team will confirm the best routing for ${countryName} once your order is scoped.`,
    },
  };
}

export function getMarketContent(slug, countryName) {
  const bespoke = MARKET_CONTENT[slug];
  const base = bespoke || genericContent(countryName);
  return {
    ...base,
    faqs: [base.portsFaq, base.tradeFaq, MOQ_FAQ, MATCH_FAQ, PRIVATE_LABEL_FAQ].filter(Boolean),
  };
}
