'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'threshold', label: 'Threshold' },
  { id: 'origin', label: 'The Origin' },
  { id: 'awakening', label: 'The Awakening' },
  { id: 'nine-nights', label: 'The Chakra' },
  { id: 'pillars', label: 'The Pillars' },
  { id: 'seekers', label: 'The Seekers' },
  { id: 'becoming', label: 'The Becoming' },
  { id: 'invitation', label: 'The Invitation' },
];

export function SideNav() {
  const [activeId, setActiveId] = useState<string>('threshold');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
            <span className="absolute right-10 whitespace-nowrap font-quicksand text-xs uppercase tracking-widest text-bone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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
