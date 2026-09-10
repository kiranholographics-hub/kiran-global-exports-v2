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
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Australian importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Australia.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Australia.',
    portsFaq: {
      q: 'Which Australian ports can you ship to?',
      a: 'We coordinate FOB shipment to major Australian ports including Sydney, Melbourne, Brisbane and Fremantle — your freight forwarder handles the onward leg from origin.',
    },
  },
  usa: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to the USA',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to US importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to the United States.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across the US market.',
    portsFaq: {
      q: 'Which US ports can you ship to?',
      a: 'We coordinate FOB shipment to major US ports including Los Angeles/Long Beach, New York/New Jersey, Savannah and Houston — your freight forwarder handles the onward leg from origin.',
    },
  },
  canada: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Canada',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Canadian importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Canada.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Canada.',
    portsFaq: {
      q: 'Which Canadian ports can you ship to?',
      a: 'We coordinate FOB shipment to major Canadian ports including Vancouver, Montreal and Halifax — your freight forwarder handles the onward leg from origin.',
    },
  },
  'south-america': {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to South America',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to importers and distributors across South America — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported across South America.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across South American markets.',
    portsFaq: {
      q: 'Which South American ports can you ship to?',
      a: 'We coordinate FOB shipment to major ports across the region, including Santos (Brazil), Buenos Aires (Argentina), Callao (Peru) and Cartagena (Colombia) — confirm the exact port with our export team based on your country.',
    },
  },
  poland: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Poland',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Polish importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Poland.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Poland and the wider EU market.',
    portsFaq: {
      q: 'Which ports or routes can you ship to for Poland?',
      a: 'We coordinate FOB shipment to Baltic ports including Gdańsk and Gdynia, or via major Western European ports with onward trucking — our export team confirms the most efficient route for your volume.',
    },
  },
  finland: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Finland',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Finnish importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Finland.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Finland.',
    portsFaq: {
      q: 'Which Finnish ports can you ship to?',
      a: 'We coordinate FOB shipment to Finnish ports including Helsinki and Kotka — your freight forwarder handles the onward leg from origin.',
    },
  },
  sweden: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Sweden',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Swedish importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Sweden.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Sweden and the wider Nordic market.',
    portsFaq: {
      q: 'Which Swedish ports can you ship to?',
      a: 'We coordinate FOB shipment to Swedish ports including Gothenburg — the largest port in Scandinavia — and Stockholm, with onward distribution across the Nordics.',
    },
  },
  norway: {
    seoTitle: 'Cotton Towel & Bathrobe Exporter to Norway',
    seoDescription:
      'Kiran Global Exports supplies cotton towels, bathrobes and rugs to Norwegian importers and distributors — sample-first, FOB direct from our partner mill in Solapur.',
    heading: 'Terry towels and rugs, exported to Norway.',
    lead: 'Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Norway.',
    portsFaq: {
      q: 'Which Norwegian ports can you ship to?',
      a: 'We coordinate FOB shipment to Norwegian ports including Oslo and Bergen — your freight forwarder handles the onward leg from origin.',
    },
  },
};

const MOQ_FAQ = {
  q: 'What is the minimum order quantity?',
  a: 'MOQ varies by product and is confirmed per specification once your sample is approved — ask our export team for the figure on the specific towel or rug you need.',
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
    seoDescription: `Kiran Global Exports supplies cotton towels, bathrobes and rugs to importers and distributors in ${countryName} — sample-first, FOB direct from our partner mill in Solapur.`,
    heading: `Terry towels and rugs, exported to ${countryName}.`,
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
    faqs: [base.portsFaq, MOQ_FAQ, MATCH_FAQ, PRIVATE_LABEL_FAQ],
  };
}
