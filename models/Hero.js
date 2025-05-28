import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  headline: { type: String, required: true },
  subtext: { type: String, required: true },
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);