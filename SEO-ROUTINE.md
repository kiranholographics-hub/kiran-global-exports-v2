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

## Articles — one written per day, published whenever convenient

The target pace is a new draft roughly every day, from the backlog in
`content-drafts/CALENDAR.md`. Publishing is a separate step from
writing, and does not need to happen daily: the database only accepts
connections while Atlas's Network Access is open, so publish in
whatever batch is convenient — daily if that suits, or several at once
every week or two. Google records the real date each one actually goes
live either way; there is no ranking benefit to publishing on a
schedule versus in a batch, only to the content existing at all.

The drafts are in `content-drafts/`. Publishing runs from there:

1. MongoDB Atlas → Network Access → add `0.0.0.0/0`, 6-hour temporary.
2. GitHub Actions → "Publish articles" → dry run first, then for real.
3. GitHub Actions → deploy workflow. This is what renders the article
   and puts it in the sitemap; publishing alone does neither.
4. GitHub Actions → "Verify the live site".
5. Atlas → delete the IP entry.

Ask Claude for a new draft whenever the backlog needs topping up —
`CALENDAR.md` lists titles queued but not yet written.

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
- **Do not add a country page for a market you do not want.** Thin pages
  for markets nobody asked about are worse than no page.
- **Do not put product specifications on the site.** This is a
  custom-specification business — the buyer sends theirs and we quote
  against it. "Confirmed on quotation" is the answer, not a gap.
- **Do not build one page per city.** Considered and rejected on
  2026-09-23 — recorded here so the reasoning does not have to be
  re-argued next time it comes up. A country page earns its own content
  because customs, labelling and duty differ by country and are public,
  verifiable facts (Brexit labelling for the UK, Norway sitting outside
  the EU customs union, and so on). None of that varies by city within
  one country — Mumbai and Chennai clear customs under the same rules —
  so a page per city either repeats the country page with the city name
  swapped (a doorway-page pattern Google's own policy names directly)
  or invents city-specific detail that is not true. A genuinely distinct
  hub city — one with a real, checkable reason of its own, the way
  Rotterdam is a re-export hub rather than just a Dutch port — could
  earn a page on the same terms a country does. "All major world
  cities" cannot.

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
