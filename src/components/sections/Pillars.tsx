'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { TiltCard } from '../ui/TiltCard';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { useReducedMotion } from '@/lib/useReducedMotion';

const PILLARS = [
  {
    title: 'Sacred Architecture',
    subtitle: 'Conscious Space & Form',
    text: 'Nothing here is created by chance. Every path. Every structure. Every circle. Shaped with intention. A place that invites stillness, presence, and belonging.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 text-bone mb-8 stroke-draw" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 90 L50 20 L90 90" strokeLinejoin="miter" />
        <path d="M30 55 L70 55" />
      </svg>
    )
  },
  {
    title: 'Music, Art & Ritual',
    subtitle: 'Ceremony as Living Art',
    text: 'Music is more than vibrations. Art is more than expression. Every rhythm, every creation, every ritual becomes part of a shared remembrance. A moment to slow down. To listen. To return.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 text-bone mb-8 stroke-draw" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50 90 C 20 60, 40 20, 50 10 C 60 20, 80 60, 50 90 Z" />
        <path d="M50 90 C 40 70, 45 45, 50 40 C 55 45, 60 70, 50 90 Z" />
      </svg>
    )
  },
  {
    title: 'Nature & Earth Spirit',
    subtitle: 'Rooted in Earth & Sky',
    text: 'The earth quietly shapes every moment of the gathering. Under open skies. Among ancient trees. Beside fire and earth. We remember what has always been waiting for us.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 text-bone mb-8 stroke-draw" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50 90 L50 20" />
        <path d="M50 60 Q 30 40 10 50" />
        <path d="M50 40 Q 70 20 90 30" />
      </svg>
    )
  }
];

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0], index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <RevealOnScroll className="h-full">
      <TiltCard className="h-full">
        <div className="flex flex-col h-full">
          {pillar.icon}
          
          <h3 className="font-burowai text-2xl text-bone uppercase tracking-wider mb-2">
            {pillar.title}
          </h3>
          <h4 className="font-galacthic text-[17px] text-ember italic mb-6">
            {pillar.subtitle}
          </h4>
          
          <div className={`font-quicksand text-boneDim text-[15px] leading-relaxed transition-all duration-300 ${expanded ? '' : 'line-clamp-3 md:line-clamp-none'}`}>
            {pillar.text}
          </div>
          
          {/* Mobile read more toggle */}
          <button 
            className="md:hidden mt-4 flex items-center text-ember text-xs uppercase tracking-widest font-bold"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read Less' : 'Read More'}
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>
      </TiltCard>
    </RevealOnScroll>
  );
}

export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    // Draw SVG icons
    const svgs = gsap.utils.toArray('.stroke-draw path') as SVGPathElement[];
    
    // Prepare paths
    svgs.forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    // Animate on scroll
    ScrollTrigger.batch('.stroke-draw', {
      onEnter: (elements) => {
        elements.forEach((svg, i) => {
          gsap.to(svg.querySelectorAll('path'), {
            strokeDashoffset: 0,
            duration: 2.0,
            ease: 'power2.inOut',
            delay: i * 0.2
          });
        });
      },
      once: true
    });
  }, [reducedMotion]);

  return (
    <section id="pillars" ref={sectionRef} className="relative min-h-screen py-20 md:py-32 bg-transparent overflow-hidden">
      
      {/* Background imagery placeholder - Lazy loaded */}
      <div className="absolute inset-0 bg-transparent -z-20" />
      <div className="absolute inset-0 border-4 border-dashed border-moss opacity-20 -z-10 hidden" />
      {/* TODO: Photography: forest canopy — TBD (Replace border placeholder) */}

      <div className="max-w-[1180px] mx-auto px-6vw">
        <RevealOnScroll stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-stretch">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
