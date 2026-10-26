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
3. Nothing — the deploy workflow runs every night at 03:17 India time,
   sees the new article in the database and renders it, adds it to the
   sitemap and submits it to IndexNow (Bing and others). The same goes
   for a guide written or edited in /hq. To have it live sooner, run the
   deploy workflow by hand. A night with nothing new deploys nothing; a
   night the API cannot be reached deploys nothing either, by design.
4. Next day: GitHub Actions → "Verify the live site".
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
  or invents city-specific detail that is not true. The one place page
  that exists, /solutions/towel-exporter-jaipur, is not an exception:
  Jaipur is where the business is registered and its office is, the city
  its structured data and Google Business Profile name — and the page
  says the towels are woven in Solapur. A genuinely distinct
  hub city — one with a real, checkable reason of its own, the way
  Rotterdam is a re-export hub rather than just a Dutch port — could
  earn a page on the same terms a country does. "All major world
  cities" cannot.

## Languages

Every language has its own URL: `/de/about`, `/es/towels`, `/ar`. English
stays unprefixed. Only the pages listed in `LOCALIZED_PAGES`
(`frontend/src/data/localeRoutes.js`) are indexed in other languages —
home, about, custom, contact, towels and linen — each with
hreflang tags and a sitemap entry per language. The /export and
/solutions landing pages are still English-only, so under a language
prefix they point their canonical back at the English page. So does
/collections, whose product descriptions come from the API in English.
Fourteen country pages also exist in their market's language only —
Germany in German; UAE, Saudi Arabia, Qatar and Oman in Arabic; Japan;
South Korea; Brazil in Portuguese; Spain, Mexico, Chile, Colombia, Peru
and South America in Spanish. They are `LOCALIZED_LANDING_PAGES` in
`localeRoutes.js`, with the copy in `frontend/src/data/landingTranslations/`.
**Changing an English country page means changing its translation too.**
The other country pages stay English because the site has no French,
Italian, Dutch or Nordic locale.

Six buyer guides are also in Spanish, German and Arabic: what to send
for a quote, the GSM guide, MOQ, FOB, certifications and payment terms
(`LOCALIZED_GUIDES` in `localeRoutes.js`, copy in
`frontend/src/data/guideTranslations/`). The English article still comes
from the database; only its title, excerpt and body are swapped.
**Editing one of these six in /hq or in `content-drafts/` means editing
its three translations too**, or the other languages keep the old text.

Any untranslated page requested under a prefix (/de/export/...) is
301-redirected to its English URL by `frontend/public/.htaccess`, whose
copy of the translated-page list must match `LOCALIZED_PAGES` — the build
fails if it does not.

- **Changing English copy means changing every locale file.** When the
  English text in `en.json` changes and the others do not, the other
  languages keep publishing the old claim to Google. That happened once
  already (German said "trusted exporter since 2005" long after English
  said "weaving since 1972").
- A landing page joins `LOCALIZED_PAGES` only once its copy really is
  translated — never with English text in a translated frame.
- In Search Console, check **International targeting / hreflang** errors
  after each deploy that touches languages.

## Where things are

- Live check, deploy, article publishing, catalogue seeding — all in
  GitHub Actions.
- Article drafts — `content-drafts/`.
- Landing page copy — `frontend/src/data/seoLandingPages.js`.
- What gets rendered and shipped — `frontend/src/data/deployRoutes.js`.
- What is in the sitemap — `frontend/scripts/generate-seo-files.js`.
- The nightly "is anything new in /hq" check — `frontend/scripts/check-new-content.mjs`.
- IndexNow submission — `frontend/scripts/indexnow.mjs`; its key is the
  32-character `.txt` file in `frontend/public/`. Not secret, but do not
  rename or delete it.
- The business address, as structured data reads it —
  `postalAddress` in `frontend/src/data/config.js`. Keep it identical to
  the Google Business Profile and any directory listing.
- Which pages exist in which languages — `frontend/src/data/localeRoutes.js`.

## What is already done

21 landing pages across 19 markets plus hospitality and private label,
the catalogue indexable and prerendered, FAQ, breadcrumb and product
structured data, an email-first inquiry path with a prefilled
specification request, and a live check of a hundred-odd assertions.

Indexing takes weeks. The work now is patience, one article at a time,
and building for what the Performance report actually shows.
