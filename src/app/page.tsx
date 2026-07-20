'use client';

import { useState, useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { ThresholdLoader } from '@/components/ui/ThresholdLoader';
import { Threshold } from '@/components/sections/Threshold';
import { Waitlist } from '@/components/sections/Waitlist';
import { InteractiveChakra } from '@/components/sections/InteractiveChakra';

import { AboutExperience } from '@/components/sections/AboutExperience';
import { Philosophy } from '@/components/sections/Philosophy';
import { ClosingInvitation } from '@/components/sections/ClosingInvitation';
import { SideNav } from '@/components/ui/SideNav';
import { GlobalMenu } from '@/components/ui/GlobalMenu';
import { GlobalEnvironment } from '@/components/ui/GlobalEnvironment';
import { GlobalAudio } from '@/components/ui/GlobalAudio';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      // Force GSAP to recalculate all pin spacers and trigger positions
      // after all child sections have mounted. This prevents sections from
      // scrolling up prematurely if they were calculated out of order.
      const timer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <main className="w-full min-h-screen relative text-warmIvory block">
      {!loaded ? (
        <ThresholdLoader onComplete={() => setLoaded(true)} />
      ) : (
        <>
          <GlobalEnvironment />
          <GlobalAudio />
          
          <GlobalMenu />
          <SideNav />
          
          <Threshold />
          <Philosophy />

          <InteractiveChakra />
          <Waitlist />
          <AboutExperience />
          <ClosingInvitation />
        </>
      )}
    </main>
  );
}
