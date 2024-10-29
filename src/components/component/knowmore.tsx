// This component can be called an "Interactive Sticky Scroll Reveal" or "Animated Content Reveal"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const knowMoreContent = [
  {
    title: "Our Mission",
    description: "We strive to provide innovative solutions that transform businesses and improve lives.",
    image: "/mission.jpg"
  },
  {
    title: "Our Approach",
    description: "We combine cutting-edge technology with human-centered design to create impactful solutions.",
    image: "/approach.jpg"
  },
  {
    title: "Our Team",
    description: "Our diverse team of experts brings a wealth of experience and creativity to every project.",
    image: "/team.jpg"
  },
  {
    title: "Our Impact",
    description: "We've helped numerous clients achieve their goals and make a positive impact in their industries.",
    image: "/impact.jpg"
  },
];

export default function KnowMoreSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900" id="know-more">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center mx-auto">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            about us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Discover Our Story
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
            Learn more about our company, our approach, and how we're making a difference.
          </p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            {knowMoreContent.map((item, index) => (
              <motion.div
                key={item.title}
                className={cn(
                  "cursor-pointer p-4 rounded-lg transition-colors",
                  activeIndex === index ? "bg-gray-200 dark:bg-gray-800" : ""
                )}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-96 rounded-lg overflow-hidden"
              >
                <img 
                  src={knowMoreContent[activeIndex].image} 
                  alt={knowMoreContent[activeIndex].title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <a href="http://mdinfosystems.in/" target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Know More
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
