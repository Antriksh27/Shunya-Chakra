'use client';

import { useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';

const SECTIONS = [
  { id: 'threshold', label: 'The Threshold' },
  { id: 'philosophy', label: 'The Earth' },
  { id: 'chakra', label: 'The Rhythm' },
  { id: 'waitlist', label: 'The Calling' },
  { id: 'experience', label: 'The Ritual' },
  { id: 'closing', label: 'The Invitation' },
];

export function SideNav() {
  const [activeId, setActiveId] = useState<string>('threshold');

  useGSAP(() => {
    SECTIONS.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveId(section.id);
          }
        }
      });
    });
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis_instance && typeof (window as any).__lenis_instance.scrollTo === 'function') {
        (window as any).__lenis_instance.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center mix-blend-difference">
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
            data-cursor="interactive"
          >
            {/* Tooltip */}
            <span className="absolute right-10 whitespace-nowrap font-cormorant text-xs uppercase tracking-widest text-bone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {section.label}
            </span>
            
            {/* Petal/Spiral Glyph */}
            <svg 
              viewBox="0 0 24 24" 
              className={`w-3 h-3 transition-colors duration-500 ${isActive ? 'text-ember' : 'text-bone/40 group-hover:text-bone/80'}`}
              fill="currentColor"
            >
              <path d="M12 2C12 2 15 8 18 10C21 12 21 16 18 18C15 20 12 22 12 22C12 22 9 16 6 14C3 12 3 8 6 6C9 4 12 2 12 2Z" />
            </svg>
          </button>
        );
      })}
    </nav>
  );
}
