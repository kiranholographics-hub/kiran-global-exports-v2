// One-off, rerunnable migration: reads the frontend's structured product /
// category data (the editorial source of truth) and upserts it into
// MongoDB, keyed on each record's stable slug. Run with `npm run seed`
// from backend/. Requires backend/.env to have a working MONGODB_URI.
//
// This is the only place the backend reads from ../frontend — a content
// migration, not a runtime dependency. The catalogue-browsing pages
// (Towels/Linen listing, category and detail routes, Collections)
// now read products live from GET /api/products, which is backed by this
// seeded data — so re-run this after editing the catalog files below to
// push those edits into the database the site actually reads from.
// Category data and the homepage's own teaser sections still render from
// the frontend's static files directly (see frontend/src/data/products.js
// for why), so editing categories.js still needs no re-seed to show up.
//
// Imports the two plain per-category catalog files directly (towel, linen)
// rather than frontend/src/data/products.js — that file now fetches from
// the API itself (via a Vite "@/" alias plain Node can't resolve, and
// React's use() hook), so it can no longer be imported from a standalone
// script. These files remain plain, framework-free data exports
// specifically so both the frontend and this script can import them
// directly.

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

async function loadFrontendData() {
  const [towelsModule, linenModule, categoriesModule] = await Promise.all([
    import('../../../frontend/src/data/towelCatalog.js'),
    import('../../../frontend/src/data/linenCatalog.js'),
    import('../../../frontend/src/data/categories.js'),
  ]);
  return {
    products: [
      ...towelsModule.towelProducts,
      ...linenModule.linenProducts,
    ],
    categories: categoriesModule.categories,
  };
}

// This overwrites each record with what the file says, so an edit made in
// /hq to a product that also exists in the catalog files is lost on the
// next run, and a product unpublished there is published again. Nothing is
// ever deleted. --dry-run reports exactly what would change and writes
// nothing, which is the safe way to find out before running it for real.
const DRY_RUN = process.argv.includes('--dry-run');

// The fields worth reporting on: everything the files actually set, minus
// the bookkeeping Mongo adds.
function diffFields(existing, incoming) {
  if (!existing) return null; // a new record, not a change to one
  const changed = [];
  for (const [key, value] of Object.entries(incoming)) {
    const before = existing[key];
    const a = JSON.stringify(before === undefined ? null : before);
    const b = JSON.stringify(value === undefined ? null : value);
    if (a !== b) changed.push({ key, before, after: value });
  }
  return changed;
}

function describe(value) {
  const text = Array.isArray(value) ? value.join(', ') : String(value ?? '');
  return text.length > 70 ? text.slice(0, 67) + '...' : text;
}

async function run() {
  await connectDB();
  const { products, categories } = await loadFrontendData();

  if (DRY_RUN) {
    console.log('[seed] DRY RUN — nothing will be written.\n');
  }

  let productCount = 0;
  let newProducts = 0;
  let changedProducts = 0;

  for (const p of products) {
    const payload = { ...p, status: 'published' };
    const existing = await Product.findOne({ slug: p.slug }).lean();
    const changed = diffFields(existing, payload);

    if (!existing) {
      newProducts += 1;
      console.log(`  NEW      ${p.slug}`);
    } else if (changed.length) {
      changedProducts += 1;
      console.log(`  CHANGED  ${p.slug}`);
      for (const { key, before, after } of changed) {
        console.log(`             ${key}: "${describe(before)}" -> "${describe(after)}"`);
      }
    }

    if (!DRY_RUN) {
      await Product.findOneAndUpdate({ slug: p.slug }, payload, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    }
    productCount += 1;
  }

  let categoryCount = 0;
  for (const c of categories) {
    if (!DRY_RUN) {
      await Category.findOneAndUpdate({ slug: c.slug }, c, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    }
    categoryCount += 1;
  }

  console.log(
    `\n[seed] ${newProducts} new, ${changedProducts} changed, ` +
      `${productCount - newProducts - changedProducts} already matching.`
  );
  if (DRY_RUN) {
    console.log('[seed] DRY RUN — nothing was written. Re-run without --dry-run to apply.');
    await mongoose.disconnect();
    process.exit(0);
  }

  const byCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  console.log(`[seed] upserted ${productCount} products, ${categoryCount} categories.`);
  console.log('[seed] products by category:', byCategory);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
