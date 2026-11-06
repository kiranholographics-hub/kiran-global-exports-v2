# SEO log

One entry per session: what changed, and what is still pending. Newest
first. The routine itself is in SEO-ROUTINE.md.

## 2026-11-06 (content: three new buyer guides)

### Done
- Drafted three guides in `content-drafts/` (not published):
  - #28 `how-to-choose-hotel-bathrobes` (about 1,200 words): collar,
    terry/velour/waffle table, weight, size after washing, finishing,
    quote brief. Supports `/solutions/bathrobe-manufacturer`.
  - #29 `combed-carded-ringspun-cotton-towel-yarn` (about 1,000 words):
    carded vs combed, ring-spun vs open-end, ply, twist, count, how to
    write yarn into a spec.
  - #30 `where-towels-and-linen-are-made-in-india` (about 900 words):
    Solapur, Karur, Panipat, western Tamil Nadu, integrated mills, and the
    questions to ask a supplier. Names our partners (V P Mundada, Cotonex).
- Titles 51–59 characters, excerpts 143–154. Weight ranges are general
  industry ranges, labelled; no KGE specs, prices or lead times.
- `articleGuides.js`: each guide linked to four landing pages, both ways.

### Order matters
- Run "Publish articles" before the next deploy, or the landing pages
  link to /updates pages that do not exist yet.

## 2026-11-05 (content SEO pass)

### Live audit (sitemap, 248 URLs)
- All 248 return 200, one H1 each (the noindex H1 fix is live).
- 163 titles over 65 characters, 55 descriptions under 110, 5 over 160.
- Duplicate updates in /hq (same title and text, second copy ends in -2):
  Poland hotel towels, Norway bath towels, Australia spa towels.
- `/updates/zero-twist-towel-manufacturer-in-india/` has the same title as
  `/solutions/zero-twist-towel-manufacturer/`.

### Done (code, takes effect on the next approved deploy)
- Titles: the " | Kiran Global Exports" suffix is added only when the full
  title fits in 60 characters; a longer title keeps its own words (country,
  product) instead. The home page keeps the brand (`alwaysBrand`).
- Product pages: a short description (under 110 characters) gets one
  site-wide line added (made to your specification, sample approved
  first), so snippets are 130–155 characters. No new product facts.
- About and Contact titles name the brand and what the page is for, in
  all 8 languages.
- `/oshibori/`: real title (was only the brand) and a 155-character
  description (was 176).

### Pending: needs /hq (Riya)
- Delete or unpublish the three "-2" duplicate updates.
- Rename the zero-twist update's title so it does not compete with the
  solutions page (for example "Zero Twist Towels: How They Are Made and Who
  Buys Them").
- `/updates/linen-kiran-global-exports/` title is just "Linen": give it a
  real title.

## 2026-10-26 (Monday: daily + weekly)

### Done
- Auto-deploy switched off. The nightly workflow
  ("Check for undeployed content", 03:17 IST) now only reports what in
  /hq is not live yet; deploys are started by hand after approval.
- Content: drafted `content-drafts/24-hotel-towel-replacement-cycles.md`
  (about 1,050 words, general guidance, no figures about our own products).
  Not published.
- Technical: the `<noscript>` heading in `frontend/index.html` was an H1,
  so every page had two H1s (214 of 215 pages). It is now a paragraph.
  This takes effect on the next approved deploy.
- Off-site draft: `offsite-drafts/2026-10-26-google-business-profile.md`.

### Weekly live check (sitemap, 215 URLs)
- All 215 return 200 with a self-canonical. An unknown URL at the root
  returns 404.
- Two H1s on 214 pages: fixed in this PR, see above.
- 135 titles are over 65 characters with the " | Kiran Global Exports"
  suffix: backlog.
- 14 linen product pages have meta descriptions of 55–67 characters (too
  thin) and some long titles: backlog.
- `/oshibori/` description is 176 characters: backlog.
- Soft 404: an unknown URL under a known section (`/towels/nope-nope/`)
  returns 200 with the home page's title. JavaScript then marks it
  noindex, but the raw HTML says index: backlog.

### Backlog (technical, one per day)
1. Linen product meta descriptions: write real 120–155 character ones.
2. Shorten the title template, or drop the brand suffix when the title is
   long.
3. `/oshibori/` description length.
4. Soft 404 under known sections.
5. `SEO.jsx` reads `siteConfig.socials`, but the config key is `social`,
   so `sameAs` is always empty. No effect today because there are no
   social profiles.

### Pending: needs owner
- Certifications [confirm]: OWNER_INPUTS.md lists GRS, OEKO-TEX STANDARD
  100 and MADE IN GREEN as not yet confirmed. The site already names them
  on many pages, including the new Jaipur page. Confirm them, or I remove
  them site-wide.
- Export countries [confirm]: OWNER_INPUTS.md says "10+". The
  cotton-towel-manufacturer-india FAQ lists about 30 countries "we
  currently export to". Confirm the list, or I reword it.
- Jaipur page and Google Business Profile draft: office visiting hours,
  whether there is a signboard, and whether enquiries are answered in
  Hindi. [confirm]
- Search Console numbers for the weekly review (checklist in chat).
- Approval to deploy this PR, plus yesterday's PR #9 (merged, not yet
  deployed: Jaipur page and address schema).
