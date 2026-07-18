'use client';

import { ReactNode, useState } from 'react';

export function FlipCard({ front, back, className = '' }: { front: ReactNode, back: ReactNode, className?: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`group perspective-1000 w-56 h-64 flex-shrink-0 cursor-pointer ${className}`} 
      data-cursor="interactive"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d md:group-hover:rotate-y-180 ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-black/40 backdrop-blur-md border border-gold/20 flex flex-col items-center justify-center p-6 rounded-lg text-center shadow-[inset_0_0_40px_rgba(212,180,131,0.08)] overflow-hidden transition-colors duration-500 group-hover:border-gold/40 group-hover:bg-black/50">
          {/* Subtle glowing center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,180,131,0.15)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10">{front}</div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black/60 backdrop-blur-xl border border-gold/40 flex flex-col items-center justify-center p-6 rounded-lg text-center shadow-[0_0_30px_rgba(212,180,131,0.15)] overflow-hidden">
          {/* Top and Bottom glowing edges */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
          <div className="relative z-10">{back}</div>
        </div>

      </div>
    </div>
  );
}
