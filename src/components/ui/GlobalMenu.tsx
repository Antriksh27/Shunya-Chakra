'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

const MENU_LINKS = [
  { id: 'threshold', label: 'The Threshold' },
  { id: 'philosophy', label: 'The Earth' },
  { id: 'chakra', label: 'The Rhythm' },
  { id: 'waitlist', label: 'The Calling' },
  { id: 'experience', label: 'The Ritual' },
  { id: 'closing', label: 'The Invitation' },
];

export function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle click to scroll
  const handleScrollTo = (id: string) => {
    setIsOpen(false); // Close menu first
    // Small delay to allow menu to start closing before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if ((window as any).__lenis_instance && typeof (window as any).__lenis_instance.scrollTo === 'function') {
          (window as any).__lenis_instance.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 400);
  };

  useGSAP(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current?.children;

    if (!overlay || !links) return;

    if (isOpen) {
      // Open Animation
      gsap.to(overlay, { 
        autoAlpha: 1, 
        duration: 0.6, 
        ease: 'power3.out' 
      });
      
      gsap.fromTo(links, 
        { y: 50, autoAlpha: 0, rotateX: -20 },
        { 
          y: 0, 
          autoAlpha: 1, 
          rotateX: 0,
          duration: 0.8, 
          stagger: 0.05, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    } else {
      // Close Animation
      gsap.to(links, { 
        y: -30, 
        autoAlpha: 0, 
        duration: 0.4, 
        stagger: 0.03, 
        ease: 'power2.in' 
      });
      
      gsap.to(overlay, { 
        autoAlpha: 0, 
        duration: 0.6, 
        ease: 'power3.inOut',
        delay: 0.2 
      });
    }
  }, [isOpen]);

  // Subtle continuous rotation for the button logo
  useGSAP(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }
  }, []);

  return (
    <>
      {/* Floating Menu Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center focus:outline-none"
        aria-label="Toggle Menu"
        data-cursor="interactive"
      >
        <Image 
          src="/logo black.png" 
          alt="Menu" 
          fill
          className={`object-contain transition-all duration-700 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] ${isOpen ? 'scale-75 opacity-50' : 'opacity-100 hover:scale-110 hover:brightness-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]'}`}
        />
      </button>

      {/* Full Screen Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-[#1A1F14]/98 backdrop-blur-xl invisible opacity-0 flex flex-col justify-center overflow-y-auto"
      >
        {/* Dedicated Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-24 md:top-8 md:right-32 h-16 md:h-20 flex items-center px-4 text-bone/60 hover:text-copper transition-colors font-cormorant uppercase tracking-[0.3em] text-xs z-50 hidden md:flex"
          data-cursor="interactive"
        >
          Close
        </button>

        {/* Decorative elements behind menu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-ember/5 blur-[120px] pointer-events-none" />

        <ul ref={linksRef} className="flex flex-col items-start justify-center h-full max-w-7xl mx-auto w-full px-8 md:px-24 gap-[clamp(8px,1.5vh,16px)] perspective-1000 relative z-10">
          {MENU_LINKS.map((link, index) => (
            <li key={link.id} className="opacity-0 group">
              <button
                onClick={() => handleScrollTo(link.id)}
                className="font-cormorant text-[clamp(28px,7vh,90px)] uppercase tracking-[0.15em] text-bone/40 hover:text-warmIvory transition-all duration-700 ease-out focus:outline-none text-left flex items-baseline gap-6 md:gap-12 group-hover:translate-x-6"
                data-cursor="interactive"
              >
                <span className="text-[clamp(12px,1.5vh,16px)] font-sans opacity-40 font-light tracking-[0.3em] -translate-y-4 md:-translate-y-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        
        {/* Footer info in menu */}
        <div className="absolute bottom-8 font-cormorant text-boneDim/50 text-xs tracking-widest uppercase">
          Shunya Chakra
        </div>
      </div>
    </>
  );
}
