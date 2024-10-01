"use client";
import { ImagesSliderDemo } from "@/components/image-slider";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import VideoService from "@/components/video-service";
import { Element } from "react-scroll";
import HomeButton from '@/components/HomeButton';

export default function Services() {
  return (
    <div>
      <HomeButton />
      <ImagesSliderDemo />
      <VideoService />
      <Element name="contact">
        <section id="contact">
          <Contact />
        </section>
      </Element>
      <Footer />
    </div>
  );
}
