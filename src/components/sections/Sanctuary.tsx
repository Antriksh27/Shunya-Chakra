'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

export function Sanctuary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // 4 screens to allow for reading pauses
        pin: true,
        scrub: 2.5, // Slow, smooth breathing scrub
      }
    });

    const textBlocks = gsap.utils.toArray('.sanc-text') as HTMLElement[];

    // --- VIGNETTE 1 (0vw) ---
    // Reveal first text block immediately upon pinning
    tl.fromTo(textBlocks[0], 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }
    );
    // Pause to read
    tl.to({}, { duration: 1 });

    // --- SLIDE TO VIGNETTE 2 (-100vw) ---
    tl.to(trackRef.current, { x: '-100vw', duration: 2, ease: 'power2.inOut' });
    // Counter-translate background to keep it on screen (bg is 120vw wide, moves to 90vw)
    if (bgRef.current) tl.to(bgRef.current, { x: '90vw', duration: 2, ease: 'power2.inOut' }, "<");
    if (overlayRef.current) tl.to(overlayRef.current, { backgroundColor: 'rgba(20, 12, 10, 0.45)', duration: 2, ease: 'power2.inOut' }, "<");
    
    // Softly fade out the previous text as we leave it
    tl.to(textBlocks[0], { opacity: 0, x: -30, filter: 'blur(15px)', duration: 1 }, "<0.2");

    // Reveal text block 2 (starts fading in slightly before the camera stops moving)
    tl.fromTo(textBlocks[1], 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      "<1.2" 
    );
    // Pause to read
    tl.to({}, { duration: 1.5 });

    // --- SLIDE TO VIGNETTE 3 (-200vw) ---
    tl.to(trackRef.current, { x: '-200vw', duration: 2, ease: 'power2.inOut' });
    // Counter-translate background to keep it on screen (moves to 180vw, covering 180vw-300vw)
    if (bgRef.current) tl.to(bgRef.current, { x: '180vw', duration: 2, ease: 'power2.inOut' }, "<");
    if (overlayRef.current) tl.to(overlayRef.current, { backgroundColor: 'rgba(30, 10, 0, 0.4)', duration: 2, ease: 'power2.inOut' }, "<");

    // Softly fade out the previous text as we leave it
    tl.to(textBlocks[1], { opacity: 0, x: -30, filter: 'blur(15px)', duration: 1 }, "<0.2");

    // Reveal text block 3
    tl.fromTo(textBlocks[2], 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      "<1.2"
    );
    // Final pause
    tl.to({}, { duration: 1.5 });

    // No vertical entrance parallax for this section to prevent object-cover zooming

  }, { scope: containerRef });

  return (
    <div className="sanctuary-wrapper w-full">
      <section id="sanctuary" ref={containerRef} className="relative w-full h-[100dvh] bg-forestDark overflow-hidden z-20">
        
        {/* Horizontal Track (3 screens wide) */}
        <div ref={trackRef} className="absolute top-0 left-0 h-full w-[300vw] flex items-center">
          
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* 120vw width prevents massive zoom on the 16:9 image while allowing 20vw of parallax bleed across the 3 screens */}
            <div ref={bgRef} className="relative w-[120vw] h-full">
              <Image 
                src="/images/sanctuary-pano.png"
                alt="Sanctuary Journey"
                fill
                className="object-cover mix-blend-luminosity brightness-90"
                priority
              />
            </div>
          </div>

          {/* Dynamic Color Overlay */}
          <div ref={overlayRef} className="absolute inset-0 z-0 mix-blend-overlay pointer-events-none"></div>
          {/* Vignette */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(10,12,10,0.8)_0%,transparent_20%,transparent_80%,rgba(10,12,10,0.9)_100%)] pointer-events-none"></div>

          {/* Vignette 1: Entrance */}
          <div className="relative z-10 w-[100vw] h-full flex flex-col items-center justify-center px-4 md:px-24">
            <div className="sanc-text w-full max-w-4xl text-center">
               <div className="font-galacthic uppercase tracking-[0.5em] text-[#8ea4b0] opacity-80 text-xs md:text-sm mb-6 drop-shadow-lg">
                 Enter The Circle
               </div>
               <h2 className="font-burowai text-[clamp(44px,7vw,100px)] text-warmIvory leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                 The flame at<br/>the center.
               </h2>
            </div>
          </div>

          {/* Vignette 2: The Path */}
          <div className="relative z-10 w-[100vw] h-full flex flex-col items-center justify-center px-4 md:px-24">
            <div className="sanc-text w-full max-w-3xl">
              <p className="font-cormorant text-warmIvory/80 text-2xl md:text-4xl leading-relaxed text-center drop-shadow-xl font-medium">
                Where the air is thick with the scent of damp soil and woodsmoke. Here, the ancient songs of Gujarat echo through the night.
              </p>
            </div>
          </div>

          {/* Vignette 3: The Sanctuary (Firelight) */}
          <div className="relative z-10 w-[100vw] h-full flex flex-col items-center justify-center px-4 md:px-24">
            <div className="sanc-text w-full max-w-4xl text-center flex flex-col items-center">
               <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-copper/50 mb-10"></div>
               <h2 className="font-burowai text-[clamp(44px,7vw,100px)] text-[#d68e61] leading-[0.9] drop-shadow-[0_0_50px_rgba(214,142,97,0.4)] mb-8">
                 The Ritual Space
               </h2>
               <p className="font-cormorant text-warmIvory/70 text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-xl bg-forestDark/30 p-8 rounded-lg backdrop-blur-md border border-copper/10">
                 An altar built from raw earth and devotion. Shadows dance on handcrafted stone, and the glow of sacred earthen lamps meets the rhythm of footsteps moving in celebration.
               </p>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
