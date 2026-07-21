'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function StickyCTA() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useGSAP(() => {
    // Start completely hidden and unclickable
    gsap.set(btnRef.current, { opacity: 0, scale: 0.8, pointerEvents: 'none' });
    
    const handleEnter = () => {
      // Fade in 3 seconds AFTER the 3-second hero intro finishes (total 6s delay)
      gsap.to(btnRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 6,
        ease: 'power3.out',
        clearProps: 'opacity,scale,pointerEvents' // Very important to clear so tailwind hover works!
      });
    };

    window.addEventListener('app-entered', handleEnter);
  });

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      <button 
        ref={btnRef}
        onClick={scrollToWaitlist}
        className="flex items-center justify-center px-6 md:px-8 py-4 md:py-5 bg-[#e6ddcf] text-charcoal shadow-2xl rounded-[30%_70%_70%_30%/40%_60%_40%_60%] hover:rounded-[70%_30%_30%_70%/60%_40%_60%_40%] transition-all duration-700 ease-out border border-charcoal/10 hover:border-charcoal/30 backdrop-blur-md hover:scale-105"
        data-cursor="interactive"
      >
        <span className="font-cormorant uppercase text-xs md:text-sm tracking-[0.2em] font-bold">
          Join the Waitlist
        </span>
      </button>
    </div>
  );
}
