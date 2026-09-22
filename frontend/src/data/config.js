// ---------------------------------------------------------------------------
// KIRAN GLOBAL EXPORTS — central site configuration
// Edit this one file to update contact details, socials, and site-wide copy
// that appears in the header CTA, footer, floating inquire button, and the
// contact page. Nothing below should need to be hunted for elsewhere.
// ---------------------------------------------------------------------------

export const siteConfig = {
  brandName: 'Kiran Global Exports',
  tagline: 'Premium Towels & Linen — International Exporter',
  domain: 'www.kiranglobal-exports.com',
  siteUrl: 'https://www.kiranglobal-exports.com',

  // Shown on /contact, in the footer, and from the floating inquire button.
  contact: {
    email: 'exportskiranglobal@gmail.com',
    whatsapp: '+919983911181', // E.164 format, no spaces — used to build wa.me links
    phone: '+919983911181',
    address: 'Plot No. 15, Ram Krishna Marg, New Sanganer Road, Sodala, Jaipur, Rajasthan – 302019',
    person: 'Rajneesh Sharma',
    personTitle: 'Business Consultant, Exports',
    iecCode: '1305018427',
  },

  social: {
    linkedin: '',
    instagram: '',
  },

  nav: [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.towels', href: '/towels' },
    { labelKey: 'nav.linen', href: '/linen' },
    { labelKey: 'nav.collections', href: '/collections' },
    { labelKey: 'nav.export', href: '/export' },
    { labelKey: 'nav.contact', href: '/contact' },
    { labelKey: 'nav.updates', href: '/updates', hideFromHeader: true },
  ],

  headerCta: { labelKey: 'nav.startInquiry', href: '/contact' },

  productInterestOptions: [
    { value: 'Towels', labelKey: 'common.productInterestOptions.towels' },
    { value: 'Linen', labelKey: 'common.productInterestOptions.linen' },
    { value: 'Both', labelKey: 'common.productInterestOptions.both' },
    { value: 'Custom / Private Label', labelKey: 'common.productInterestOptions.custom' },
  ],

  exportRegions: [
    { value: 'North America', labelKey: 'common.exportRegions.northAmerica' },
    { value: 'South America', labelKey: 'common.exportRegions.southAmerica' },
    { value: 'Europe', labelKey: 'common.exportRegions.europe' },
    { value: 'Middle East', labelKey: 'common.exportRegions.middleEast' },
    { value: 'Australia', labelKey: 'common.exportRegions.australia' },
    { value: 'Asia-Pacific', labelKey: 'common.exportRegions.asiaPacific' },
  ],
};

export function waLink(message = "Hello, I'd like to know more about Kiran Global Exports.") {
  const digits = siteConfig.contact.whatsapp.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = 'Product Inquiry — Kiran Global Exports', body) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${siteConfig.contact.email}?${query.join('&')}`;
}

// The questions our export team has to ask anyway before it can quote.
// Buyers write to us directly rather than filling in the form, so the
// email they open is where the inquiry actually starts — putting these
// in it saves a round of back-and-forth on nearly every one.
//
// Grouped rather than listed flat: who is asking, what they want made,
// and the commercial terms. A buyer who cannot answer everything still
// sends it, which is why nothing here is phrased as required.
export function inquiryEmailBody({ productName, country } = {}) {
  return [
    'Hello Kiran Global Exports,',
    '',
    'Please send us a quotation for the following.',
    '',
    '--- Your details ---',
    'Company:                  ',
    'Contact name:             ',
    `Country:                  ${country || ''}`,
    '',
    '--- Product ---',
    `Product:                  ${productName || ''}`,
    'Size:                     ',
    'GSM / weight:             ',
    'Colour:                   ',
    'Quantity:                 ',
    'Packing:                  ',
    'Branding / label:         ',
    '',
    '--- Commercial ---',
    'Destination port:         ',
    'Target price (if any):    ',
    'Required delivery date:   ',
    'Sample required:          Yes / No',
    '',
    '--- Anything else we should know ---',
    '',
    '',
  ].join('\n');
}

export function telLink() {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`;
}

// Formats an E.164 Indian number ("+919983911181") for display as
// "+91 99839 11181" instead of a raw digit string.
export function formatPhoneDisplay(e164 = siteConfig.contact.phone) {
  const digits = e164.replace(/[^\d]/g, '');
  const country = digits.slice(0, digits.length - 10);
  const local = digits.slice(-10);
  return `+${country} ${local.slice(0, 5)} ${local.slice(5)}`;
}
