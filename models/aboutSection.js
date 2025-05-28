import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const aboutSectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: imageSchema, 
  cta: String,
  order: Number,
});

export default mongoose.models.AboutSection || mongoose.model('AboutSection', aboutSectionSchema);