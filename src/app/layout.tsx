import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import LenisScroll from './LenisScroll';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from 'next/font/google';
import TopLoader from "@/components/Toploader";
import Script from 'next/script'; // Import Script component from Next.js

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
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <head>
        {/* Add the Google Tag Manager script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SR3X8XW7YH"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SR3X8XW7YH');
          `}
        </Script>
      </head>
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )} 
      >
        <TopLoader />
        <LenisScroll />
        <Toaster />
        {children}
      </body>
    </html>
  )
}
