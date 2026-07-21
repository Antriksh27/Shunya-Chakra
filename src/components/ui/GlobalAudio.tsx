'use client';

import { useState } from 'react';
import YouTube from 'react-youtube';

export function GlobalAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [wantsSound, setWantsSound] = useState(false);

  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.setVolume(50); 
    
    // If user already clicked "Enter With Sound" before the player was ready
    if (wantsSound) {
      event.target.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnter = (withSound: boolean) => {
    setWantsSound(withSound);
    setHasEntered(true);
    
    if (withSound && player) {
      player.playVideo();
      setIsPlaying(true);
    }
    
    // Slight delay to allow the dialog to fade out before triggering intro animations
    setTimeout(() => {
      window.dispatchEvent(new Event('app-entered'));
    }, 100);
  };

  return (
    <>
      {/* Hidden YouTube Player for Background Music */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
        <YouTube 
          videoId="AHr_KLFCG2g" 
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 0,
              loop: 1,
              playlist: 'AHr_KLFCG2g' 
            },
          }}
          onReady={onReady}
        />
      </div>

      {/* The Entry Gate */}
      {!hasEntered && (
        <div className="fixed inset-0 z-[9999] bg-[#0a0c0a] flex flex-col items-center justify-center text-warmIvory px-6 transition-opacity duration-1000">
          <div className="max-w-2xl text-center flex flex-col items-center animate-in fade-in duration-1000 zoom-in-95">
            <h1 className="font-burowai text-4xl md:text-5xl mb-8 tracking-widest text-warmIvory/90 drop-shadow-lg">
              THE RHYTHM AWAITS
            </h1>
            <p className="font-cormorant text-lg md:text-2xl text-warmIvory/70 mb-12 leading-relaxed">
              Every ritual begins with a vibration. To truly experience Shunya Chakra, we invite you to allow the sacred rhythm to guide your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
              <button 
                onClick={() => handleEnter(true)}
                className="px-8 py-4 w-full sm:w-auto border border-warmIvory/30 hover:border-warmIvory/80 hover:bg-warmIvory/5 transition-all font-cormorant uppercase tracking-[0.2em] text-sm"
              >
                Enter With Sound
              </button>
              <button 
                onClick={() => handleEnter(false)}
                className="px-8 py-4 w-full sm:w-auto border border-transparent hover:border-warmIvory/20 text-warmIvory/50 hover:text-warmIvory/80 transition-all font-cormorant uppercase tracking-[0.2em] text-sm"
              >
                Enter in Silence
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* The Audio Toggle Button (Only visible after entering) */}
      {hasEntered && (
        <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] animate-in fade-in duration-1000">
          <button 
            onClick={toggleAudio}
            className="group flex items-center gap-3 md:gap-4 text-warmIvory/70 hover:text-warmIvory transition-colors duration-500 drop-shadow-lg"
            data-cursor="interactive"
          >
            <div className="flex items-end gap-[3px] h-4 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className={`w-[2px] bg-current transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`}></div>
              <div className={`w-[2px] bg-current transition-all duration-300 delay-75 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1.5'}`}></div>
              <div className={`w-[2px] bg-current transition-all duration-300 delay-150 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`}></div>
              <div className={`w-[2px] bg-current transition-all duration-300 delay-75 ${isPlaying ? 'h-2 animate-pulse' : 'h-1.5'}`}></div>
            </div>
            <span className="font-cormorant text-xs md:text-[13px] font-semibold uppercase tracking-[0.3em] md:tracking-[0.4em]">
              {isPlaying ? 'Sound On' : 'Sound Off'}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
