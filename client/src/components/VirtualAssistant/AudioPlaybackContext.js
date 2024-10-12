// src/AudioPlaybackContext.js

import React, { createContext, useState, useContext } from "react";

// Create a context
const AudioPlaybackContext = createContext();

// Custom hook to use the AudioPlaybackContext
export const useAudioPlayback = () => {
  return useContext(AudioPlaybackContext);
};

// Context provider
const AudioPlaybackProvider = ({ children }) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  return (
    <AudioPlaybackContext.Provider value={{ hasPlayed, setHasPlayed }}>
      {children}
    </AudioPlaybackContext.Provider>
  );
};

export default AudioPlaybackProvider;
