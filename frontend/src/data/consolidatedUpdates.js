// Short posts written in /hq that target the same search as a landing
// page. Each one competed with the page it duplicates: for "towel supplier
// USA" Google saw the /export page, the /usa market page and two 500-word
// posts saying much the same, and ranked none of them well. Three of them
// were exact copies ("-2" slugs).
//
// The post stays online (it is linked from social posts and the updates
// list), but its canonical names the landing page, it leaves the sitemap
// and llms.txt, and it opens with a link to that page. Search signals for
// the topic then gather on one page instead of being split.
//
// Plain JavaScript with no imports, because generate-seo-files.js reads it
// in Node as well. A new /hq post that repeats a landing page's topic
// belongs here too; a genuine guide (a question the landing page does not
// answer) does not.

export const CONSOLIDATED_UPDATES = {
  // USA
  'bath-towel-exports-to-the-usa-cotton-bath-towels-for-importers-and-hotels': '/export/usa-cotton-towel-supplier',
  'cotton-towels-and-linen-for-importers-in-the-usa': '/export/usa-cotton-towel-supplier',
  // Canada
  'terry-towel-exports-to-canada-cotton-terry-towels-for-importers-and-hotels': '/export/canada-cotton-towel-supplier',
  'cotton-towels-and-linen-for-importers-in-canada': '/export/canada-cotton-towel-supplier',
  // Australia (one post published twice)
  'spa-and-hotel-towel-supplier-for-australia': '/export/australia-cotton-towel-supplier',
  'spa-and-hotel-towel-supplier-for-australia-2': '/export/australia-cotton-towel-supplier',
  // Poland (one post published twice, plus a second post)
  'hotel-towel-exports-to-poland-cotton-towels-for-hotels-and-distributors': '/export/poland-cotton-towel-supplier',
  'hotel-towel-exports-to-poland-cotton-towels-for-hotels-and-distributors-2': '/export/poland-cotton-towel-supplier',
  'cotton-towels-and-linen-for-importers-in-poland': '/export/poland-cotton-towel-supplier',
  // Norway (one post published twice)
  'bath-towel-exports-to-norway-cotton-bath-towels-for-importers-and-hotels': '/export/norway-cotton-towel-supplier',
  'bath-towel-exports-to-norway-cotton-bath-towels-for-importers-and-hotels-2': '/export/norway-cotton-towel-supplier',
  // Sweden
  'towel-exports-to-sweden-how-we-ship-cotton-towels-from-india': '/export/sweden-cotton-towel-supplier',
  // Finland has no /export page; its market page is the one to keep.
  'cotton-towels-and-linen-for-importers-in-finland': '/finland',
  // South America
  'towel-exports-to-south-america-brazil-chile-colombia-peru-and-argentina': '/export/south-america-cotton-towel-supplier',
  'cotton-towels-and-linen-for-importers-in-south-america': '/export/south-america-cotton-towel-supplier',
  // India manufacturer
  'towel-manufacturer-and-exporter-in-india-woven-in-solapur-since-1972': '/solutions/cotton-towel-manufacturer-india',
  'bath-towel-exports-from-india-cotton-bath-towels-for-importers-worldwide': '/solutions/cotton-towel-manufacturer-india',
  // Hotel and spa towels
  'spa-and-hotel-towel-supplier-in-india-for-buyers-worldwide': '/solutions/hotel-towel-manufacturer',
  // Zero twist (one of these had the landing page's exact title)
  'zero-twist-towel-manufacturer-in-india': '/solutions/zero-twist-towel-manufacturer',
  'zero-twist-cotton-towels-softer-faster-drying-terry-for-hotels-and-spas': '/solutions/zero-twist-towel-manufacturer',
  // Organic linen
  'organic-cotton-linen-from-karur-india-gots-certified-home-textiles': '/solutions/organic-cotton-linen-manufacturer',
  'gots-certified-organic-cotton-linen-now-available-for-importers': '/solutions/organic-cotton-linen-manufacturer',
  // Jaipur office
  'our-export-office-in-jaipur-your-contact-for-towels-and-linen-from-india': '/solutions/towel-exporter-jaipur',
};

/** The landing page a consolidated post points to, or null. */
export function consolidatedTarget(slug) {
  return CONSOLIDATED_UPDATES[slug] || null;
}
