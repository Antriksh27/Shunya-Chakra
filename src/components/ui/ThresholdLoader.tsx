'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Image from 'next/image';

export function ThresholdLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);

  useGSAP(() => {
    if (reducedMotion) {
      setIsDone(true);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete();
      }
    });

    if (imageRef.current) {
      tl.fromTo(imageRef.current, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power2.out',
      }).to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '+=0.2');
    }
  }, [reducedMotion]);

  // We do not return null here. The parent component (page.tsx) will unmount this component 
  // when isDone becomes true. Returning null while GSAP is involved can cause insertBefore errors.
  // if (isDone || reducedMotion) return null;

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[100] bg-forestDark flex items-center justify-center">
      <div ref={imageRef} className="relative w-20 h-20 opacity-0">
        <Image 
          src="/Logo.png" 
          alt="Shunya Chakra" 
          fill 
          className="object-contain opacity-80" 
          priority
        />
      </div>
    </div>
  );
}
