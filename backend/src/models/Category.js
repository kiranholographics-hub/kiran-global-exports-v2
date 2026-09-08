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

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
