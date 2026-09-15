import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, trim: true }, // logo URL — omit for a text-only compliance line
    alt: { type: String, trim: true }, // image alt text; falls back to `name` on the frontend if blank
    text: { type: String, trim: true }, // shown instead of a logo when `image` is blank (e.g. "REACH & GPSR compliant")
    caption: { type: String, trim: true }, // small attribution line, e.g. who actually holds the certificate
    published: { type: Boolean, default: true },
    // Lower shows first; ties fall back to newest first.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CertificationSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
