'use client';

import { useState } from 'react';

export function StickyCTA() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      <button 
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
