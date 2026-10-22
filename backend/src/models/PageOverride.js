import mongoose from 'mongoose';

// Admin-edited text for the hand-written landing pages under /export/* and
// /solutions/* (frontend/src/data/seoLandingPages.js). The code keeps the
// default copy; a row here replaces only the fields it actually holds, so
// deleting the row (or clearing every field) restores the original text.
const PageOverrideSchema = new mongoose.Schema(
  {
    section: { type: String, enum: ['export', 'solutions'], required: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    seoTitle: { type: String, trim: true, default: '' },
    seoDescription: { type: String, trim: true, default: '' },
    heading: { type: String, trim: true, default: '' },
    lead: { type: String, trim: true, default: '' },
    intro: { type: [String], default: [] },
    faqs: {
      type: [new mongoose.Schema({ q: String, a: String }, { _id: false })],
      default: [],
    },
  },
  { timestamps: true }
);

PageOverrideSchema.index({ section: 1, slug: 1 }, { unique: true });

PageOverrideSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.PageOverride || mongoose.model('PageOverride', PageOverrideSchema);
