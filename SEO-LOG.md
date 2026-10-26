# SEO log

One entry per session: what changed, and what is still pending. Newest
first. The routine itself is in SEO-ROUTINE.md.

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
