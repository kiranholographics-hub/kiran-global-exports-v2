import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // select: false — never returned by a normal query; routes that need
    // to check a password must explicitly `.select('+passwordHash')`.
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin'], default: 'admin' },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash; // belt-and-suspenders — never serialize this even if a route forgets to exclude it
    return ret;
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
