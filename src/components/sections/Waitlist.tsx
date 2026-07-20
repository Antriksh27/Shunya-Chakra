'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

const STEPS = [
  { id: 'name', label: 'Who approaches the circle?', type: 'text', placeholder: 'Your Name' },
  { id: 'phone', label: 'What is your phone number?', type: 'tel', placeholder: 'Your Phone' },
  { id: 'email', label: 'What is your email address? (Optional)', type: 'email', placeholder: 'Your Email' }
];

export function Waitlist() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Focus input automatically, but ONLY for step 1 and 2 to prevent 
  // the browser from auto-scrolling to this section on initial page load.
  useEffect(() => {
    if (inputRef.current && step > 0 && step < STEPS.length) {
      // Small timeout to allow transition to finish
      // preventScroll: true stops the browser from fighting the GSAP pin position
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 800);
    }
  }, [step]);

  useGSAP(() => {
    // Pin the section for one full scroll duration so the user stops here.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=120%`, // Decreased scroll distance to move to next section
      pin: true,
      anticipatePin: 1
    });

    // Deep Background Drift
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.1,
        rotationZ: 0.5,
        duration: 25,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, { scope: containerRef }); // NO dependencies, runs exactly once on mount

  useGSAP(() => {
    // Ambient light breathing updates based on current step
    if (ambientLightRef.current) {
      gsap.to(ambientLightRef.current, {
        opacity: 0.6 + (step * 0.1), // Brightens with each step
        scale: 1 + (step * 0.1),
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, { scope: containerRef, dependencies: [step] });

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Animate out current
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(15px)',
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => {
          setStep(s => s + 1);
          // Animate in next
          gsap.fromTo(formRef.current, 
            { opacity: 0, y: 30, filter: 'blur(15px)' },
            { 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)', 
              duration: 1.2, 
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    }
  };

  return (
    <div className="waitlist-wrapper w-full relative z-20">
      <section id="waitlist" ref={containerRef} className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-forestDark overflow-hidden">
        
        {/* Deep Stone Forest Background */}
        <div ref={bgRef} className="absolute inset-0 -z-30 origin-center mix-blend-luminosity opacity-40">
          <Image 
            src="/images/waitlist-bg.png"
            alt="Ancient Ritual Stone"
            fill
            priority
            className="object-cover"
          />
          {/* Dark Vignette to keep focus on the center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,12,10,0.95)_100%)]"></div>
        </div>

        {/* Ambient Ritual Light */}
        <div 
          ref={ambientLightRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 transition-all duration-1000 -z-20"
          style={{
            background: `radial-gradient(circle at center, rgba(212,186,136,${0.1 + (step * 0.05)}) 0%, transparent 60%)`
          }}
        ></div>

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center px-4">
          
          <div ref={formRef} className="w-full flex flex-col items-center">
            {step < STEPS.length ? (
              <form 
                onSubmit={handleNext}
                className="w-full flex flex-col items-center"
              >
                <label 
                  htmlFor={STEPS[step].id} 
                  className="font-galacthic uppercase tracking-[0.4em] text-copper opacity-80 text-sm md:text-base mb-12 text-center"
                >
                  {STEPS[step].label}
                </label>
                
                <input 
                  ref={inputRef}
                  type={STEPS[step].type} 
                  id={STEPS[step].id}
                  required={step !== 2}
                  value={formData[STEPS[step].id as keyof typeof formData]}
                  onChange={(e) => setFormData({...formData, [STEPS[step].id]: e.target.value})}
                  placeholder={STEPS[step].placeholder}
                  className="w-full max-w-md bg-transparent border-b border-warmIvory/20 px-0 py-4 text-warmIvory font-burowai text-2xl md:text-4xl text-center outline-none transition-colors focus:border-copper/80 placeholder:text-warmIvory/10 placeholder:font-cormorant placeholder:text-lg placeholder:uppercase placeholder:tracking-widest"
                  autoComplete="off"
                />

                <div className="mt-16 opacity-40 font-cormorant text-[10px] uppercase tracking-[0.3em] text-warmIvory text-center">
                  Press Enter to continue
                </div>
                
                <button type="submit" className="hidden">Submit</button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-full border border-copper/30 mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(212,186,136,0.2)]">
                   <div className="w-2 h-2 rounded-full bg-copper shadow-[0_0_10px_#d4ba88]"></div>
                 </div>
                 <h2 className="font-burowai text-3xl md:text-5xl text-warmIvory mb-6 opacity-90">
                   The sacred circle acknowledges you.
                 </h2>
                 <p className="font-galacthic text-copper uppercase tracking-[0.4em] text-xs opacity-70 mb-16">
                   Your place in the ritual is being prepared.
                 </p>
                 
                 <div className="flex flex-col items-center opacity-60" style={{ animation: 'smoothFloat 3s ease-in-out infinite' }}>
                   <style>{`
                     @keyframes smoothFloat {
                       0%, 100% { opacity: 0.3; transform: translateY(0px); }
                       50% { opacity: 0.8; transform: translateY(8px); }
                     }
                   `}</style>
                   <span className="font-cormorant uppercase tracking-[0.3em] text-[10px] text-warmIvory mb-2">
                     Scroll to continue
                   </span>
                   <div className="w-[1px] h-8 bg-gradient-to-b from-warmIvory to-transparent"></div>
                 </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
