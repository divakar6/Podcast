import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import AddPodcast from './components/AddPodcast';
import PodcastList from './components/PodcastList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/podcasts');
        setPodcasts(response.data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    if (isAuthenticated) {
      fetchPodcasts();
    }
  }, [isAuthenticated]);

  const handleAddPodcast = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/podcasts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('Podcast uploaded successfully:', response.data);

      const podcastsResponse = await axios.get('http://localhost:5000/api/podcasts');
      setPodcasts(podcastsResponse.data);
    } catch (error) {
      console.error('Error uploading podcast:', error);
    }
  };

  const handleDeletePodcast = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/podcasts/${id}`);
      setPodcasts(podcasts.filter((podcast) => podcast._id !== id));
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

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