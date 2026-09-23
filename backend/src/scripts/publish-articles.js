// Publishes the buyer guides in content-drafts/ to the Updates collection,
// which is what /updates reads. Run with `npm run publish-articles` from
// backend/, or through the "Publish articles" workflow.
//
// The drafts are the source: they live in git, get reviewed in a diff and
// are republished by re-running this, so an article is not a thing that
// exists only inside a database nobody can diff. /hq still works exactly
// as before for anything written there — this only ever touches the slugs
// it finds in content-drafts/.
//
// --dry-run reports what would change and writes nothing.

import 'dotenv/config';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Update from '../models/Update.js';

const DRY_RUN = process.argv.includes('--dry-run');
const DRAFTS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../content-drafts'
);

// A deliberately small header parser rather than a frontmatter dependency:
// the format is four known keys and a body, and that is all it will ever
// be asked to handle.
function parseDraft(text, filename) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: no --- header block`);
  const [, header, body] = match;

  const fields = {};
  for (const line of header.split('\n')) {
    const at = line.indexOf(':');
    if (at === -1) throw new Error(`${filename}: cannot read header line "${line}"`);
    fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }

  for (const key of ['title', 'slug', 'excerpt']) {
    if (!fields[key]) throw new Error(`${filename}: missing ${key}`);
  }
  if (!body.trim()) throw new Error(`${filename}: empty body`);

  return {
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt,
    body: body.trim(),
    published: fields.published !== 'false',
  };
}

async function run() {
  const files = (await readdir(DRAFTS_DIR))
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort();

  const articles = [];
  for (const file of files) {
    articles.push(parseDraft(await readFile(path.join(DRAFTS_DIR, file), 'utf-8'), file));
  }

  const slugs = articles.map((a) => a.slug);
  const duplicate = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (duplicate) throw new Error(`two drafts share the slug "${duplicate}"`);

  await connectDB();
  if (DRY_RUN) console.log('[articles] DRY RUN — nothing will be written.\n');

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const article of articles) {
    const existing = await Update.findOne({ slug: article.slug }).lean();

    if (!existing) {
      console.log(`  NEW        ${article.slug}`);
      console.log(`               "${article.title}"`);
      created += 1;
    } else {
      const changed = ['title', 'excerpt', 'body', 'published'].filter(
        (key) => String(existing[key]) !== String(article[key])
      );
      if (!changed.length) {
        console.log(`  unchanged  ${article.slug}`);
        unchanged += 1;
        continue;
      }
      console.log(`  UPDATED    ${article.slug}  (${changed.join(', ')})`);
      updated += 1;
    }

    if (!DRY_RUN) {
      await Update.findOneAndUpdate(
        { slug: article.slug },
        {
          ...article,
          // Keep the original publication date on a rewrite: an edited
          // guide is not a new article, and moving the date would tell
          // readers and Google otherwise.
          ...(existing ? {} : { publishedAt: new Date() }),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  }

  console.log(`\n[articles] ${created} new, ${updated} updated, ${unchanged} already matching.`);
  if (DRY_RUN) {
    console.log('[articles] DRY RUN — nothing was written. Re-run without --dry-run to apply.');
  } else {
    console.log('[articles] Run the deploy workflow next so the sitemap picks them up.');
  }
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[articles] failed:', err.message);
  process.exit(1);
});
