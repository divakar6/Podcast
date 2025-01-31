const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Podcast = require('./podcast');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  
app.use(express.json());

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/api/podcasts', async (req, res) => {
    try {
      const podcasts = await Podcast.find().select('-audio');
      res.json(podcasts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
app.post('/api/podcasts', upload.single('audio'), async (req, res) => {
    try {
      const { title } = req.body;
      if (!req.file) return res.status(400).json({ message: "Audio file is required!" });
  
      const newPodcast = new Podcast({
        title,
        audio: req.file.buffer,
        audioType: req.file.mimetype,
      });
  
      await newPodcast.save();
      res.status(201).json({ message: 'Podcast uploaded successfully!' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
app.delete('/api/podcasts/:id', async (req, res) => {
    try {
      await Podcast.findByIdAndDelete(req.params.id);
      res.json({ message: 'Podcast deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
