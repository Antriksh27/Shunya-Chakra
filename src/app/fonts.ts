import localFont from 'next/font/local';
import { Quicksand, Noto_Serif_Devanagari } from 'next/font/google';

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

export const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});
