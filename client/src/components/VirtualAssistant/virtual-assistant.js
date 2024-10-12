import React, { useEffect, useState, useContext, useRef } from 'react';
import { Howl } from 'howler';
import axios from 'axios';
import { UserContext } from '../../UserContext';

function AudioPlayer() {
  const { isAuthenticated, user } = useContext(UserContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null); 

  useEffect(() => {
    const fetchPendingTasks = async () => {
      if (isAuthenticated && user) {
        try {
          console.log('Fetching pending tasks...');
          const response = await axios.get('http://localhost:3001/user/pendingTasks', {
            withCredentials: true,
            responseType: 'blob'
          });

          const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);

         
          if (!soundRef.current) {
            soundRef.current = new Howl({
              src: [audioUrl],
              format: ['mp3', 'ogg'],  
              onplay: () => {
                setIsPlaying(true);
                console.log('Sound is playing');
              },
              onend: () => {
                setIsPlaying(false);
                console.log('Sound has ended');
              },
              onloaderror: (id, err) => {
                console.error('Error loading audio:', err);
              },
              onplayerror: (id, err) => {
                console.error('Error playing audio:', err);
              },
            });
          }

          if (!sessionStorage.getItem('audioPlayed')) {
            soundRef.current.play();
            sessionStorage.setItem('audioPlayed', 'true'); 
          }
        } catch (error) {
          console.error('Error fetching pending tasks:', error);
        }
      }
    };

    if (isAuthenticated && user) {
      fetchPendingTasks();
    }
  }, [isAuthenticated, user]);

  return (
    <>
      {isPlaying && (
        <div className="fixed bottom-4 right-4">
          
          <img
            src="assets/virtual_assistant.gif" 
            alt="Virtual Assistant"
            className="h-32 w-32"
          />
        </div>
      )}
    </>
  );
}

export default AudioPlayer;
