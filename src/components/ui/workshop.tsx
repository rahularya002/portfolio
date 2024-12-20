"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';

const WorkshopLogin = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Checkout our Workshop
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
            Immerse yourself in a transformative learning experience. Don't miss out!
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mb-8">
            {['Hours', 'Minutes', 'Seconds'].map((unit, index) => (
              <div key={unit} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(timeLeft).split(':')[index]}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{unit}</div>
              </div>
            ))}
          </div>
          <Link href='/workshop'>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600 relative overflow-hidden group"
            >
              <span className="relative z-10">Secure Your Spot</span>
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </motion.button>
          </Link>
          
        </div>
      </motion.div>
    </div>
  );
};

export default WorkshopLogin;
