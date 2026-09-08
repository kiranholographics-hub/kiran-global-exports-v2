// One-off, rerunnable migration: reads the frontend's structured product /
// category data (the editorial source of truth) and upserts it into
// MongoDB, keyed on each record's stable slug. Run with `npm run seed`
// from backend/. Requires backend/.env to have a working MONGODB_URI.
//
// This is the only place the backend reads from ../frontend — a content
// migration, not a runtime dependency. The public site itself renders
// products/categories from the frontend's local data directly; this
// keeps a MongoDB-backed mirror ready for a future admin panel.

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

async function loadFrontendData() {
  const productsModule = await import('../../../frontend/data/products.js');
  const categoriesModule = await import('../../../frontend/data/categories.js');
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

  console.log(`[seed] upserted ${productCount} products, ${categoryCount} categories.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
