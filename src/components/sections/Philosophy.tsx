'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const slides = [
    "For nine nights, the earth remembers.",
    "Shunya Chakra is not an escape. It is a return to the oldest rhythm we know.",
    "The sacred circle forms. The drums begin. Thousands move as one.",
    "An altar carved from soil and fire, calling you to the living spirit of Navratri."
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    const textElements = gsap.utils.toArray('.phil-text') as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 4 screens of scrolling reading time
        pin: true,
        scrub: 1,
      }
    });

    // Animate each slide fading in, pausing, then fading out and up
    textElements.forEach((text, i) => {
      // Fade in from below
      tl.fromTo(text, 
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
      );
      
      // Pause for reading
      tl.to({}, { duration: 1 }); // Empty tween creates a pause in scrub

      // Fade out and move up (except maybe the last one, but we'll fade them all to black)
      // Hide out going slide
      if (i < textElements.length - 1) {
        tl.to(text, { opacity: 0, duration: 1, filter: 'blur(15px)' });
      }
    });

    // Entrance Parallax (Curtain Reveal)
    if (bgRef.current) {
      gsap.fromTo(bgRef.current,
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <div className="philosophy-wrapper w-full">
      <section id="philosophy" ref={containerRef} className="relative w-full h-screen bg-forestDark overflow-hidden z-20 flex items-center justify-center">
        
        {/* Absolute Darkness Void */}
        <div ref={bgRef} className="absolute inset-0 bg-gradient-to-b from-[#e6ddcf] via-forestDark to-forestDark opacity-10 pointer-events-none mix-blend-overlay scale-150 -top-[25vh]"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center px-4 h-full">
          
          {slides.map((text, index) => (
            <div key={index} className="phil-text absolute w-full px-4 flex flex-col items-center text-center opacity-0 pointer-events-none">
              
              {/* Very faint background mark behind the active text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] pointer-events-none -z-10">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full text-warmIvory">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="25" />
                </svg>
              </div>

              <h2 className="font-burowai text-[clamp(28px,7vw,100px)] text-warmIvory leading-[0.9] max-w-4xl mx-auto drop-shadow-[0_0_20px_rgba(242,235,220,0.1)]">
                {text}
              </h2>

            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
