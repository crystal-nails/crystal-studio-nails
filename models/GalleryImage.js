

const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }, 
});

module.exports = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
