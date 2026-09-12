import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true }, // WhatsApp / phone
    productInterest: {
      type: String,
      enum: ['Towels', 'Linen', 'Both', 'Custom / Private Label'],
      required: true,
    },
    estimatedQuantity: { type: String, trim: true },
    message: { type: String, trim: true },
    productSlug: { type: String, trim: true }, // set when inquiry originates from a product detail page
    source: { type: String, trim: true, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

EnquirySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
