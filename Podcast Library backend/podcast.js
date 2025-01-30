const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audioUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);