import React, { useState } from 'react';
import PodcastPlayer from '../components/PodcastPlayer';

const PodcastList = ({ podcasts, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  
  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="podcast-list">
      <h2>My Podcasts</h2>
      
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      {filteredPodcasts.length === 0 ? (
        <p>No podcasts found.</p>
      ) : (
        filteredPodcasts.map(podcast => (
          <div key={podcast.id} className="podcast-item">
            <h3>{podcast.title}</h3>
            <PodcastPlayer audioUrl={podcast.audioUrl} />
            <button
              onClick={() => onDelete(podcast.id)}
              className="delete-btn"
            >
              <i className="ri-delete-bin-6-line"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PodcastList;