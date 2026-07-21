'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import Image from 'next/image';

export function ScrollSpiral() {
  const spiralRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(spiralRef.current, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.5,
      },
    });
  });

  return (
    <div className="fixed top-6 right-6 z-50">
      <div ref={spiralRef} className="w-10 h-10 flex items-center justify-center relative">
        <Image 
          src="/Logo.png" 
          alt="Scroll Progress"
          fill
          className="object-contain opacity-90"
          style={{ filter: 'hue-rotate(240deg) brightness(0.7) contrast(1.2)' }}
        />
      </div>
    </div>
  );
}
