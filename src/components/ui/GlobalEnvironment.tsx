'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

export function GlobalEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const bgForestRef = useRef<HTMLDivElement>(null);
  const bgFirelightRef = useRef<HTMLDivElement>(null);
  const bgStoneRef = useRef<HTMLDivElement>(null);
  
  const foregroundDustRef = useRef<HTMLDivElement>(null);
  const outOfFocusLeavesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Background Camera Push (Scale) over the entire page length
    gsap.to([bgForestRef.current, bgFirelightRef.current, bgStoneRef.current], {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // 2. Foreground Parallax (Moves faster than scroll)
    gsap.to(outOfFocusLeavesRef.current, {
      y: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // 3. Environmental Crossfades
    
    // Chakra -> Firelight / Warmth
    ScrollTrigger.create({
      trigger: '#chakra',
      start: 'top center',
      end: 'bottom top',
      animation: gsap.to(bgFirelightRef.current, { opacity: 1, duration: 2 }),
      toggleActions: 'play reverse play reverse'
    });

    // Experience -> Stone/Darkness
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top center',
      end: 'bottom top',
      animation: gsap.to(bgStoneRef.current, { opacity: 1, duration: 2 }),
      toggleActions: 'play reverse play reverse'
    });

    // Ambient floating dust particles
    const dustParticles = gsap.utils.toArray('.dust-particle');
    dustParticles.forEach((particle: any) => {
      gsap.to(particle, {
        y: `-=${Math.random() * 300 + 100}`,
        x: `+=${(Math.random() - 0.5) * 200}`,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 15 + 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * -10,
      });
    });

  }, []);

  return (
    <>
      {/* ================= BACKGROUND PLANE (Z: -50) ================= */}
      <div ref={containerRef} className="fixed inset-0 z-[-50] pointer-events-none overflow-hidden">
        
        {/* Layer 1: Dark Forest Base */}
        <div ref={bgForestRef} className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] origin-center">
          <Image 
            src="/images/hero-bg.png"
            alt="Forest Environment"
            fill
            className="object-cover mix-blend-luminosity brightness-[0.4] opacity-80"
            priority
          />
        </div>
        
        {/* Layer 2: Firelight Warmth */}
        <div ref={bgFirelightRef} className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] origin-center opacity-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(182,93,70,0.15)_0%,rgba(20,25,20,0.9)_80%)]">
        </div>
        
        {/* Layer 3: Stone / Darkness */}
        <div ref={bgStoneRef} className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] origin-center opacity-0 bg-[#0a0a0a]">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-screen"></div>
        </div>

      </div>


      {/* ================= FOREGROUND PLANE (Z: 50) ================= */}
      {/* These elements float ABOVE the content to create physical depth */}
      <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden mix-blend-screen">
        
        {/* Deep Out-of-Focus Foreground Leaves / Shadow */}
        <div ref={outOfFocusLeavesRef} className="absolute -inset-[20%] w-[140%] h-[140%] opacity-20 filter blur-[8px] bg-[radial-gradient(circle_at_10%_20%,rgba(0,0,0,0.8)_0%,transparent_30%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.8)_0%,transparent_30%)]"></div>

        {/* Global Floating Dust (Pollen/Embers) */}
        <div ref={foregroundDustRef} className="absolute inset-0">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i} 
              className="dust-particle absolute w-[2px] h-[2px] rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0,
                backgroundColor: Math.random() > 0.8 ? '#D68E61' : '#EAE3D2', // Mix of embers and dust
                boxShadow: Math.random() > 0.8 ? '0 0 10px rgba(214,142,97,0.8)' : 'none'
              }}
            />
          ))}
        </div>

      </div>
    </>
  );
}
