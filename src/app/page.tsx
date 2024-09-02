import Navbar from '@/components/Navbar'  // Updated import path
import { DockDemo } from '@/components/Dock'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TestimonialSection from '@/components/Testimonial'
// import TestimonialSection from '@/components/Testimonial'


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Projects />
        <TestimonialSection />
        <Contact />
        <DockDemo />
      </main>
      <Footer />
    </div>
  )
}