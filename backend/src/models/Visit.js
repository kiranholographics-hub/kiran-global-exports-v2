import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, trim: true },
    referrer: { type: String, trim: true, default: '' },
    userAgent: { type: String, trim: true, default: '' },
    // Only the first two octets are kept (e.g. 103.21.x.x) — enough to spot
    // repeat/bot traffic without storing a visitor's full IP address.
    ipHint: { type: String, trim: true, default: '' },
    // Looked up offline (geoip-lite) from the IP at request time — never
    // sent to a third party. Empty string when it can't be resolved
    // (localhost, private IP, unrecognised range, etc.).
    country: { type: String, trim: true, default: '' },
    countryCode: { type: String, trim: true, default: '' },
    notified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

VisitSchema.index({ notified: 1, createdAt: 1 });

export default mongoose.models.Visit || mongoose.model('Visit', VisitSchema);
