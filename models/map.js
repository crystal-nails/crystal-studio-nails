import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  address: { type: String, required: true },
});

export default mongoose.models.Map || mongoose.model('Map', mapSchema);