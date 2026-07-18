'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function TiltCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    const xTo = gsap.quickTo(content, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(content, 'rotationX', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      xTo(rotateY);
      yTo(rotateX);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isCoarse]);

  return (
    <div ref={cardRef} className={`perspective-1000 ${className}`}>
      <div 
        ref={contentRef} 
        className="relative w-full h-full group transition-all duration-500 p-8 transform-style-3d"
      >
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
