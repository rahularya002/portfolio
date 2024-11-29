// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import LenisScroll from './LenisScroll';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from 'next/font/google';
import TopLoader from "@/components/Toploader";
import Script from 'next/script';
import { initGA, GA_TRACKING_ID } from '@/lib/gtag';

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ENB Quantum',
  description: 'The official ENB Quantum website.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Initialize Google Analytics
  if (typeof window !== 'undefined') {
    initGA();
  }

  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <head>
        {/* Google Tag Manager Script */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        ></Script>
        <meta name='google-site-verification' content='google463bf911f6397616.html'/>
        
      </head>
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <TopLoader />
        <LenisScroll />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
