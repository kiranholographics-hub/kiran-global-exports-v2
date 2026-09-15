import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorRole: { type: String, trim: true }, // e.g. "Purchasing Manager, ABC Hotels"
    country: { type: String, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    published: { type: Boolean, default: true },
    // Lower shows first; ties fall back to newest first. Lets the owner
    // pin their best quotes to the front without depending on post date.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TestimonialSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
