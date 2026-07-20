'use client';

import { useState, useRef, useEffect } from 'react';

export function GlobalAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // We start muted or paused due to browser autoplay policies.
    // The user has to click to start.
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Keep it very ambient and quiet
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      {/* We use a placeholder silent track or ambient track if available. For the prototype, we point to a missing file or external free sound, but we'll mock it here. */}
      <audio ref={audioRef} src="/audio/ambient-forest.mp3" loop />
      
      <button 
        onClick={toggleAudio}
        className="group flex items-center gap-3 text-warmIvory/50 hover:text-warmIvory transition-colors duration-500 mix-blend-difference"
      >
        <div className="flex items-end gap-[2px] h-3">
          <div className={`w-[2px] bg-current transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></div>
          <div className={`w-[2px] bg-current transition-all duration-300 delay-75 ${isPlaying ? 'h-2 animate-pulse' : 'h-1'}`}></div>
          <div className={`w-[2px] bg-current transition-all duration-300 delay-150 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></div>
          <div className={`w-[2px] bg-current transition-all duration-300 delay-75 ${isPlaying ? 'h-1.5 animate-pulse' : 'h-1'}`}></div>
        </div>
        <span className="font-cormorant text-[9px] uppercase tracking-[0.3em]">
          {isPlaying ? 'Sound On' : 'Sound Off'}
        </span>
      </button>
    </div>
  );
}
