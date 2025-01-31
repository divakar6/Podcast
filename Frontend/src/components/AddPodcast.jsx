import React, { useState } from 'react';
import axios from 'axios'; 

const AddPodcast = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !audio) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('audio', audio);

    try {
      const response = await axios.post('http://localhost:5000/api/podcasts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      console.log('Podcast uploaded successfully:', response.data);
      onAdd(response.data); // Notify parent component
      setTitle('');
      setAudio(null);
    } catch (error) {
      console.error('Error uploading podcast:', error);
    }
  };

  return (
    <div className="add-podcast">
      <h2>Add New Podcast</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Podcast Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
        />
        <button type="submit">Add Podcast</button>
      </form>
    </div>
  );
};

export default AddPodcast;