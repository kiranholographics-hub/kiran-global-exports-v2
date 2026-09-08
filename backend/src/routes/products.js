import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category, subcategory, featured, search, limit } = req.query;
    const filter = { status: 'published' };
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (search) filter.name = { $regex: search, $options: 'i' };

    let query = Product.find(filter).sort({ createdAt: -1 });
    if (limit) query = query.limit(Number(limit));

    const products = await query;
    res.json(products);
  } catch (err) {
    console.error('[products] list error:', err.message);
    res.status(500).json({ error: 'Could not load products.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: 'published' });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    console.error('[products] detail error:', err.message);
    res.status(500).json({ error: 'Could not load product.' });
  }
});

router.get('/:slug/related', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    const related = await Product.find({
      slug: { $ne: product.slug },
      category: product.category,
      status: 'published',
    }).limit(3);
    res.json(related);
  } catch (err) {
    console.error('[products] related error:', err.message);
    res.status(500).json({ error: 'Could not load related products.' });
  }
});

export default router;
