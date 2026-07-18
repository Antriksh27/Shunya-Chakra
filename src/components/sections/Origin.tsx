'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

export function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {

    // Stanza-by-stanza reveal
    const stanzas = gsap.utils.toArray('.stanza') as HTMLElement[];
    stanzas.forEach(stanza => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stanza,
          start: 'top 85%',
          end: 'bottom top',
          scrub: true,
        }
      });

      tl.fromTo(stanza, 
        { autoAlpha: 0, y: 50, scale: 0.98, letterSpacing: '0em' }, 
        { 
          autoAlpha: 1, 
          y: 0,
          scale: 1,
          letterSpacing: '0.01em',
          duration: 1,
          ease: 'power2.out',
        }
      )
      .to(stanza, {
        y: -40,
        duration: 1,
        ease: 'none'
      });

      // Color shift for bolded phrases
      const bolds = stanza.querySelectorAll('.shift-word');
      if (bolds.length > 0) {
        gsap.to(bolds, {
          color: 'var(--color-emberBright)',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stanza,
            start: 'top 75%',
          }
        });
      }
    });

  }, { scope: sectionRef });

  return (
    <section id="origin" ref={sectionRef} className="relative min-h-screen py-32 flex items-center justify-center bg-transparent overflow-hidden">

      <div className="max-w-2xl mx-auto px-6vw text-center space-y-16 font-quicksand text-boneDim text-[clamp(22px,3vw,34px)] leading-[1.8]">
        
        <div className="stanza">
          <h2 className="font-burowai text-[clamp(30px,4.4vw,54px)] text-bone uppercase mb-8 tracking-wide glow-text">
            Shunya, Before Creation
          </h2>
          <p>
            Before the first <strong className="shift-word text-bone font-normal transition-colors duration-1000">sound</strong>, before the first <strong className="shift-word text-bone font-normal transition-colors duration-1000">light</strong>, there was Shunya.
          </p>
          <p>Not emptiness, but stillness.</p>
          <p>A quiet space where every possibility waited.</p>
        </div>

        <div className="stanza">
          <p>
            <strong className="shift-word text-bone font-normal transition-colors duration-1000">Then came the first vibration.</strong>
          </p>
          <p>The first breath. The first rhythm.</p>
          <p>A gentle pulse that awakened creation.</p>
        </div>

        <div className="stanza">
          <p>Every beginning starts here.</p>
          <p>Every circle returns here.</p>
        </div>

      </div>
    </section>
  );
}
