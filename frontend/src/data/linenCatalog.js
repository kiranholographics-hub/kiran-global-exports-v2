// ---------------------------------------------------------------------------
// Linen product catalogue.
// ---------------------------------------------------------------------------
// Restructure note: Towels & Bath Linen and Kitchen Linen used to live
// here, but they duplicated products already on the Towels page (the
// exact same Zero Twist Towel and Jacquard Beach Towel, for instance) —
// confusing for visitors and a duplicate-content risk for SEO on our own
// site. Those products now live on the Towels page instead (Bath Towels
// and the new Bathrobes & Spa subcategory, plus Kitchen). This catalogue
// covers only what's genuinely NOT a towel: bed, table & dining, general
// home textiles, and custom/private-label programmes across any of it.
//
// Table & Dining Linen, Home Textile Products and Customized &
// Private-Label Products aren't covered in the company's product
// catalogue yet, so those stay as placeholder entries — replace with
// real photos/specs once available.
// ---------------------------------------------------------------------------

export const linenProducts = [
  // ── Bed Linen ─────────────────────────────────────────────────────────
  {
    id: 'ln-008',
    slug: 'bed-linen-bedsheets',
    name: 'Bed Linen Bedsheets — 100% Cotton',
    category: 'linen',
    subcategory: 'bed',
    shortDescription: 'Soft, breathable 100% cotton bedsheets for a restful night\u2019s sleep.',
    description:
      'A 100% cotton bedsheet set crafted from high-quality cotton for a soft, luxurious feel — developed for hospitality bedding programmes and retail home ranges that need consistent quality across repeat orders.',
    material: '100% cotton',
    gsm: '[Confirm with Mundada]',
    size: 'Single, double, queen, king (custom sizes available)',
    colors: ['White', 'Ivory', '[Confirm with Mundada]'],
    construction: 'Percale or sateen weave, mitred corners',
    applications: ['Hospitality', 'Retail', 'Home'],
    customization: 'Custom sizing, thread count, colourway, embroidery.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/bed-linen.webp'],
    featured: true,
  },
  {
    id: 'ln-009',
    slug: 'pillow-covers-cotton',
    name: 'Pillow Covers — 100% Cotton',
    category: 'linen',
    subcategory: 'bed',
    shortDescription: 'Soft, breathable 100% cotton pillow covers for hospitality and retail.',
    description:
      'Soft, breathable 100% cotton pillow covers developed to match our bedsheet ranges — consistent hand-feel and colour matching across large hospitality and retail orders.',
    material: '100% cotton',
    gsm: '[Confirm with Mundada]',
    size: 'Standard, king (custom sizes available)',
    colors: ['White', 'Ivory', '[Confirm with Mundada]'],
    construction: 'Envelope or button closure, reinforced seams',
    applications: ['Hospitality', 'Retail', 'Home'],
    customization: 'Custom sizing, closure type, colourway, private-label packaging.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/pillow-covers.webp'],
    featured: false,
  },

  // ── Table & Dining Linen ─────────────────────────────────────────────
  {
    id: 'ln-010',
    slug: 'jacquard-table-runner-set',
    name: 'Jacquard Table Runner Set',
    category: 'linen',
    subcategory: 'table-dining',
    shortDescription: 'Woven table runner and napkin set for hotel and restaurant dining.',
    description:
      'A jacquard-woven table runner and napkin set developed for hotel and restaurant dining programmes — consistent weave and colour across bulk hospitality orders.',
    material: 'Cotton / cotton-poly blend jacquard',
    gsm: 'Buyer specified',
    size: 'Runner 33×180 cm, napkin 45×45 cm',
    colors: ['White', 'Ivory', 'Custom weave patterns on request'],
    construction: 'Jacquard weave, hemmed edges',
    applications: ['Hospitality', 'Retail'],
    customization: 'Custom weave pattern, sizing, colourway, logo weaving.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/jacquard-table-runner-set.webp'],
    featured: true,
  },
  {
    id: 'ln-011',
    slug: 'cotton-tablecloth',
    name: 'Cotton Tablecloth',
    category: 'linen',
    subcategory: 'table-dining',
    shortDescription: 'Plain-weave cotton tablecloth for dining and event use.',
    description:
      'A dependable plain-weave cotton tablecloth developed for restaurant, banquet and dining retail programmes needing consistent size and finish at scale.',
    material: '100% cotton plain weave',
    gsm: 'Buyer specified',
    size: 'Standard rectangular and round sizes; custom on request',
    colors: ['White', 'Ivory', 'Custom on request'],
    construction: 'Plain weave, hemmed edges',
    applications: ['Hospitality', 'Retail'],
    customization: 'Custom sizing, colourway, hem style, branding.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/table-dining-linen.webp'],
    featured: false,
  },

  // ── Home Textile Products ────────────────────────────────────────────
  {
    id: 'ln-014',
    slug: 'cushion-cover-set',
    name: 'Cushion Cover Set',
    category: 'linen',
    subcategory: 'home-textile',
    shortDescription: 'Cotton cushion cover set for home and lifestyle retail.',
    description:
      'A cotton cushion cover set developed for home and lifestyle retail ranges — consistent colour and construction quality suited to repeat retail ordering.',
    material: '100% cotton',
    gsm: 'Buyer specified',
    size: '40×40 cm, 45×45 cm, 50×50 cm',
    colors: ['Natural', 'Sand', 'Olive', 'Custom on request'],
    construction: 'Zip or envelope closure, reinforced seams',
    applications: ['Retail', 'Home'],
    customization: 'Custom sizing, colourway, print/embroidery, packaging.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/cushion-cover-set.webp'],
    featured: true,
  },
  {
    id: 'ln-015',
    slug: 'cotton-throw-blanket',
    name: 'Cotton Throw Blanket',
    category: 'linen',
    subcategory: 'home-textile',
    shortDescription: 'Soft woven cotton throw for home and lifestyle retail ranges.',
    description:
      'A soft, woven cotton throw blanket developed for home and lifestyle retail collections — designed to sit comfortably within warm, neutral interior ranges.',
    material: 'Cotton / cotton-blend weave',
    gsm: 'Buyer specified',
    size: '130×170 cm (custom sizes available)',
    colors: ['Natural', 'Sand', 'Charcoal', 'Custom on request'],
    construction: 'Woven, fringed or hemmed edge',
    applications: ['Retail', 'Home'],
    customization: 'Custom sizing, weave pattern, colourway.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/linen/Cotton-Throw-Blanket.webp'],
    featured: false,
  },

  // ── Customized & Private-Label Products ──────────────────────────────
  {
    id: 'ln-016',
    slug: 'private-label-linen-programme',
    name: 'Private-Label Linen Programme',
    category: 'linen',
    subcategory: 'custom-private-label',
    shortDescription: 'Fully custom linen programme developed under your own brand.',
    description:
      'A made-to-specification linen programme — spanning any category above — developed entirely under your own brand: construction, sizing, colour, labelling and packaging built around your requirement.',
    material: 'Specified per project',
    gsm: 'Specified per project',
    size: 'Fully custom',
    colors: ['Developed to buyer specification'],
    construction: 'Buyer specified',
    applications: ['Private label', 'Hospitality', 'Retail'],
    customization: 'Full custom development — size, material, colour, branding, packaging.',
    moq: 'Discussed per project scope',
    images: ['/images/linen/Private-Label-Linen.webp'],
    featured: true,
  },
  {
    id: 'ln-017',
    slug: 'custom-logo-linen-development',
    name: 'Custom Logo Linen Development',
    category: 'linen',
    subcategory: 'custom-private-label',
    shortDescription: 'Woven or embroidered logo development across any linen line.',
    description:
      'Logo and branding development — woven jacquard or embroidered — applied across any linen category, developed and sampled before full production commitment.',
    material: 'Specified per project',
    gsm: 'Specified per project',
    size: 'Fully custom',
    colors: ['Developed to buyer specification'],
    construction: 'Woven jacquard or embroidered branding',
    applications: ['Private label'],
    customization: 'Logo development, sampling, full custom production.',
    moq: 'Discussed per project scope',
    images: ['/images/linen/logo-linen.webp'],
    featured: false,
  },
];
