import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  logoUrl: String,
  phone: String,
  address: String,
  copyright: String,
  links: [
    {
      label: String,
      url: String,
    },
  ],
  social: {
    instagram: String,
    tiktok: String,
    whatsapp: String,
  },
});

export default mongoose.models.Footer || mongoose.model('Footer', footerSchema);