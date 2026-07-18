'use client';

import { useRef, ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: number;
}

export function RevealOnScroll({ children, delay = 0, className = '', stagger = 0 }: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(containerRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(containerRef.current, 
      { autoAlpha: 0, y: 30, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
    
    // If stagger is provided, apply it to the direct children
    if (stagger > 0 && containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { autoAlpha: 0, y: 20, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: delay + 0.2, // Start slightly after parent
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
