'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function RoleTag({ children }: { children: ReactNode }) {
  const tagRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsCoarse(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useGSAP(() => {
    if (reducedMotion || isCoarse) return;

    const tag = tagRef.current;
    if (!tag) return;

    const xTo = gsap.quickTo(tag, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(tag, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = tag.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.2);
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    tag.addEventListener('mousemove', handleMouseMove);
    tag.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tag.removeEventListener('mousemove', handleMouseMove);
      tag.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isCoarse]);

  return (
    <div 
      ref={tagRef} 
      className="inline-block px-6 py-2 m-2 border border-bone/20 text-bone rounded-full cursor-pointer hover:border-gold hover:text-gold transition-colors duration-300 hover:scale-105"
      data-cursor="interactive"
    >
      {children}
    </div>
  );
}
