// Product source of truth for editorial B2B catalogue pages.
// Towel records are grounded in the supplied TowelsAlbum.zip. Rugs remain
// separate and preserve the existing project structure and inquiry flow.
import { towelProducts } from './towelCatalog.js';
import { linenProducts } from './linenCatalog.js';

export const products = [
  ...towelProducts,
  ...linenProducts,
  {
    id: 'rg-001',
    slug: 'hotel-bath-rug',
    name: 'Hotel Bath Rug',
    category: 'rugs',
    subcategory: 'hotel-rugs',
    shortDescription: 'Cotton tufted bath rug built for hospitality laundering cycles.',
    description:
      'A dense tufted cotton bath rug developed to hold its pile and shape through repeated commercial washing — finished for a clean, uniform presentation across large hotel orders.',
    material: '100% cotton tufted pile',
    gsm: '1800–2200 GSM',
    size: '50 × 80 cm (custom sizes available)',
    colors: ['White', 'Ivory', 'Sand', 'Charcoal'],
    construction: 'Tufted cotton pile, non-slip latex backing',
    applications: ['Hospitality', 'Spa'],
    customization: 'Custom sizing, pile height, backing type, logo tufting.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/rugs/hotel-rugs.jpg', '/images/rugs/hotel-bath-rug-thumb.jpg'],
    featured: true,
  },
  {
    id: 'rg-002',
    slug: 'heritage-decorative-rug',
    name: 'Heritage Decorative Rug',
    category: 'rugs',
    subcategory: 'decorative-rugs',
    shortDescription: 'Textured woven rug for design-led home and retail collections.',
    description:
      'A textured, natural-fibre decorative rug developed with interior and retail buyers in mind — designed to sit comfortably within warm, neutral home collections.',
    material: 'Cotton and natural fibre blends',
    gsm: 'Varies by construction',
    size: 'Standard 90 × 150 cm and 160 × 230 cm; custom on request',
    colors: ['Natural', 'Sand', 'Olive', 'Custom on request'],
    construction: 'Handloom / flatweave options',
    applications: ['Home', 'Retail', 'Design'],
    customization: 'Custom sizing, weave pattern, colourway development.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/rugs/decorative-rugs.jpg',],
    featured: true,
  },
  {
    id: 'rg-003',
    slug: 'spa-hospitality-rug',
    name: 'Spa Hospitality Rug',
    category: 'rugs',
    subcategory: 'hospitality-rugs',
    shortDescription: 'Low-pile rug engineered for spa, wellness and treatment-room use.',
    description:
      'A low-pile, fast-drying rug designed for wet-area hospitality environments where hygiene, quick turnaround and consistent presentation matter.',
    material: '100% cotton, low-pile tufted',
    gsm: '1400–1800 GSM',
    size: '45 × 70 cm',
    colors: ['White', 'Ivory', 'Sage'],
    construction: 'Low-pile tufted cotton, quick-dry backing',
    applications: ['Spa', 'Wellness', 'Hospitality'],
    customization: 'Custom sizing, colour-coding, embroidered branding.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/rugs/hospital-rugs.jpg'],
    featured: false,
  },
  {
    id: 'rg-004',
    slug: 'home-comfort-rug',
    name: 'Home Comfort Rug',
    category: 'rugs',
    subcategory: 'home-rugs',
    shortDescription: 'Everyday cotton bath rug developed for retail home ranges.',
    description:
      'A dependable, everyday bath rug developed for retail and e-commerce home ranges — consistent quality at a specification designed for accessible price points.',
    material: '100% cotton tufted pile',
    gsm: '1200–1600 GSM',
    size: '40 × 60 cm, 50 × 80 cm',
    colors: ['White', 'Grey', 'Beige', 'Charcoal'],
    construction: 'Tufted cotton pile, non-slip backing',
    applications: ['Retail', 'E-commerce', 'Home'],
    customization: 'Custom colourways, private-label packaging.',
    moq: 'Bulk / container inquiries — MOQ discussed per specification',
    images: ['/images/rugs/home-rugs.jpg'],
    featured: false,
  },
  {
    id: 'rg-005',
    slug: 'custom-branded-rug',
    name: 'Custom Branded Rug',
    category: 'rugs',
    subcategory: 'custom-rugs',
    shortDescription: 'Fully custom rug programme for private-label and branded buyers.',
    description:
      'A made-to-specification rug programme for buyers developing a private-label or branded collection — construction, pile, size and packaging built entirely around your requirement.',
    material: 'Specified per project',
    gsm: 'Specified per project',
    size: 'Fully custom',
    colors: ['Developed to buyer specification'],
    construction: 'Tufted, handloom or flatweave — buyer specified',
    applications: ['Private label', 'Hospitality', 'Retail'],
    customization: 'Full custom development — size, pile, colour, branding, packaging.',
    moq: 'Discussed per project scope',
    images: ['/images/custom/private-label.jpg'],
    featured: false,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductsBySubcategory(subcategorySlug) {
  return products.filter((p) => p.subcategory === subcategorySlug);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4) {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(product, limit = 3) {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}
