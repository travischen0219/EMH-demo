import React, { useState, useRef } from 'react';

export interface IAudioPlayer {
    audio: string
}

const AudioPlayer: React.FC<IAudioPlayer> = ({audio}) => {
  // Define a reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);
  // Define a state to keep track of playing status
  const [isPlaying, setIsPlaying] = useState(false);

  const audioType = 'audio/mpeg'; // MIME type for your audio format
  const blob = new Blob([audio], { type: audioType });
  const audioUrl = URL.createObjectURL(blob);

  // Function to handle play click
  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to handle stop click
  const handleStopClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the start
      setIsPlaying(false);
    }
  };

  return (
    <p className="inline">
      <audio ref={audioRef} src={`data:audio/mp3;base64,${audio}`} />
      {
        isPlaying ? 
        <button onClick={handleStopClick} disabled={!isPlaying}>
            ⏸️
        </button>
        :
        <button onClick={handlePlayClick} disabled={isPlaying}>
            ▶️
        </button>
      }
    </p>
  );
};

export default AudioPlayer;