'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { MagneticButton } from '../ui/MagneticButton';
import { useAudioFeedback } from '@/lib/useAudioFeedback';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function Invitation() {
  const playSound = useAudioFeedback();
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isSealed, setIsSealed] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleCTA = () => {
    if (isSealed) return;
    playSound('cta');
    
    if (reducedMotion) {
      window.alert('Route to General RSVP / Ticket flow');
      return;
    }

    setIsSealed(true);
    
    // Live Seal Animation
    const btn = ctaRef.current?.querySelector('button');
    if (btn) {
      gsap.to(btn, {
        width: '64px', // Shrink to circle
        height: '64px',
        padding: 0,
        color: 'transparent',
        rotation: 360,
        duration: 2.0,
        ease: 'power3.out',
        onComplete: () => {
          gsap.to(btn, {
            scale: 1.5,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              window.alert('Route to General RSVP / Ticket flow');
            }
          });
        }
      });
    }
  };

  return (
    <section id="invitation" className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* Rotating Conic Gradient Background removed */}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6vw max-w-4xl w-full">
        <RevealOnScroll className="mb-12">
          <h2 className="font-burowai text-[clamp(44px,6vw,72px)] text-bone uppercase tracking-widest mb-6">
            The Circle Is Complete
          </h2>
          <p className="font-galacthic text-[clamp(22px,3vw,34px)] text-gold">
            Return to the source.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mb-16">
          <div ref={ctaRef} className="relative flex items-center justify-center h-[100px]">
            <MagneticButton className="px-12 py-6 text-lg absolute" onClick={handleCTA}>
              <span className={isSealed ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                Join the Sacred Gathering
              </span>
            </MagneticButton>
            {/* The Shunya Seal Icon (fades in during shrink) */}
            <div className={`absolute pointer-events-none transition-opacity duration-500 delay-300 ${isSealed ? 'opacity-100' : 'opacity-0'}`}>
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-void" fill="none" stroke="currentColor" strokeWidth="6">
                <circle cx="50" cy="50" r="40" strokeLinecap="round" strokeDasharray="2 12" />
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4} className="flex flex-col md:flex-row items-center gap-8 font-quicksand text-boneDim text-sm uppercase tracking-widest">
          {/* Magnetic-underline hover implemented via CSS classes */}
          <a 
            href="mailto:shunya.chakra@gmail.com" 
            className="group relative pb-2 overflow-hidden hover:text-bone transition-colors duration-300"
            data-cursor="interactive"
          >
            shunya.chakra@gmail.com
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>
          
          <span className="hidden md:block w-1 h-1 bg-boneDim rounded-full" />
          
          <a 
            href="https://instagram.com/shunyachakra" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative pb-2 overflow-hidden hover:text-bone transition-colors duration-300"
            data-cursor="interactive"
          >
            @shunyachakra
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>
        </RevealOnScroll>

      </div>
    </section>
  );
}
