# SEO log

One entry per session: what changed, and what is still pending. Newest
first. The routine itself is in SEO-ROUTINE.md.

## 2026-11-14 (unique content: country pages)

### Measured (live, 160 English pages, 5-word overlap)
- The 28 /export country pages were on average 71% identical to each
  other. Shared on every page: a list of all 37 other landing pages
  (about 300 words), the five "How we supply" points, three shared FAQs.
  Israel also repeated the "match a towel" FAQ twice.
- Linen product pages overlap 60–74% (short catalogue text from the API);
  solutions pages up to 65%. Not changed today.

### Done (code; live after the next deploy)
- `getRelatedLandingPages`: a country page now links to up to six
  countries in its own region plus the three core solutions pages,
  instead of all 37. A solutions page links to the other solutions
  pages. Every landing page still has an inbound link; /export lists all.
- Israel: duplicate FAQ removed; one new FAQ (Hebrew labels and
  packaging), a service fact only.
- Local render of 10 country pages: average overlap 71% -> 61%; Israel
  page 921 -> about 690 words, nearly all of the cut being the link list.

### Next
- The remaining overlap is the shared "How we supply" block and FAQs.
  The fix is more country-specific copy per page (one page a day), with
  checked facts; translated pages need their translation changed too.
- "How we supply" still names OEKO-TEX STANDARD 100, MADE IN GREEN, GRS
  and BSCI, which the owner has not confirmed (OWNER_INPUTS.md).

## 2026-11-11 (why nothing ranks: two causes)

### Found
- Nothing since 2026-11-05 is live. /about still has the old title and the
  three new guides are not in the database. Publish + deploy never ran.
- Keyword cannibalisation: 23 short /hq posts (about 500 words each, three
  of them exact "-2" copies) target the same search as a landing page.
  For "towel supplier USA" alone there were four pages. Google splits the
  signals and ranks none of them well.

### Done
- `frontend/src/data/consolidatedUpdates.js`: the 23 posts, each mapped
  to its landing page. Those posts now name the landing page as
  canonical, open with a "Full details" link to it, and are left out of
  the sitemap and llms.txt (sitemap 249 -> 228 URLs locally). Checked in
  a browser against the live API: duplicate post canonical = landing page;
  a normal guide keeps its own canonical.
- verify-live: two canonical checks and one sitemap check for this.

### Live (same day)
- Merged claude/practical-curie-ebctgk into main (the branch the site had
  been deployed from: test report and inspection guides, quotation tool).
- Publish articles: 3 new (bathrobes, yarn, where made). Deploy run 111
  succeeded; Verify the live site run 84 green. Checked by hand: new
  titles, 5 guides live, duplicate posts' canonical = landing page,
  sitemap 233 URLs without the duplicates.

### Pending
- /hq: still delete the three "-2" copies; new /hq posts must not repeat a
  landing page's topic (add them to consolidatedUpdates.js if they do).

## 2026-11-07 (off-site: link kit)

### Done
- `offsite-drafts/link-kit.md` (+ PDF for Riya): exact name/address/phone,
  three company descriptions, product list, 16 places to list in order
  (Google Business Profile, LinkedIn, Bing Places, IndiaMART, TradeIndia,
  ExportersIndia, Justdial, Europages, Kompass, Go4WorldBusiness, TradeKey,
  Apple Business Connect, FIEO, both partner mills, TEXPROCIL), eight
  Google posts with links, LinkedIn and Instagram text, link-request emails
  to V P Mundada and Cotonex, the Search Console indexing list, a tracker.
- Only confirmed facts: partner certifications named as the partner's;
  GRS, STANDARD 100 and MADE IN GREEN left out.

### Pending
- Riya: start Week 1 of the kit, fill in the tracker.
- When LinkedIn/Instagram exist: add them to `social` in config.js
  (feeds sameAs).

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
