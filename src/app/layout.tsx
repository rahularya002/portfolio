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
        {/* Meta Tags for SEO */}
        <meta name="keywords" content="web development, mobile app development, digital marketing, media production, corporate videos, app development, digital marketing company, digital marketing services, web marketing, digital marketing website, online digital marketing, online marketing, online marketing company, best digital marketing, media marketing, best online marketing, online marketing website, online marketing service, website marketing services, digital market company, digital branding, marketing digital marketing, digital ad, media marketing company, digital branding solutions, digital media company, on digital marketing, marketing digital company, digital marketing e commerce, getting into digital marketing, electronic marketing, top digital marketing, digitalen marketing, online media marketing, marketing digital e commerce, advertising digital, website for marketing, digital marketing is, digital brand management, digital marketing for my website, best websites for marketing, online brand management, digital market online, digital marketing and website development, digital marketing digital, digital marketing in, online digital market, the digital marketing, marketing and digital marketing, ecommerce development, marketing digital agencies, digital promotion services, online marketing for businesses, online marketing e commerce, digital website marketing, web marketing company, digital marketing for it services, online ad company, it digital marketing, online marketing digital, digital ad company, the best digital marketing, services for digital marketing, dixhital marketing, digital marketing it, digital brand strategy, our digital marketing services, media marketing services, marketing digital website, online and digital marketing, marketing and web development, search marketing agencies, our services digital marketing, ux digital marketing, in digital marketing, digital market services, online marketing and digital marketing, digital promotion company, website development and marketing, web marketing services, digital marketing and web designing, the digital market, digital marketing retail, online marketing digital marketing, i digital marketing, digital and marketing, digital market website, digitas marketing, digital publicity, full service online marketing, the best online marketing, my digital marketing, search digital marketing, digital marketing digital marketing, marketing web development, digital mktg, the digital marketing company, for digital marketing, digital marketing for, digital media marketer, what is quantum computing?, how does quantum computing work?, quantum computing explained, introduction to quantum computing, basics of quantum technology, future of quantum computing, quantum computing vs traditional computing, applications of quantum computing, quantum computing in artificial intelligence, quantum computing for business solutions, quantum computing in finance, quantum computing in healthcare, quantum computing in cybersecurity, quantum computing for data analysis, how industries use quantum computing, top quantum computing startups, learn quantum computing for beginners, quantum computing tutorial, online quantum computing courses, quantum computing certifications, quantum computing resources, best books on quantum computing, quantum mechanics and computing, quantum computing for students, quantum algorithms explained, how quantum computers are built, quantum circuits vs classical circuits, quantum bits (qubits) explained, quantum hardware manufacturers, quantum programming languages, quantum computing simulators, latest developments in quantum computing, quantum computing trends 2024, emerging technologies in quantum computing, quantum computing breakthroughs, innovations in quantum computing, quantum computing market growth, future predictions for quantum technology, quantum computing in the metaverse, ai and quantum computing integration, benefits of quantum computing for businesses, challenges in quantum computing development, quantum computing vs supercomputing, real-world applications of quantum computers, how to invest in quantum computing, will quantum computers replace classical computers?, top companies working on quantum computing, quantum computing jobs and opportunities" />
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
