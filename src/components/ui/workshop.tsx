"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

const WorkshopLogin: React.FC = () => {
  const targetDate = new Date("2025-01-26T17:00:00");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      return Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
    };

    // Initialize countdown on the client side
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  if (timeLeft === null) return null; // Avoid rendering during hydration mismatch

  const formattedTime = formatTime(timeLeft);

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
            {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => {
              const value = Object.values(formattedTime)[index];
              return (
                <div key={unit} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{unit}</div>
                </div>
              );
            })}
          </div>
          <Link href="/workshop">
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
