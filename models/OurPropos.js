import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  backgroundImage: { type: String },
  headline: { type: String, required: true },
  subtext: { type: String, required: true },
  price: { type: String, default: '' },
});

const OurProposSchema = new mongoose.Schema({
  items: { type: [ItemSchema], default: [] },
});

export default mongoose.models.OurPropos || mongoose.model('OurPropos', OurProposSchema);