import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true }, // e.g. "Export Manager"
    bio: { type: String, trim: true },
    photo: { type: String, trim: true }, // optional image URL
    published: { type: Boolean, default: true },
    // Lower shows first; ties fall back to newest first — lets the owner
    // control the display order (e.g. founder first) from the dashboard.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TeamMemberSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
