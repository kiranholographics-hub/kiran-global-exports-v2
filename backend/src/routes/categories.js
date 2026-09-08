import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('[categories] list error:', err.message);
    res.status(500).json({ error: 'Could not load categories.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: 'Category not found.' });
    res.json(category);
  } catch (err) {
    console.error('[categories] detail error:', err.message);
    res.status(500).json({ error: 'Could not load category.' });
  }
});

export default router;
