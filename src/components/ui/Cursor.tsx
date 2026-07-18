'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isCoarse, setIsCoarse] = useState(true);

  const [isHovering, setIsHovering] = useState<'none' | 'interactive' | 'cta' | 'drag'>('none');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsCoarse(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useGSAP(() => {
    if (isCoarse) return;

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3.out' });
    
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="cta"]')) {
        setIsHovering('cta');
      } else if (target.closest('[data-cursor="drag"]')) {
        setIsHovering('drag');
      } else if (target.closest('[data-cursor="interactive"]')) {
        setIsHovering('interactive');
      } else {
        setIsHovering('none');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`fixed top-0 left-0 w-2 h-2 bg-ember rounded-full pointer-events-none mix-blend-multiply z-[100] transition-transform duration-200 
          ${isHovering === 'interactive' ? 'scale-150' : ''} 
          ${isHovering === 'cta' ? 'scale-[2.5] bg-gold' : ''}
          ${isHovering === 'drag' ? 'scale-[0.5] bg-emberBright opacity-70' : ''}
        `}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={ringRef} 
        className={`fixed top-0 left-0 w-8 h-8 border border-ember/50 rounded-full pointer-events-none mix-blend-multiply z-[99] transition-all duration-300
          ${isHovering === 'interactive' ? 'scale-150 border-ember' : ''}
          ${isHovering === 'cta' ? 'scale-[3] border-gold border-dashed' : ''}
          ${isHovering === 'drag' ? 'scale-50 border-transparent opacity-0' : ''}
        `}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Trailing particle for drag */}
      {isHovering === 'drag' && (
        <div 
          className="fixed top-0 left-0 w-1 h-1 bg-ember rounded-full pointer-events-none z-[98] animate-ping"
          style={{ 
            left: gsap.getProperty(dotRef.current, "x") as number, 
            top: gsap.getProperty(dotRef.current, "y") as number,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </>
  );
}
