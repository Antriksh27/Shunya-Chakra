'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

export function AboutExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const chapters = [
    {
      title: "The Ground",
      description: "Carved spaces that hold the energy of thousands. We build an altar of earth, ready to receive the devotion of the nine nights.",
      image: "/images/exp_arch.png",
      mask: "polygon(0% 5%, 100% 0%, 100% 100%, 0% 100%)"
    },
    {
      title: "The Garba",
      description: "Rhythm designed to awaken ancestral memory. Around the fire, the divine feminine is honored through the timeless movement of the circle.",
      image: "/images/exp_ritual.png",
      mask: "polygon(0% 10%, 100% 5%, 100% 100%, 0% 100%)"
    },
    {
      title: "The Fire",
      description: "Rooted deeply in tribal heritage. From the heat of the midnight lamps to the unyielding beat of the drums under a moonlit sky.",
      image: "/images/exp_nature.png",
      mask: "polygon(0% 5%, 100% 12%, 100% 100%, 0% 100%)"
    }
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.exp-card') as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 3 screens of scrolling for 3 cards
        pin: true,
        scrub: 1,
      }
    });

    // Animate cards stacking
    cards.forEach((card, i) => {
      if (i > 0) { // Card 0 stays at top
        tl.fromTo(card,
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 }
        );
      }
      
      // Slight scale effect on the image inside the card as it slides up
      const img = card.querySelector('.exp-img');
      if (img && i > 0) {
         tl.fromTo(img, 
            { scale: 1.2 }, 
            { scale: 1, ease: "none", duration: 1 }, 
            "<" // sync with card slide
         );
      }
    });

  }, { scope: containerRef });

  return (
    <div className="experience-wrapper w-full">
      <section id="experience" ref={containerRef} className="relative w-full h-[100dvh] bg-[#e6ddcf] overflow-hidden z-30">
        
        {/* SVG Filter for Rough/Torn Edges applied to the sliding cards */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <filter id="rough-edge-top">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* The Stack */}
        <div className="relative w-full h-full">
          {chapters.map((chapter, index) => (
            <div 
              key={chapter.title} 
              className={`exp-card absolute inset-0 w-full h-full flex flex-col items-center justify-center ${index === 0 ? 'z-10' : index === 1 ? 'z-20' : 'z-30'}`}
            >
              
              {/* Background Image of the Card */}
              <div 
                className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#e6ddcf]"
                style={{
                   // Apply rough edge filter only to the background so text is not distorted
                   filter: index > 0 ? 'url(#rough-edge-top)' : 'none',
                   clipPath: index > 0 ? chapter.mask : 'none'
                }}
              >
                 <div className="exp-img relative w-full h-full">
                   <Image 
                     src={chapter.image}
                     alt={chapter.title}
                     fill
                     className="object-cover mix-blend-luminosity brightness-95 opacity-70"
                     priority={index === 0}
                   />
                   {/* Earthy Wash */}
                   <div className="absolute inset-0 bg-gradient-to-b from-[#e6ddcf]/80 via-transparent to-[#e6ddcf]/80 mix-blend-overlay"></div>
                 </div>
              </div>

              {/* Massive Gradient Overlay to block out noise behind text */}
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#e6ddcf] via-[#e6ddcf]/80 to-transparent h-[60%] mt-auto pointer-events-none"></div>

              {/* Title Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                 

                 {/* Massive Bleeding Typography */}
                 <h2 className="font-burowai text-[clamp(50px,15vw,350px)] text-charcoal leading-[0.75] mix-blend-color-burn opacity-90 drop-shadow-sm text-center whitespace-nowrap mb-12 transform scale-x-[1.1]">
                   {chapter.title}
                 </h2>

                 <p className="font-cormorant text-charcoal text-xl md:text-3xl leading-[1.8] max-w-3xl text-center font-bold drop-shadow-sm pointer-events-auto px-4">
                   {chapter.description}
                 </p>
                 
              </div>

            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
