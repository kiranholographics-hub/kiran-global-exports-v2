import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    heroImage: { type: String, trim: true },
    intro: { type: String, trim: true },
    subcategories: [
      {
        slug: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

CategorySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
