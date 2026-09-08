# Image Assets — What's Needed & Where

No real photography exists yet. Every image reference below already points
to an organized path under `public/images/...`, and every component that
renders an image (`ImageReveal`) gracefully falls back to a styled,
labelled placeholder tile when the file 404s — so the site looks
intentional today and simply "lights up" with real photography as files
are dropped in. **No code changes are needed to add real images** — just
save a file at the exact path listed below.

Recommended formats: WebP or optimized JPEG, sRGB. Recommended sizes are a
guide, not a hard requirement — `object-fit: cover` handles minor aspect
mismatches, but matching the target aspect ratio keeps compositions from
cropping awkwardly.

## Hero

| Path | Suggested size | Notes |
|---|---|---|
| `/images/towels/hero.jpg` | 2400×1500 (16:10) | Full-bleed cinematic hero background. Macro fabric texture, folded towels, or a hotel/spa environment shot. Slowly zooms on scroll — avoid busy detail at the very edges. |

## Brand Introduction

| Path | Suggested size |
|---|---|
| `/images/brand/brand-intro-1.jpg` | 1200×1500 (4:5) |
| `/images/brand/brand-intro-2.jpg` | 900×900 (1:1) — detail/texture shot, overlaps the first image |

## Category Heroes

| Path | Suggested size |
|---|---|
| `/images/towels/hero.jpg` | 1600×2000 (4:5) — used in the homepage Product World panel |
| `/images/rugs/hero.jpg` | 1600×2000 (4:5) |

## Product Photography

Each product supports multiple images (`images: []` in `data/products.js`);
the first is used everywhere as the card/cover image.

**Towels** — all under `/images/towels/`:
- `classic-bath-towel-1.jpg`, `classic-bath-towel-2.jpg`
- `hotel-collection-1.jpg`, `hotel-collection-2.jpg`
- `spa-ritual-1.jpg`, `spa-ritual-2.jpg`
- `everyday-hand-towel-1.jpg`
- `coastal-beach-towel-1.jpg`
- `kitchen-utility-1.jpg`

**Rugs** — all under `/images/rugs/`:
- `hotel-bath-rug-1.jpg`, `hotel-bath-rug-2.jpg`
- `heritage-decorative-1.jpg`
- `spa-hospitality-rug-1.jpg`
- `home-comfort-rug-1.jpg`
- `custom-branded-rug-1.jpg`

Suggested size for all product shots: 1200×1500 (4:5), consistent across
the range so listing grids stay visually even.

## Collections / "Explore Our World"

All under `/images/collections/`, 1200×1600 (3:4):
`hotel.jpg`, `spa.jpg`, `home.jpg`, `hospitality.jpg`, `retail.jpg`, `custom.jpg`

## Custom / Private Label

| Path | Suggested size |
|---|---|
| `/images/custom/private-label.jpg` | 1200×1500 (4:5) — homepage section |
| `/images/custom/development.jpg` | 1200×1500 (4:5) — /custom page |

## About

| Path | Suggested size |
|---|---|
| `/images/towels/logo-custom/logo-towel-detail.jpg` | 1200×1500 (4:5) |

## Open Graph / Social Share

| Path | Suggested size |
|---|---|
| `/images/og/kiran-global-exports-og.jpg` | 1200×630 (1.91:1) — used for link previews on every page via `metadataBase` |

## Adding a new product later

Add an entry to `data/products.js` with an `images: []` array pointing to
new paths under `/images/{towels|rugs}/`, following the naming pattern
above. No other file needs to change — listing pages, product cards and
the product detail template all read from this one array.
