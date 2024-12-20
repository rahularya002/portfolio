"use client"
import { DockDemo } from '@/components/Dock'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import StickyScrollRevealDemo from '@/components/component/knowmore'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TestimonialSection from '@/components/Testimonial'
import { Element } from "react-scroll";
import { GoogleGeminiEffectDemo } from '@/components/google-gemeni-effect';
import WorkshopLogin from '@/components/ui/workshop'
// import TestimonialSection from '@/components/Testimonial'


export default function Home() {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      
      <main className="flex-grow">
        <Element name="home">
          <section id="home">
            <GoogleGeminiEffectDemo />
          </section>
        </Element>
        <Element name="services">
          <section id="services">
            <Services />
          </section>
        </Element>
        <Element name="knowmore">
          <section id="knowmore">
            <StickyScrollRevealDemo />
          </section>
        </Element>
        <Element name="projects">
          <section id="projects">
            <Projects />
          </section>
        </Element>
        <WorkshopLogin />
        <Element name="testimonials">
          <section id="testimonials">
            <TestimonialSection />
          </section>
        </Element>
        <Element name="contact">
          <section id="contact">
            <Contact />
          </section>
        </Element>
        <DockDemo />
      </main>
      <Footer />
    </div>
  )
}