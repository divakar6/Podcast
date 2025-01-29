import React, { useState } from 'react';
import Header from './components/Header';
import AddPodcast from './components/AddPodcast';
import PodcastList from './components/PodcastList';

const App = () => {
  const [podcasts, setPodcasts] = useState([]);

  const handleAddPodcast = (newPodcast) => {
    setPodcasts([...podcasts, newPodcast]);
  };

  const handleDeletePodcast = (id) => {
    setPodcasts(podcasts.filter(podcast => podcast.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AddPodcast onAdd={handleAddPodcast} />
        <PodcastList
          podcasts={podcasts}
          onDelete={handleDeletePodcast}
        />
      </main>
    </div>
  );
};

export default App;