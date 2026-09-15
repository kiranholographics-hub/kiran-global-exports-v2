import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    metaDescription: { type: String, trim: true },
    body: { type: String, required: true, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PageSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
