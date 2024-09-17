// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import LenisScroll from './LenisScroll'
import { Toaster } from "@/components/ui/toaster"
import { Montserrat } from 'next/font/google'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )} 
      >
        <LenisScroll />
        <Toaster />
        {children}
      </body>
    </html>
  )
}