import React, { useState } from 'react';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import AddPodcast from './components/AddPodcast';
import PodcastList from './components/PodcastList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [podcasts, setPodcasts] = useState([]);

  const handleSignup = async (user) => {
    try {
      const mockToken = 'mock-jwt-token';
      const mockUser = { ...user, id: Date.now() }; 

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      setIsAuthenticated(true);
  
      console.log('Signup successful:', mockUser); 
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  const handleLogin = async (user) => {
    try {

      const mockToken = 'mock-jwt-token';

      const storedUser = JSON.parse(localStorage.getItem('user'));
  
      if (storedUser && storedUser.email === user.email) {
        localStorage.setItem('token', mockToken); 
        setIsAuthenticated(true); 
        console.log('Login successful:', storedUser); 
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
    const handleAddPodcast = (newPodcast) => {
    setPodcasts([...podcasts, newPodcast]);
  };

  const handleDeletePodcast = (id) => {
    setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {!isAuthenticated ? (
          <>
            {showSignup ? (
              <Signup onSignup={handleSignup} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            <button
              onClick={() => setShowSignup(!showSignup)}
              className="switch-btn"
            >
              {showSignup ? 'Already have an account? Login' : 'Need an account? Signup'}
            </button>
          </>
        ) : (
          <>
            <AddPodcast onAdd={handleAddPodcast} />
            <PodcastList
              podcasts={podcasts}
              onDelete={handleDeletePodcast}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;