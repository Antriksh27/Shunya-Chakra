'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { MagneticButton } from '../ui/MagneticButton';

export function Threshold() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // 0. INTRO ANIMATION
    const introTl = gsap.timeline({ paused: true });
    
    // Set initial hidden states
    gsap.set(bgRef.current, { opacity: 0, scale: 1.05 });
    gsap.set(fgRef.current, { opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, filter: 'blur(10px)', y: 20 });
    gsap.set(btnRef.current, { opacity: 0, pointerEvents: 'none' });

    // Fade everything in smoothly
    introTl.to(bgRef.current, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out", clearProps: "opacity,scale" }, 0)
           .to(fgRef.current, { opacity: 1, duration: 2.5, ease: "power2.out", clearProps: "opacity" }, 0.5)
           .to(textRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: "power3.out", clearProps: "opacity,filter,transform" }, 1)
           .to(btnRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut", clearProps: "opacity,pointerEvents" }, 1.5);

    const handleEnter = () => {
      introTl.play();
    };

    window.addEventListener('app-entered', handleEnter);

    // 1. PIN THE HERO SECTION
    // Pin it for a massive distance so it stays locked in the background 
    // while Waitlist slides over it and pins itself.
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "+=800", 
      pin: containerRef.current,
      pinSpacing: false,
    });

    // 2. SCROLL ANIMATION TIMELINE
    // This perfectly finishes at 300px of scroll.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=300", 
        scrub: 2.5, 
        // No pinning here!
      }
    });

    // Foreground scales up massively to pass "through" the camera, 
    // originating from a natural path vanishing point
    tl.to(fgRef.current, { 
      scale: 8, 
      opacity: 0, 
      y: '10%',
      transformOrigin: '50% 70%', // Adjust to the center-bottom of the path
      duration: 1,
      ease: 'power2.inOut'
    }, 0);
    
    // Text comes forward slightly then dissolves much earlier
    tl.to(textRef.current, { scale: 2, opacity: 0, filter: 'blur(30px)', duration: 0.6 }, 0);
    
    // Button fades out quickly
    if (btnRef.current) {
      tl.to(btnRef.current, { opacity: 0, y: 20, duration: 0.4 }, 0);
    }
    
    // Background pulls forward to simulate deep movement
    tl.to(bgRef.current, { 
      scale: 1.3, 
      y: '-5%',
      duration: 1,
      ease: 'power1.inOut'
    }, 0);

    // Continuous Environmental Motion (Breathing / Floating)
    gsap.to(bgRef.current, {
      y: '-2%',
      rotationZ: 0.5,
      duration: 15,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Create drifting particles
    if (particlesRef.current) {
       const particles = particlesRef.current.children;
       gsap.to(particles, {
         y: "-=100",
         x: "random(-50, 50)",
         opacity: "random(0.2, 0.8)",
         duration: "random(5, 10)",
         ease: "sine.inOut",
         stagger: {
           amount: 5,
           each: 0.5,
           repeat: -1,
           yoyo: true
         }
       });
    }

  }, { scope: containerRef });

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} className="threshold-wrapper w-full relative z-10">
      <section id="threshold" ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-forestDark">
        
        {/* Deep Background Layer */}
        <div ref={bgRef} className="absolute inset-0 -z-30 origin-center">
          <Image 
            src="/images/layer-bg.png"
            alt="Ancient Forest Depth"
            fill
            priority
            className="object-cover opacity-80"
          />
          {/* Environmental Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,12,10,0.9)_100%)]"></div>
        </div>

        {/* Floating Particles (Embers/Pollen) */}
        <div ref={particlesRef} className="absolute inset-0 -z-20 pointer-events-none opacity-50 mix-blend-screen">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-[#d4ba88] blur-[1px]"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>

        {/* Typography / Midground */}
        <div ref={textRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-24 h-16 md:w-40 md:h-24 lg:w-64 lg:h-40 opacity-80 relative mb-4 pointer-events-none">
              <Image 
                src="/logo black.png" 
                alt="Shunya Chakra Logo"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(212,186,136,0.3)]"
              />
            </div>
            <div className="font-burowai text-[clamp(32px,8vw,110px)] text-warmIvory opacity-90 leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] pointer-events-none">
              SHUNYA CHAKRA
            </div>
            <div className="font-galacthic uppercase tracking-[0.8em] md:tracking-[1em] text-[#d4ba88] opacity-80 text-sm md:text-lg drop-shadow-2xl ml-[0.8em] md:ml-[1em] mb-12 pointer-events-none">
              Garba
            </div>
            
            <button 
              ref={btnRef}
              onClick={scrollToWaitlist}
              className="text-[#d4ba88] font-cormorant uppercase tracking-[0.4em] text-[11px] hover:text-warmIvory transition-colors duration-300 opacity-80 hover:opacity-100 cursor-pointer"
            >
              Answer the Call
            </button>
          </div>
        </div>

        {/* Foreground Silhouette Layer (Framing and Parallax Pull) */}
        <div ref={fgRef} className="absolute inset-0 z-30 pointer-events-none origin-center mix-blend-multiply opacity-90">
          <Image 
            src="/images/layer-fg.png"
            alt="Foreground Branches"
            fill
            priority
            className="object-cover"
          />
        </div>

      </section>
    </div>
  );
}
