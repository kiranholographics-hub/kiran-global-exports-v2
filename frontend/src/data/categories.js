// Structured category data — the editorial source of truth for navigation,
// the Product World section, and the /towels & /rugs listing pages.
// Add a subcategory here and it will appear across the site automatically.

export const categories = [
  {
    slug: 'towels',
    name: 'Towels',
    heroImage: '/images/towels/bath/bath-towel.jpg',
    intro:
      'Premium textile collections for hospitality, retail, spa and private-label markets — shown through Kiran Global Exports towel photography and developed to buyer specification.',
    subcategories: [
      { slug: 'bath-towels', name: 'Bath Towels' },
      { slug: 'bath-sheets', name: 'Bath Sheets' },
      { slug: 'hotel-hospitality', name: 'Hotel & Hospitality' },
      { slug: 'jacquard', name: 'Jacquard Towels' },
      { slug: 'waffle', name: 'Waffle Towels' },
      { slug: 'zero-twist', name: 'Zero Twist' },
      { slug: 'dobby-border', name: 'Dobby / Border' },
      { slug: 'pool-beach', name: 'Pool & Beach' },
      { slug: 'logo-custom', name: 'Logo & Custom' },
      { slug: 'bath-mats', name: 'Bath Mats' },
      { slug: 'kitchen', name: 'Kitchen & Napkins' },
      { slug: 'bamboo-specialty', name: 'Bamboo / Specialty' },
      { slug: 'accessories', name: 'Terry Accessories' },
      { slug: 'bathrobe-spa', name: 'Bathrobes & Spa' },
    ],
  },
  {
    slug: 'rugs',
    name: 'Rugs',
    heroImage: '/images/rugs/hero.jpg',
    intro:
      'Bath and hospitality rugs built for repeat washing and long-term durability, alongside decorative and home collections for retail and design-led buyers.',
    subcategories: [
      { slug: 'bath-rugs', name: 'Bath Rugs' },
      { slug: 'hotel-rugs', name: 'Hotel Rugs' },
      { slug: 'hospitality-rugs', name: 'Hospitality Rugs' },
      { slug: 'home-rugs', name: 'Home Rugs' },
      { slug: 'decorative-rugs', name: 'Decorative Rugs' },
      { slug: 'custom-rugs', name: 'Custom Rugs' },
    ],
  },
  {
    slug: 'linen',
    name: 'Linen',
    heroImage: '/images/linen/Hero-line.jpeg',
    intro:
      'Bed linen, table & dining linen, home textiles and custom private-label programmes for hospitality, retail and wholesale buyers — everything outside our terry towel range, which lives on the Towels page.',
    subcategories: [
      { slug: 'bed', name: 'Bed Linen' },
      { slug: 'table-dining', name: 'Table & Dining Linen' },
      { slug: 'home-textile', name: 'Home Textile Products' },
      { slug: 'custom-private-label', name: 'Customized & Private-Label Products' },
    ],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
