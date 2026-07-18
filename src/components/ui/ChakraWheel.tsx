'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, Draggable, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useAudioFeedback } from '@/lib/useAudioFeedback';

const DEVIS = [
  { name: 'Shailaputri', color: '#E8792E', num: '१' }, 
  { name: 'Brahmacharini', color: '#F2A93B', num: '२' }, 
  { name: 'Chandraghanta', color: '#D4AF37', num: '३' }, 
  { name: 'Kushmanda', color: '#98C87A', num: '४' }, 
  { name: 'Skandamata', color: '#B65C35', num: '५' }, 
  { name: 'Katyayani', color: '#E8792E', num: '६' },
  { name: 'Kalaratri', color: '#F2A93B', num: '७' },
  { name: 'Mahagauri', color: '#D4AF37', num: '८' },
  { name: 'Siddhidatri', color: '#98C87A', num: '९' },
];

export function ChakraWheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const playSound = useAudioFeedback();

  useGSAP(() => {
    if (reducedMotion || !wheelRef.current) return;

    let lastVelocity = 0;
    let lastRotation = 0;
    let momentumTween: gsap.core.Tween | null = null;
    let lastIndex = 0;

    Draggable.create(wheelRef.current, {
      type: 'rotation',
      inertia: false, 
      onPress: () => {
        if (momentumTween) momentumTween.kill();
        gsap.to(glowRef.current, { opacity: 0.8, scale: 1.1, duration: 0.3 });
      },
      onDrag: function() {
        const velocity = this.rotation - lastRotation;
        lastRotation = this.rotation;
        lastVelocity = velocity;
        
        // Intensify glow based on speed
        const speedScale = Math.min(1.3, 1.1 + Math.abs(velocity) * 0.05);
        gsap.to(glowRef.current, { scale: speedScale, duration: 0.1 });
        
        updateIndex(this.rotation);
      },
      onRelease: function() {
        gsap.to(glowRef.current, { opacity: 0.2, scale: 1, duration: 1 });
        
        // Custom friction/momentum decay
        let currentRot = this.rotation;
        let v = lastVelocity;
        
        momentumTween = gsap.to({ val: 0 }, {
          val: 100,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            v *= 0.95; // friction
            currentRot += v;
            gsap.set(wheelRef.current, { rotation: currentRot });
            updateIndex(currentRot);
          }
        });
      }
    });

    function updateIndex(rot: number) {
      let r = rot % 360;
      if (r < 0) r += 360;
      const segmentAngle = 360 / 9;
      const normalizedRot = (360 - r + segmentAngle / 2) % 360;
      const index = Math.floor(normalizedRot / segmentAngle) % 9;
      
      if (index !== lastIndex) {
        lastIndex = index;
        setActiveIndex(index);
        playSound('cta'); // Soft chime on snap
      }
    }

  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="text-center py-20">
        <h3 className="font-galacthic text-3xl text-gold mb-4">THE CHAKRA TURNS</h3>
        <p className="font-quicksand text-boneDim max-w-lg mx-auto">
          Nine nights, nine gateways. The spiral moves inward.
        </p>
      </div>
    );
  }

  const activeDevi = DEVIS[activeIndex];

  return (
    <div className="relative w-full py-8 flex flex-col items-center justify-center">
      
      {/* Fixed Marker (Top) */}
      <div className="absolute top-2 z-20 flex flex-col items-center pointer-events-none">
        <div className="font-devanagari text-2xl text-bone mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300">
          {activeDevi.num}
        </div>
        <div 
          className="font-burowai text-4xl uppercase tracking-widest transition-colors duration-300"
          style={{ color: activeDevi.color }}
        >
          {activeDevi.name}
        </div>
      </div>

      {/* The Draggable Wheel */}
      <div className="relative w-[min(90vw,65vh)] h-[min(90vw,65vh)] max-w-[700px] max-h-[700px] mt-16">
        {/* Glow Ring Behind Wheel */}
        <div 
          ref={glowRef}
          className="absolute inset-0 rounded-full border-[8px] border-ember/20 blur-xl opacity-20 pointer-events-none transition-colors duration-300"
          style={{ borderColor: activeDevi.color }}
        />
        <div 
          ref={wheelRef} 
          className="w-full h-full rounded-full cursor-grab active:cursor-grabbing border-[4px] border-white/50 relative z-10"
          data-cursor="drag"
        >
          {DEVIS.map((devi, i) => {
            const rotation = i * 40; // 360 / 9 = 40 degrees per segment
            const isActive = i === activeIndex;
            
            return (
              <div 
                key={i}
                className="absolute inset-0 flex items-start justify-center origin-center pointer-events-none"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Segment Line */}
                <div className={`w-[2px] h-[50%] transition-colors duration-300 ${isActive ? 'bg-gold' : 'bg-white/30'}`} />
                
                {/* Segment Dot */}
                <div 
                  className={`absolute top-0 w-3 h-3 -translate-y-1/2 rounded-full transition-all duration-300 ${isActive ? 'scale-150' : 'scale-100'}`}
                  style={{ backgroundColor: isActive ? devi.color : '#FFFFFF', opacity: isActive ? 1 : 0.6 }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Center decorative hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-void border border-gold/30 flex items-center justify-center pointer-events-none z-10">
          <div className="w-4 h-4 rounded-full bg-gold animate-pulse" />
        </div>
      </div>
      
      <div className="mt-8 font-quicksand text-white uppercase tracking-[0.2em] text-sm font-medium">
        Drag to turn the Chakra
      </div>
    </div>
  );
}
