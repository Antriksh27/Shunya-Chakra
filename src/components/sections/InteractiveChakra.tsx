'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, Draggable, useGSAP } from '@/lib/gsap';

export function InteractiveChakra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chakraRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);

  useGSAP(() => {
    if (!chakraRef.current || !containerRef.current) return;

    // 1. Scroll-Linked Rotation and Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Pin for a long time to allow spinning
        pin: true,
        scrub: 1, // Smooth scrub
      }
    });

    // Rotate the chakra heavily as we scroll
    tl.to(chakraRef.current, { rotation: 180, ease: 'none' }, 0);
    
    // Text Reveal
    tl.fromTo(textRef.current, 
      { opacity: 0, x: -50, filter: 'blur(10px)' }, 
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5 }, 
      0
    );

    // Removed Manual Draggable Spin to prevent blocking scroll on mobile.
    // ScrollTrigger alone provides a beautiful spinning interaction.

    // 3. Dynamic Mouse Lighting
    const moveLight = (e: MouseEvent) => {
      if (lightRef.current) {
        gsap.to(lightRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', moveLight);
    return () => window.removeEventListener('mousemove', moveLight);

  }, { scope: containerRef });

  const createDustParticle = () => {
     if (!dustRef.current) return;
     const particle = document.createElement('div');
     particle.className = 'absolute w-1 h-1 bg-[#d4ba88] rounded-full opacity-60 mix-blend-screen filter blur-[1px]';
     
     // Random position around the center right (where the wheel is)
     particle.style.left = `${70 + Math.random() * 20}%`;
     particle.style.top = `${30 + Math.random() * 40}%`;
     
     dustRef.current.appendChild(particle);

     gsap.to(particle, {
       y: "+=200",
       x: `+=${(Math.random() - 0.5) * 100}`,
       opacity: 0,
       rotation: Math.random() * 360,
       duration: 2 + Math.random() * 2,
       ease: "power1.out",
       onComplete: () => particle.remove()
     });
  };

  // Generate continuous dust while scrolling
  useGSAP(() => {
    ScrollTrigger.create({
       trigger: containerRef.current,
       start: "top top",
       end: "+=200%",
       onUpdate: (self) => {
         if (Math.abs(self.getVelocity()) > 50) { // Only drop dust when scrolling fast
           createDustParticle();
         }
       }
    });
  }, { scope: containerRef });

  return (
    <div className="chakra-wrapper w-full">
      <section id="chakra" ref={containerRef} className="relative w-full h-[100dvh] flex items-center justify-start bg-forestDark overflow-hidden z-20 cursor-grab active:cursor-grabbing">
        
        {/* Dynamic Flashlight */}
        <div 
          ref={lightRef} 
          className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 opacity-60 mix-blend-color-dodge transition-opacity duration-1000 hidden md:block"
          style={{
            background: 'radial-gradient(circle at center, rgba(214,142,97,0.4) 0%, transparent 60%)'
          }}
        ></div>

        {/* Massive Bleeding Artifact */}
        <div className="absolute right-[-40%] md:right-[-30%] top-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] z-10 flex items-center justify-center pointer-events-auto">
          <div ref={chakraRef} className="relative w-full h-full cursor-grab active:cursor-grabbing">
            <Image 
              src="/images/chakra-new.png" 
              alt="Ancient Wooden Chakra" 
              fill
              className="object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_50px_rgba(0,0,0,1)] pointer-events-none"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Dust Container */}
        <div ref={dustRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden"></div>

        {/* Typography Overlay */}
        <div ref={textRef} className="relative z-40 w-full md:w-1/2 pl-6 md:pl-24 flex flex-col justify-center items-start pointer-events-none">
          
          <div className="font-galacthic uppercase tracking-[0.5em] text-copper/80 text-xs md:text-sm mb-8 drop-shadow-lg">
            The Ancient Rhythm
          </div>

          <h2 className="font-burowai text-[clamp(40px,10vw,140px)] text-warmIvory leading-[0.8] mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            The Circle <br/>Never Breaks.
          </h2>
          
          <div className="flex flex-col gap-8 font-cormorant text-warmIvory/80 text-lg md:text-xl leading-relaxed max-w-md drop-shadow-xl bg-forestDark/40 p-8 rounded-lg backdrop-blur-md border border-warmIvory/5">
            <p>
              It is not a performance. It is a sacred ritual. It turns, it pulses, holding the ancestral memory of every barefoot step taken upon the earth. 
            </p>
            <p className="text-copper/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
              Scroll to turn the wheel.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
