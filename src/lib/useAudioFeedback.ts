'use client';

import { useCallback } from 'react';

// Shared audio instances (so we don't create multiple DOM elements on every click)
let clickAudio: HTMLAudioElement | null = null;
let ctaAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
  clickAudio = new Audio('/audio/stone-click.mp3');
  ctaAudio = new Audio('/audio/bell-fragment.mp3');
}

export function useAudioFeedback() {
  const playSound = useCallback((type: 'click' | 'cta') => {
    // Check if audio is enabled globally
    if (document.documentElement.dataset.audioEnabled !== 'true') return;

    const audio = type === 'click' ? clickAudio : ctaAudio;
    if (audio) {
      // Reset time to allow rapid clicking
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.warn(`Failed to play ${type} audio (might be missing):`, err);
      });
    }
  }, []);

  return playSound;
}
