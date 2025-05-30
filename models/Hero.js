import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  subtext: { type: String, required: true },
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);