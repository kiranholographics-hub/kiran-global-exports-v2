import mongoose from 'mongoose';

// Field-for-field mirror of frontend/data/products.js — kept here so a
// future admin panel or dynamic catalogue can read/write the same shape
// the frontend already renders from. Not used by the public site today
// (the frontend renders from its local structured data for reliability),
// but the seed script keeps this collection in sync so it's ready to
// switch on without a schema migration later.

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ['towels', 'linen'], required: true },
    subcategory: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true },
    description: { type: String, trim: true },
    material: { type: String, trim: true },
    gsm: { type: String, trim: true },
    size: { type: String, trim: true },
    colors: [{ type: String, trim: true }],
    construction: { type: String, trim: true },
    applications: [{ type: String, trim: true }],
    customization: { type: String, trim: true },
    moq: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    // Towel-only fields in the static catalogue today — kept optional so
    // linen records simply omit them.
    imageThumbs: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    alt: { type: String, trim: true },
    bestFor: { type: String, trim: true },
    packing: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
