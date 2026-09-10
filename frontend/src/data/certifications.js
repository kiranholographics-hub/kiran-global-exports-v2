// Every entry with an `image` renders as a logo tile; `caption` (when set)
// is the small attribution line underneath clarifying who actually holds
// the certificate — required for every certificate held by our
// manufacturing partner rather than by Kiran Global Exports itself.
// A `text`-only entry (no image) renders as a plain compliance line for
// regulations that have no certificate to display (REACH, GPSR).
const MUNDADA = 'Held by our manufacturing partner, V P Mundada (Solapur)';

const certifications = [
  {
    name: 'amfori Trade with Purpose',
    image: '/images/certifications/amfori.webp',
    alt: 'amfori BSCI — held by our manufacturing partner, V P Mundada (Solapur)',
    caption: MUNDADA,
  },
  {
    name: 'ISO 9001',
    image: '/images/certifications/iso-9001.webp',
    alt: 'ISO 9001:2015 certification — held by our manufacturing partner, V P Mundada (Solapur)',
    caption: `${MUNDADA} · Certificate EGQ/2602VP/3950 · Issued by Hawk Eye Certifications`,
  },
  {
    name: 'Global Recycled Standard',
    image: '/images/certifications/grs.webp',
    alt: 'Global Recycled Standard (GRS) certification — held by our manufacturing partner, V P Mundada (Solapur)',
    caption: `${MUNDADA} · Scope Certificate [Confirm with Mundada] · Issued by Bureau Veritas`,
  },
  {
    name: 'OEKO-TEX STANDARD 100',
    image: '/images/certifications/oeko-tex-standard-100.webp',
    alt: 'OEKO-TEX® STANDARD 100 certification — held by our manufacturing partner, V P Mundada (Solapur)',
    caption: `${MUNDADA} · Certificate [Confirm with Mundada]`,
  },
  {
    name: 'OEKO-TEX STeP',
    image: '/images/certifications/oeko-tex-step.webp',
    alt: 'OEKO-TEX® STeP certification — held by our manufacturing partner, V P Mundada (Solapur)',
    caption: `${MUNDADA} · Certificate 24002312 · Hohenstein`,
  },
  {
    name: 'FIEO',
    image: '/images/certifications/fieo.webp',
    alt: 'Federation of Indian Export Organisations member — Kiran Global Exports registration',
  },
  {
    name: 'MSME Registered',
    image: '/images/certifications/msme.webp',
    alt: 'Ministry of MSME, Government of India registered — Kiran Global Exports registration',
  },
  {
    name: 'IEC',
    image: '/images/certifications/iec.webp',
    alt: 'Import Export Code registered — Kiran Global Exports registration',
  },
  {
    name: 'REACH & GPSR',
    text: 'REACH & GPSR compliant',
  },
];

export default certifications;
