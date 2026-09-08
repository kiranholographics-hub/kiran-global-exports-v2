import mongoose from 'mongoose';

const ChatLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    question: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
    },
    decidedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ChatLeadSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.ChatLead || mongoose.model('ChatLead', ChatLeadSchema);
