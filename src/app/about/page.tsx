import React from 'react';
import { GoogleGeminiEffectDemo } from '@/components/google-gemeni-effect';
import { TimelineDemo } from '@/components/ui/Timelinedemo';
import { Achievements } from '@/components/component/achievements';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import HomeButton from '@/components/HomeButton';

const AboutUs = () => {
  return (
    <div className="w-full px-0 relative">
      <HomeButton />
      <GoogleGeminiEffectDemo />
      <TimelineDemo />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;