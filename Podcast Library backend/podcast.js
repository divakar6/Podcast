const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audio: { type: Buffer, required: true }, 
  audioType: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);
