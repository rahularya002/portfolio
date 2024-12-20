"use client"
import { motion } from 'framer-motion';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from 'next/link';
import ShinyButton from '../magicui/shiny-button';

const workshopCards = [
  { title: "Web Development", image: "/wd.jpg", description: "Master modern web technologies and frameworks." },
  { title: "Data Science", image: "/dm.jpg", description: "Dive into data analysis, machine learning, and AI." },
  { title: "UX/UI Design", image: "/approach.jpg", description: "Create intuitive and beautiful user interfaces." },
  { title: "Mobile App Development", image: "/sf.jpg", description: "Build powerful mobile applications for iOS and Android." },
  { title: "Cloud Computing", image: "/mission.jpg", description: "Harness the power of cloud technologies." },
  { title: "Artificial Intelligence", image: "/mad.jpg", description: "Explore the cutting-edge world of AI and machine learning." },
];

function WorkshopCards() {
  return (
    <div className="lg:w-3/5 md:w-auto mx-auto py-16">
      <motion.h2 
        className="text-black dark:text-white text-4xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore MD Infosystem
      </motion.h2>
      <motion.h3
        className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover a world of learning opportunities
      </motion.h3>
      <HoverEffect items={workshopCards.map((card) => ({
        title: card.title,
        description: card.description,
        image: card.image,
      }))} />

      <div className='flex items-center justify-center'>
        <Link href="http://mdinfosystems.in/">
              <ShinyButton text="Learn More" className="bg-transparent border border-primary text-primary">
                <span className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </span>
              </ShinyButton>
            </Link>
      </div>
      
    </div>
  );
}

export default WorkshopCards;
