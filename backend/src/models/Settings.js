import mongoose from 'mongoose';

// Singleton settings document — always read/written with the fixed key
// 'global', so there is exactly one settings record for the whole app.
// Values here override the matching env var when present, so the owner
// can change them from the /hq dashboard instead of Hostinger's env
// panel. Add more fields here as more settings need a dashboard toggle.
const SettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    notifyWhatsappNumber: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

SettingsSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
