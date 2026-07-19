'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { FlipCard } from '../ui/FlipCard';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { ChakraWheel } from '../ui/ChakraWheel';

const CARDS = [
  { devanagari: '॥१॥', devi: 'Shailputri', text: 'The daughter of the mountain, symbolizing strength and nature.' },
  { devanagari: '॥२॥', devi: 'Brahmacharini', text: 'The seeker of penance, representing devotion, wisdom, and peace.' },
  { devanagari: '॥३॥', devi: 'Chandraghanta', text: 'The destroyer of demons, known for her courage and bravery.' },
  { devanagari: '॥४॥', devi: 'Kushmanda', text: 'The creator of the cosmos, signifying creativity and cosmic energy.' },
  { devanagari: '॥५॥', devi: 'Skandamata', text: 'The mother of Lord Skanda (Kartikeya), embodying compassion and motherhood.' },
  { devanagari: '॥६॥', devi: 'Katyayani', text: 'The warrior goddess, revered for determination and courage.' },
  { devanagari: '॥७॥', devi: 'Kalaratri', text: 'The fierce protector, known for her fearlessness and destruction of darkness.' },
  { devanagari: '॥८॥', devi: 'Mahagauri', text: 'The symbol of purity and beauty, representing forgiveness and serenity.' },
  { devanagari: '॥९॥', devi: 'Siddhidatri', text: 'The bestower of spiritual powers, symbolizing fulfillment and ultimate wisdom.' },
];

export function NineNights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    // Pinning handled via CSS sticky to prevent Draggable matrix conflicts
  }, [reducedMotion]);

  return (
    <section id="nine-nights" className="w-full relative py-4">
      {/* Sticky Chakra Wheel Container */}
      <div className="relative w-full h-[300vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
          <RevealOnScroll className="w-full shrink-0">
            <ChakraWheel />
          </RevealOnScroll>
        </div>
      </div>

      {/* Grid of Cards (scrolls up normally after wheel is unpinned) */}
      <div className="relative z-10 pt-24 pb-16">
        <RevealOnScroll stagger={0.05} className="w-full max-w-[1300px] mx-auto flex flex-wrap justify-center gap-6 px-4 md:px-6vw">
        {CARDS.map((card, i) => (
          <FlipCard 
            key={i}
            front={
              <span className="font-devanagari text-6xl text-gold/80 glow-text drop-shadow-[0_0_15px_rgba(212,180,131,0.5)] transition-transform duration-500 group-hover:scale-110">
                {card.devanagari}
              </span>
            }
            back={
              <>
                <h3 className="font-galacthic text-2xl text-bone mb-4 uppercase tracking-wider">{card.devi}</h3>
                <p className="font-quicksand text-sm text-boneDim leading-relaxed">{card.text}</p>
              </>
            }
          />
        ))}
        </RevealOnScroll>
      </div>

      {/* Flag inline comment: this section is a design addition layered onto the client's original deck — confirm content sign-off before shipping copy live. */}
    </section>
  );
}
