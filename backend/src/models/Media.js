import mongoose from 'mongoose';

// Images are stored directly in MongoDB (not on the app server's disk),
// so they survive a redeploy regardless of how the host handles the
// filesystem between deploys — the same durability the rest of the
// app's data already gets from Atlas, with no extra infrastructure.
const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, trim: true },
    contentType: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    // Excluded from default queries so listing the library never pulls
    // image bytes over the wire — fetched explicitly via .select('+data')
    // only by the route that serves the raw image.
    data: { type: Buffer, required: true, select: false },
  },
  { timestamps: true }
);

// Listing the library must never pull image bytes over the wire — only
// used when a query explicitly wants `data` (the raw-bytes route).
MediaSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.data;
    return ret;
  },
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
