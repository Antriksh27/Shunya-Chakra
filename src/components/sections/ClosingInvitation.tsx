'use client';

import { useRef, useEffect, useState } from 'react';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { MagneticButton } from '../ui/MagneticButton';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

export function ClosingInvitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [embers, setEmbers] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number }>>([]);

  // Generate sparse, random embers on mount
  useEffect(() => {
    const emberCount = 12; // Sparse and subtle
    const newEmbers = Array.from({ length: emberCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 8 + 8, // 8s to 16s float time
      delay: Math.random() * 5 // 0s to 5s start delay
    }));
    setEmbers(newEmbers);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animate embers floating up and wobbling
    const emberElements = gsap.utils.toArray('.ember') as HTMLElement[];
    emberElements.forEach(ember => {
      // Upward float
      gsap.fromTo(ember,
        { y: '110vh', opacity: 0 },
        { 
          y: '-10vh', 
          opacity: 1, 
          duration: parseFloat(ember.dataset.duration || '10'), 
          delay: parseFloat(ember.dataset.delay || '0'),
          ease: "none",
          repeat: -1,
          yoyo: false 
        }
      );
      
      // Horizontal wobble
      gsap.to(ember, {
        x: 'random(-30, 30)',
        duration: 'random(2, 4)',
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Opacity flicker
      gsap.to(ember, {
        opacity: 0.2,
        duration: 'random(0.5, 1.5)',
        ease: "rough({ template: sine.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })",
        repeat: -1,
        yoyo: true
      });
    });

    // Breathing pulse for the logo
    gsap.to('.closing-logo', {
      opacity: 1,
      scale: 1.05,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
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

  }, { scope: containerRef, dependencies: [embers] });

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <section id="closing" ref={containerRef} className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-forestDark overflow-hidden z-20">
        
        {/* Absolute Darkness Transition from Philosophy */}
        <div ref={bgRef} className="absolute inset-0 bg-gradient-to-t from-black via-forestDark to-forestDark opacity-60 pointer-events-none scale-150 -top-[25vh]"></div>

        {/* Sparse Embers Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="ember absolute rounded-full bg-copper shadow-[0_0_8px_2px_rgba(189,124,82,0.6)]"
            style={{
              left: ember.left,
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              bottom: 0 // start at bottom
            }}
            data-duration={ember.duration}
            data-delay={ember.delay}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        <RevealOnScroll className="flex flex-col items-center w-full">
          
          <div className="closing-logo w-28 h-24 md:w-40 md:h-32 mb-12 opacity-60 relative">
            <Image 
              src="/logo black.png" 
              alt="Shunya Chakra"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(242,235,220,0.4)]"
            />
          </div>

          <h2 className="font-burowai text-[clamp(40px,8vw,110px)] text-warmIvory mb-2 tracking-wide drop-shadow-[0_0_20px_rgba(242,235,220,0.2)] leading-[0.9] uppercase text-center">
            COMPLETE THE CHAKRA
          </h2>
          
          <p className="font-cormorant text-copper text-xl mb-10 tracking-[0.2em] max-w-md mx-auto opacity-90 uppercase drop-shadow-[0_0_10px_rgba(189,124,82,0.5)] text-center">
            An invitation to return to the source.
          </p>

          <MagneticButton 
            onClick={scrollToWaitlist}
            className="btn-tactile px-14 py-6 text-warmIvory rounded-[30%_70%_70%_30%/40%_60%_40%_60%] hover:rounded-[70%_30%_30%_70%/60%_40%_60%_40%] font-cormorant uppercase tracking-[0.4em] text-[11px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-charcoal/40 backdrop-blur-md border border-copper/30 hover:border-copper transition-all duration-700 ease-out"
          >
            Enter the Circle
          </MagneticButton>
          
        </RevealOnScroll>
      </div>
      
      {/* Footer placed inside to prevent page overscroll */}
      <div className="absolute bottom-8 w-full flex justify-center mix-blend-overlay z-20 pointer-events-none">
        <p className="font-cormorant text-[10px] text-mutedBeige uppercase tracking-[0.4em] opacity-30">
          Â© 2026 Shunya Chakra.
        </p>
      </div>
    </section>
  );
}
