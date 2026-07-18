'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Image from 'next/image';

export function Threshold() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  
  // Ember particles count based on screen width
  const particles = Array.from({ length: 16 });

  useGSAP(() => {
    // 3D Tilt for Mark
    const mark = markRef.current;
    if (mark) {
      const xTo = gsap.quickTo(mark, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(mark, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = mark.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // max ±6°
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        xTo(rotateY);
        yTo(rotateX);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      // Only add on desktop
      if (window.matchMedia('(hover: hover)').matches) {
        mark.addEventListener('mousemove', handleMouseMove);
        mark.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    // Cinematic Intro Fade-in
    if (introRef.current) {
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(markRef.current, 
          { opacity: 0, scale: 0.8, y: 20 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        )
        .fromTo(introRef.current.querySelector('h1'), 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 
          '-=1'
        )
        .fromTo(introRef.current.querySelector('h2'), 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 
          '-=0.8'
        )
        .fromTo(taglineRef.current?.querySelectorAll('.word') || [], 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power2.out' }, 
          '-=0.6'
        );
    }
  }, { scope: containerRef });

  return (
    <section id="threshold" ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-transparent -z-20" />

      {/* Main Content */}
      <div ref={introRef} className="flex flex-col items-center z-10 perspective-1000">
        <div ref={markRef} className="transform-style-3d mb-8 relative w-32 h-32 md:w-48 md:h-48">
           <Image 
             src="/logo black.png" 
             alt="Shunya Chakra Mark"
             fill
             className="object-contain opacity-90"
             priority
           />
        </div>

        <h1 className="font-burowai text-[clamp(44px,8vw,96px)] leading-none text-bone tracking-widest uppercase mb-4 text-center">
          Shunya Chakra
        </h1>
        
        <h2 className="font-galacthic text-[clamp(20px,2.4vw,28px)] text-emberBright tracking-[0.3em] uppercase mb-12">
          Garba
        </h2>

        <div ref={taglineRef} className="text-center font-quicksand text-boneDim max-w-md text-[17px] leading-relaxed">
          <div className="mb-1">
            {'Before there was form,'.split(' ').map((word, i) => (
              <span key={`l1-${i}`} className="word inline-block mr-1 opacity-0">{word}</span>
            ))}
          </div>
          <div>
            {'there was Shunya.'.split(' ').map((word, i) => (
              <span key={`l2-${i}`} className="word inline-block mr-1 opacity-0">{word}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Affordance */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <div className="w-2 h-2 rounded-full bg-bone animate-flicker" />
      </div>
    </section>
  );
}
