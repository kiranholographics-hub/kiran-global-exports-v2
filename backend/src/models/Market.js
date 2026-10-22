import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    countryName: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true, uppercase: true },
    status: { type: String, enum: ['draft', 'active', 'paused', 'archived'], default: 'draft' },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    notes: { type: String, trim: true },
    // Admin-edited page text. Each field replaces the matching default in
    // frontend/src/data/marketContent.js only when it is set; empty means
    // "use the copy that ships with the site".
    content: {
      heading: { type: String, trim: true, default: '' },
      lead: { type: String, trim: true, default: '' },
      faqs: {
        type: [new mongoose.Schema({ q: String, a: String }, { _id: false })],
        default: [],
      },
    },
    activatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

MarketSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Market || mongoose.model('Market', MarketSchema);
