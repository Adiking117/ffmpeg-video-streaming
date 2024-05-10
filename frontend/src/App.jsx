import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VideoPlayer from './VideoPlayer';

function App() {
  const playerRef = useRef(null);
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    fetch('localhost:8000/uploads')
      .then(response => response.json())
      .then(data => {
        setVideoLink(data.videoUrl);
      })
      .catch(error => {
        console.error('Error fetching video link:', error);
      });
  }, []);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: 'application/x-mpegURL'
      }
    ]
  };

  const handlePlayerReady = player => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('Player is waiting');
    });

    player.on('dispose', () => {
      console.log('Player will dispose');
    });
  };

  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default App;
