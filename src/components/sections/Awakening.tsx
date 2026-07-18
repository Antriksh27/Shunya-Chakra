'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
// Removed NineNights import

const FRAGMENTS = [
  "Every step holds a story, waiting to unfold.",
  "Not heard. Only felt. Like the earth beneath your feet, and the silence between your breaths.",
  "Nine timeless energies, guiding every soul a little closer to its own light."
];

export function Awakening() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all cinematic text elements
    const fragments = gsap.utils.toArray('.cinematic-fragment');
    
    // Create a timeline bound to the entire 400vh container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Heavy smooth scrub
      }
    });

    fragments.forEach((frag: any, i) => {
      // Fade In with blur dissolve
      tl.fromTo(frag, 
        { opacity: 0, scale: 0.95, filter: 'blur(20px)' }, 
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.5 }
      );
      // Hold in center for much longer
      tl.to(frag, { opacity: 1, duration: 5 });
      
      // Fade Out to mist
      tl.to(frag, { opacity: 0, scale: 1.05, filter: 'blur(20px)', duration: 2 });
    });

  }, { scope: containerRef });

  return (
    <section id="awakening" className="relative bg-transparent">
      
      {/* 
        Tall scrolling wrapper. 
        500vh means it takes 5 full screen scrolls to pass this section,
        giving the poetry plenty of time to linger.
      */}
      <div ref={containerRef} className="relative w-full h-[500vh]">
        
        {/* Sticky container locks to screen */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
          
          {/* Header Title Sequence */}
          <div className="cinematic-fragment absolute text-center w-full max-w-4xl opacity-0 pointer-events-none">
            <h2 className="font-burowai text-[clamp(40px,6vw,72px)] text-bone uppercase mb-8 tracking-wide glow-text drop-shadow-2xl">
              The Chakra Begins to Turn
            </h2>
            <p className="font-galacthic text-[clamp(20px,2.5vw,28px)] text-boneDim tracking-widest">
              Not around you. Within you.
            </p>
          </div>

          {/* Poetry Sequence */}
          {FRAGMENTS.map((text, i) => (
            <p 
              key={i} 
              className="cinematic-fragment absolute text-center font-quicksand text-bone text-[clamp(24px,3.5vw,48px)] leading-[1.6] max-w-5xl px-4 glow-text drop-shadow-2xl opacity-0 pointer-events-none"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
