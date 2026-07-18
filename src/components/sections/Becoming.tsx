'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function Becoming() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !textRef.current) return;

    // Parallax text with kinetic letter spacing
    gsap.to(textRef.current, {
      y: 100, // Move down as we scroll down, creating parallax
      letterSpacing: '0.01em', // Breathing effect
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, [reducedMotion]);

  return (
    <section id="becoming" ref={sectionRef} className="relative min-h-screen py-20 md:py-40 bg-transparent flex items-center justify-center overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-6vw text-center">
        <div ref={textRef} className="max-w-3xl mx-auto space-y-8 font-quicksand text-boneDim text-[clamp(18px,2.4vw,28px)] leading-[1.8]">
          <p>Every contribution becomes part of something greater.</p>
          <p>A space shaped together. A story shared together.</p>
          <p>Every artwork. Every rhythm.</p>
          <p className="text-bone">
            <strong>Every hand that joins the Chakra</strong> adds another layer to its living memory.
          </p>
          <p>Long after the gathering ends, something of it continues to stay with you.</p>
        </div>
      </div>
    </section>
  );
}
