import React, { useState, useRef } from 'react';

const PodcastPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="podcast-player">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlay} className="play-btn">
      <i className={isPlaying ? "ri-pause-circle-fill" : "ri-play-circle-fill"}></i>
      </button>
    </div>
  );
};

export default PodcastPlayer;