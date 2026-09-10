// One-off, rerunnable migration: reads the frontend's structured product /
// category data (the editorial source of truth) and upserts it into
// MongoDB, keyed on each record's stable slug. Run with `npm run seed`
// from backend/. Requires backend/.env to have a working MONGODB_URI.
//
// This is the only place the backend reads from ../frontend — a content
// migration, not a runtime dependency. The catalogue-browsing pages
// (Towels/Rugs/Linen listing, category and detail routes, Collections)
// now read products live from GET /api/products, which is backed by this
// seeded data — so re-run this after editing frontend/src/data/*.js to
// push those edits into the database the site actually reads from.
// Category data and the homepage's own teaser sections still render from
// the frontend's static files directly (see frontend/src/data/products.js
// for why), so editing categories.js still needs no re-seed to show up.

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

async function loadFrontendData() {
  const productsModule = await import('../../../frontend/src/data/products.js');
  const categoriesModule = await import('../../../frontend/src/data/categories.js');
  return {
    products: productsModule.products,
    categories: categoriesModule.categories,
  };
}

async function run() {
  await connectDB();
  const { products, categories } = await loadFrontendData();

  let productCount = 0;
  for (const p of products) {
    await Product.findOneAndUpdate(
      { slug: p.slug },
      { ...p, status: 'published' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    productCount += 1;
  }

  let categoryCount = 0;
  for (const c of categories) {
    await Category.findOneAndUpdate({ slug: c.slug }, c, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    categoryCount += 1;
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
