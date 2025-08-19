const mongoose = require('mongoose');

const overlaySchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'logo'], required: true },
  content: { type: String, required: true }, // text or image filename
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  color: String,         // text color (optional)
  fontSize: Number,      // for text overlays
});

module.exports = mongoose.model('Overlay', overlaySchema);
