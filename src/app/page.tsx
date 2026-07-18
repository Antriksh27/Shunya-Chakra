'use client';

import { useState } from 'react';
import { ThresholdLoader } from '@/components/ui/ThresholdLoader';
import { Threshold } from '@/components/sections/Threshold';
import { Origin } from '@/components/sections/Origin';
import { Awakening } from '@/components/sections/Awakening';
import { Pillars } from '@/components/sections/Pillars';
import { Seekers } from '@/components/sections/Seekers';
import { Becoming } from '@/components/sections/Becoming';
import { Invitation } from '@/components/sections/Invitation';
import { NineNights } from '@/components/sections/NineNights';
import { SideNav } from '@/components/ui/SideNav';
import { GlobalMenu } from '@/components/ui/GlobalMenu';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="w-full flex flex-col min-h-screen">
      <ThresholdLoader onComplete={() => setLoaded(true)} />
      
      {/* We wait for ThresholdLoader to finish before triggering entry animations in Threshold */}
      {loaded && (
        <>
          <GlobalMenu />
          <SideNav />
          <Threshold />
          <Origin />
          <Awakening />
          <NineNights />
          <Pillars />
          <Seekers />
          <Becoming />
          <Invitation />
        </>
      )}
    </main>
  );
}
