# SEO routine

What to do, how often, and what to ping Claude with. Kept here rather
than in a chat so it survives the conversation.

## How to start a session

Ping with one of these. Each one is a whole job — no need to explain the
background again.

- **"weekly seo check"** — the Monday routine below
- **"publish next article"** — the next draft in `content-drafts/`
- **"monthly seo review"** — read Search Console and decide what to build
- **"site check"** — just the live check, for when something looks wrong

## Weekly — Monday, about ten minutes

This is the real rhythm. Not daily: nothing in SEO moves day to day for
a site this size, and checking daily produces worry rather than
information.

1. **Run the live check.** GitHub Actions → "Verify the live site" → Run
   workflow. Green means the site still serves what the repository
   builds. Red names what broke.
2. **Search Console → Pages.** Look at two numbers: how many pages are
   indexed, and how many sit in "Discovered - currently not indexed".
   The first should climb, the second should fall. Week to week, not day
   to day.
3. **Search Console → Performance.** Impressions before clicks: a page
   getting impressions and no clicks is ranking but not being chosen,
   which is usually a title or description problem, and fixable. A page
   with neither is not ranking yet.
4. **Sitemap row.** Still "Success", and the URL count matches what the
   live check reported.

Nothing to do if all four look normal. That is the point of a routine.

## Every week or two — publish an article

One at a time, not three at once. Each one wants a couple of weeks to
settle before the next.

The drafts are in `content-drafts/`. Publishing runs from there:

1. MongoDB Atlas → Network Access → add `0.0.0.0/0`, 6-hour temporary.
2. GitHub Actions → "Publish articles" → dry run first, then for real.
3. GitHub Actions → deploy workflow. This is what renders the article
   and puts it in the sitemap; publishing alone does neither.
4. GitHub Actions → "Verify the live site".
5. Atlas → delete the IP entry.

Ask Claude for a new draft when the folder runs out.

## Monthly — decide what to build next

Search Console → Performance → Queries, last 28 days. Read it for two
things:

- **A query with impressions and no page of its own.** That is the
  clearest signal there is: people are searching for something we
  half-answer. Worth a landing page or a guide.
- **A page ranking on page two.** Usually closer to page one than a new
  page would be. Worth strengthening rather than starting something new.

Bring either to Claude and it gets built.

## What not to do

- **Do not check daily.** The data lags by days; a flat number tomorrow
  means nothing.
- **Do not publish every draft at once.** Three articles in one day
  reads as a dump, and you learn nothing about which one worked.
- **Do not add a country page for a market you do not want.** Thin pages
  for markets nobody asked about are worse than no page.
- **Do not put product specifications on the site.** This is a
  custom-specification business — the buyer sends theirs and we quote
  against it. "Confirmed on quotation" is the answer, not a gap.

## Where things are

- Live check, deploy, article publishing, catalogue seeding — all in
  GitHub Actions.
- Article drafts — `content-drafts/`.
- Landing page copy — `frontend/src/data/seoLandingPages.js`.
- What gets rendered and shipped — `frontend/src/data/deployRoutes.js`.
- What is in the sitemap — `frontend/scripts/generate-seo-files.js`.

## What is already done

21 landing pages across 19 markets plus hospitality and private label,
the catalogue indexable and prerendered, FAQ, breadcrumb and product
structured data, an email-first inquiry path with a prefilled
specification request, and a live check of a hundred-odd assertions.

Indexing takes weeks. The work now is patience, one article at a time,
and building for what the Performance report actually shows.
