// ---------------------------------------------------------------------------
// Linen category data.
// ---------------------------------------------------------------------------
// Unlike Towels/Rugs, these lines don't have individual catalogued
// products/photography yet — each tile links out to Contact with the
// category pre-filled as their interest, rather than a product grid.
// Swap `image` for real product photography as it becomes available, and
// this can be upgraded to a full category → product listing later using
// the same pattern as TowelCatalogue/RugCatalogue.
// ---------------------------------------------------------------------------

const linenCategories = [
  { slug: 'towels-bath', image: '/images/towels/bath/bath-towel.jpg' },
  { slug: 'bed', image: '/images/collections/home.jpg' },
  { slug: 'table-dining', image: '/images/collections/hospitality.jpg' },
  { slug: 'kitchen', image: '/images/towels/kitchen-utility-1.jpg' },
  { slug: 'home-textile', image: '/images/collections/retail.jpg' },
  { slug: 'custom-private-label', image: '/images/custom/private-label.jpg' },
];

export default linenCategories;
