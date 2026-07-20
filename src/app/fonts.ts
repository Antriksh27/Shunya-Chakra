import localFont from 'next/font/local';
import { Noto_Serif_Devanagari, Cormorant_Garamond, Inter_Tight } from 'next/font/google';

export const burowai = localFont({
  src: [
    {
      path: '../../public/fonts/Burowai.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-burowai',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const galacthic = localFont({
  src: [
    {
      path: '../../public/fonts/Galacthic-rgRPB.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-galacthic',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-tight',
  display: 'swap',
});

export const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});
