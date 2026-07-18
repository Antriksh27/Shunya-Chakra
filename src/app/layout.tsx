import type { Metadata } from "next";
import { burowai, galacthic, quicksand, devanagari } from "./fonts";
import "./globals.css";

import { LenisProvider } from "@/components/ui/LenisProvider";
import { Cursor } from "@/components/ui/Cursor";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { ScrollVideo } from "@/components/ui/ScrollVideo";

export const metadata: Metadata = {
  title: "Shunya Chakra | Garba",
  description: "Before there was form, there was Shunya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${burowai.variable} ${galacthic.variable} ${quicksand.variable} ${devanagari.variable}`}>
      <body>
        {/* Global Grain Overlay (Increased to 5%) */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-multiply">
          <svg className="w-full h-full">
            <filter id="global-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#global-noise)"/>
          </svg>
        </div>

        {/* Global Vignette (Dark) */}
        <div className="fixed inset-0 pointer-events-none z-[9998] bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

        <LenisProvider>
          <Cursor />
          <AudioToggle />
          <ScrollVideo />
          <div id="main-scroll-container" className="relative z-10 w-full min-h-screen">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
