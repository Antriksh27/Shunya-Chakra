'use client';

import { useState, useEffect, useRef } from 'react';

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Stub the audio
    const audio = new Audio('/audio/ambient-loop.mp3');
    audio.loop = true;
    
    // We add an error listener so if it fails we just catch it and log
    audio.addEventListener('error', () => {
      console.warn('ambient-loop.mp3 is missing, audio toggle is stubbed.');
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      document.documentElement.dataset.audioEnabled = 'false';
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        document.documentElement.dataset.audioEnabled = 'true';
      }).catch((err) => {
        console.warn('Audio playback failed (file might be missing):', err);
        // Even if the file is missing, we enable interactions sound
        setIsPlaying(true);
        document.documentElement.dataset.audioEnabled = 'true';
      });
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-bone/20 hover:border-bone transition-colors"
      data-cursor="interactive"
      aria-label={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-bone">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-bone ml-1">
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      )}
    </button>
  );
}
