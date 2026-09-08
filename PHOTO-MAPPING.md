# Kiran Global Exports — Photo Cleanup & Exact Mapping

## What was changed

- Removed 25 exact duplicate image files.
- Kept all 54 unique existing image assets.
- Updated all code references that pointed to removed duplicate files.
- Fixed the two missing hero-poster references by using the existing towel/rug hero assets:
  - `/images/hero/towels-hero-poster.jpg` -> `/images/towels/hero.jpg`
  - `/images/hero/rugs-hero-poster.jpg` -> `/images/rugs/hero.jpg`
- No page text, layout, CSS design, functionality, certifications, or videos were changed.
- The original videos are intentionally not included in this source-only package; keep the existing `frontend/public/videos/` folder from the original project.

## Exact section mapping

### Homepage — Collections
- Home -> `/images/towels/bath/bath-towel.webp`
- Hotel -> `/images/towels/hotel/hotel-border-towel.webp`
- Hospitality -> `/images/towels/jacquard/jacquard-towel.webp`
- Spa -> `/images/towels/bath-mats/cotton-bath-mat.webp`
- Retail -> `/images/towels/waffle/waffle-weave-towel.webp`
- Custom -> `/images/custom/private-label.jpg`

### Brand / About / Custom
- Brand Intro image 1 -> `/images/towels/hero.jpg`
- Brand Intro image 2 -> `/images/custom/development.jpg`
- About / Our Studio -> `/images/towels/logo-custom/logo-towel-detail.webp`
- Custom / Product Development -> `/images/custom/development.jpg`
- Custom / Private Label -> `/images/custom/private-label.jpg`

### Towel editorial slots
- Spa Ritual 1 -> `/images/towels/bath/bath-towel.webp`
- Spa Ritual 2 -> `/images/towels/bath/bath-towel-2.webp`
- Hotel Collection 1 -> `/images/towels/hotel/hotel-border-towel.webp`
- Hotel Collection 2 -> `/images/towels/dobby-border/greek-border-towel.webp`
- Everyday Hand Towel 1 -> `/images/towels/kitchen/hand-napkins.webp`
- Classic Bath Towel 1 -> `/images/towels/bath-sheets/bath-sheet.webp`
- Classic Bath Towel 2 -> `/images/towels/zero-twist/zero-twist-towel.webp`
- Kitchen Utility 1 -> `/images/towels/kitchen/kitchen-napkin.webp`
- Coastal Beach Towel 1 -> `/images/towels/pool-beach/beach-towel.webp`

### Towel / Rug hero posters
- Towels hero poster -> `/images/towels/hero.jpg`
- Rugs hero poster -> `/images/rugs/hero.jpg`

### Rug product slots
- Hotel Bath Rug 1 -> `/images/towels/bath-mats/cotton-bath-mat.webp`
- Hotel Bath Rug 2 -> `/images/towels/bath-mats/cotton-bath-mat-thumb.webp`
- Heritage Decorative Rug -> `/images/towels/waffle/waffle-weave-towel.webp`
- Spa Hospitality Rug -> `/images/towels/bamboo-specialty/bamboo-towel.webp`
- Home Comfort Rug -> `/images/towels/jacquard/jacquard-towel.webp`
- Custom Branded Rug -> `/images/custom/private-label.jpg`

## Removed exact duplicate files

25 duplicate copies were removed from:
- collections/*
- hero/hero-textile.jpg
- brand/brand-intro1.jpg
- brand/brand-intro2.jpg
- about/studio.jpg
- towel editorial JPG slots
- rug product JPG slots

The remaining image set contains 54 unique image files.

## Verification

- Image references in `frontend/src` resolve to existing files.
- No exact duplicate image hashes remain.
- Original unique product/catalogue images remain untouched.
