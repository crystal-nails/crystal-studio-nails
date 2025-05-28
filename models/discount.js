import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true },
  reason: { type: String, default: 'Ersten Besuch' },
  amount: { type: String, default: '10%' },
  description: { type: String, default: 'Verschenke ein Lächeln!...' },
});

export default mongoose.models.Discount || mongoose.model('Discount', discountSchema);