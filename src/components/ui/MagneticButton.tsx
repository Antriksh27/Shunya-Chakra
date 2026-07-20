'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MagneticButton({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
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

    const btn = buttonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Strong magnetic pull limits (0.6 multiplier)
      xTo(x * 0.6);
      yTo(y * 0.6);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isCoarse]);

  return (
    <button 
      ref={buttonRef} 
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-12 py-8 font-cormorant text-bone font-medium bg-black/10 backdrop-blur-sm transition-all duration-[1500ms] uppercase tracking-[0.2em] border border-bone/40 hover:border-gold hover:text-gold hover:bg-gold/5 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(212,180,131,0.2)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] hover:rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
        className
      )}
      data-cursor="cta"
    >
      {children}
    </button>
  );
}
