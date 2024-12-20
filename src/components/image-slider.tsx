"use client";
import { motion } from "framer-motion";
import React from "react";
import { VideoSlider } from "@/components/ui/images-slider";
import { Button } from "@/components/ui/button";

export function ImagesSliderDemo() {
  const ScrollButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button> & { to: string }>(
    ({ to, children, ...props }, ref) => {
      const handleClick = () => {
        const element = document.getElementById(to);
        if (element) {
          const offsetTop = element.offsetTop;
          window.scrollTo({
            top: offsetTop - 90,
            behavior: 'smooth'
          });
        }
      };

      return (
        <Button
          {...props}
          ref={ref}
          onClick={handleClick}
        >
          {children}
        </Button>
      );
    }
  );
  ScrollButton.displayName = "ScrollButton";

  const videos = [
    "https://www.youtube.com/embed/5q-tuf4ZQtw"
  ];
  return (
    <VideoSlider className="h-screen" videos={videos} autoplay={false}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl uppercase text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Dive into the <br />Immersive World of AI
        </motion.p>
        <ScrollButton to="contact" className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </ScrollButton>
      </motion.div>
    </VideoSlider>
  );
}
