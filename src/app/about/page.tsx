"use client";
import React from 'react';
import { TimelineDemo } from '@/components/ui/Timelinedemo';
import { Achievements } from '@/components/component/achievements';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import HomeButton from '@/components/HomeButton';
import Hero from '@/components/Hero';
import { Element } from "react-scroll";
const AboutUs = () => {
  return (
    <div className="w-full px-0 relative">
      <HomeButton />
      <Hero />
      {/* <GoogleGeminiEffectDemo /> */}
      <TimelineDemo />
      <Achievements />
      <Element name="contact">
        <section id="contact">
          <Contact />
        </section>
      </Element>
      <Footer />
    </div>
  );
};

export default AboutUs;