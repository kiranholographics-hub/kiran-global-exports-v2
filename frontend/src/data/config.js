// ---------------------------------------------------------------------------
// KIRAN GLOBAL EXPORTS — central site configuration
// Edit this one file to update contact details, socials, and site-wide copy
// that appears in the header CTA, footer, floating inquire button, and the
// contact page. Nothing below should need to be hunted for elsewhere.
// ---------------------------------------------------------------------------

export const siteConfig = {
  brandName: 'Kiran Global Exports',
  tagline: 'Premium Towels & Rugs — International Exporter',
  domain: 'kiranglobal-exports.com',
  siteUrl: 'https://kiranglobal-exports.com',

  // Shown on /contact, in the footer, and from the floating inquire button.
  contact: {
    email: 'exportskiranglobal@gmail.com',
    whatsapp: '+919983911181', // E.164 format, no spaces — used to build wa.me links
    phone: '+919928911181',
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
    { labelKey: 'nav.rugs', href: '/rugs' },
    { labelKey: 'nav.linen', href: '/linen' },
    { labelKey: 'nav.collections', href: '/collections' },
    { labelKey: 'nav.export', href: '/export', hideFromHeader: true },
    { labelKey: 'nav.contact', href: '/contact' },
  ],

  headerCta: { labelKey: 'nav.startInquiry', href: '/contact' },

  productInterestOptions: [
    { value: 'Towels', labelKey: 'common.productInterestOptions.towels' },
    { value: 'Rugs', labelKey: 'common.productInterestOptions.rugs' },
    { value: 'Both', labelKey: 'common.productInterestOptions.both' },
    { value: 'Custom / Private Label', labelKey: 'common.productInterestOptions.custom' },
  ],

  exportRegions: [
    { value: 'India', labelKey: 'common.exportRegions.india' },
    { value: 'North America', labelKey: 'common.exportRegions.northAmerica' },
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

export function mailtoLink(subject = 'Product Inquiry — Kiran Global Exports') {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`;
}

export function telLink() {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`;
}
