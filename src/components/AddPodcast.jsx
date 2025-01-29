import React, { useState } from 'react';

const AddPodcast = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [audio, setAudio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !audio) return;
    
    const newPodcast = {
      id: Date.now(),
      title,
      audioUrl: URL.createObjectURL(audio)
    };
    
    onAdd(newPodcast);
    setTitle('');
    setAudio(null);
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