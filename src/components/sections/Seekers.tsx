'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { RoleTag } from '../ui/RoleTag';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useAudioFeedback } from '@/lib/useAudioFeedback';

const ROLES = [
  'Architects', 'Artists', 'Sculptors', 'Musicians', 'Designers', 'Storytellers'
];

export function Seekers() {
  const emblemRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const rotationTween = useRef<gsap.core.Tween | null>(null);
  const playSound = useAudioFeedback();

  useGSAP(() => {
    if (reducedMotion || !spiralRef.current) return;

    // Idle rotation (~40s)
    rotationTween.current = gsap.to(spiralRef.current, {
      rotation: 360,
      duration: 40,
      ease: 'none',
      repeat: -1
    });

  }, [reducedMotion]);

  const handleEmblemClick = () => {
    playSound('click');
    if (reducedMotion || !spiralRef.current || !rotationTween.current) return;
    
    // Accelerate to ~4s then back to idle
    const currentRot = gsap.getProperty(spiralRef.current, 'rotation') as number;
    
    // Kill existing idle tween
    rotationTween.current.kill();
    
    // Quick spin
    gsap.to(spiralRef.current, {
      rotation: currentRot + 360,
      duration: 4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Resume idle
        rotationTween.current = gsap.to(spiralRef.current, {
          rotation: "+=360",
          duration: 40,
          ease: 'none',
          repeat: -1
        });
      }
    });
  };

  return (
    <section id="seekers" className="relative min-h-screen py-20 md:py-32 bg-transparent flex flex-col items-center justify-center text-center">
      
      <div className="max-w-[1180px] mx-auto px-6vw flex flex-col items-center">
        
        {/* Emblem */}
        <RevealOnScroll>
          <div 
            ref={emblemRef}
            onClick={handleEmblemClick}
            className="w-32 h-32 md:w-48 md:h-48 mb-12 md:mb-16 rounded-full bg-[radial-gradient(circle_at_center,var(--color-ember)_0%,var(--color-void)_100%)] flex items-center justify-center cursor-pointer border border-bone/5 hover:border-gold/30 transition-colors duration-500"
            data-cursor="interactive"
            aria-label="Stone Spiral Emblem"
          >
            <svg 
              ref={spiralRef}
              viewBox="0 0 100 100" 
              className="w-24 h-24 text-bone opacity-80" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            >
              {/* Refined carved spiral */}
              <path d="M50 50 
                       C 55 50, 55 45, 50 45 
                       C 40 45, 40 55, 50 55 
                       C 65 55, 65 35, 50 35 
                       C 30 35, 30 65, 50 65 
                       C 75 65, 75 25, 50 25 
                       C 20 25, 20 75, 50 75 
                       C 85 75, 85 15, 50 15
                       C 10 15, 10 85, 50 85
                       C 95 85, 95 5, 50 5" 
              />
            </svg>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="max-w-3xl mb-12">
          <h2 className="font-galacthic text-[clamp(18px,3vw,34px)] text-boneDim leading-[1.6]">
            We&apos;re looking for those who create with intention.
          </h2>
        </RevealOnScroll>

        {/* Roles Cluster */}
        <RevealOnScroll delay={0.4} className="mb-16 max-w-4xl flex flex-wrap justify-center">
          {ROLES.map((role) => (
            <RoleTag key={role}>{role}</RoleTag>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={0.6} className="max-w-2xl mb-16">
          <p className="font-quicksand text-boneDim text-[17px] leading-relaxed mb-4">
            People who believe that spaces, sounds, and stories can bring spirits together.
          </p>
          <p className="font-quicksand text-boneDim text-[17px] leading-relaxed">
            If this feels familiar, perhaps you&apos;ve always been part of the circle.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <MagneticButton onClick={() => window.alert('Route to collaborator application form')}>
            Answer the Call
          </MagneticButton>
        </RevealOnScroll>

      </div>
    </section>
  );
}
