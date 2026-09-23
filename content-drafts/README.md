# Article drafts

Buyer guides written for /updates. Nothing here is published — each file
is a draft to review, edit and paste into /hq → Updates.

## How to publish

Run the **Publish articles** workflow in GitHub Actions. It reads every
`.md` file here and upserts it into the Updates collection by slug, so
editing a draft and re-running it republishes that article rather than
creating a second one. Dry run first — it prints what would change and
writes nothing.

Then run the deploy workflow, which is what regenerates the sitemap so
it lists them, and the live check.

The database only accepts connections from addresses on the MongoDB
Atlas IP access list, and GitHub's runners are not on it. Before running
this, add `0.0.0.0/0` there with the 6-hour temporary option, and delete
it afterwards.

Anything written directly in /hq is untouched — this only ever writes the
slugs it finds in this folder. A cover image is not set here; add one in
/hq afterwards if you want the post to auto-share to Instagram.

## File format

    ---
    title: ...
    slug: ...
    excerpt: ...
    published: true
    ---

    Body starts here.

## What the body supports

Plain paragraphs, separated by a blank line. Plus two things:

- A line starting `## ` becomes a subheading.
- A block where every line starts `- ` becomes a bulleted list.

That is all — no bold, no links, no tables. Keep the writing plain.

## Why these topics

They answer what a buyer searches for *before* they are ready to name a
supplier, and every one of them ends where an inquiry starts: telling us
the specification. That matches how this business actually works — the
buyer sends what they want made, and we quote against it.

Nothing in these drafts states a GSM, size or MOQ for any product we
sell. Where numbers appear they are general industry ranges, framed as
guidance for the reader's own specification, never as ours.
