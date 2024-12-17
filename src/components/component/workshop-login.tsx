"use client";

import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

const WorkshopLogin = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Workshop Registration
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/workshop.jpg"
            alt="Workshop Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Exclusive Online Workshop: Limited Spots!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Immerse yourself in a transformative learning experience. Details coming soon!
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mb-8">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              To Be Announced Soon
            </p>
          </div>
          <Link href="/workshop/Signup">
            <motion.button
              disabled
              className="bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-lg text-lg shadow-lg cursor-not-allowed dark:bg-gray-500 dark:text-gray-300"
            >
              Coming Soon
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkshopLogin;
