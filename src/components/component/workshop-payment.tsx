"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const WorkshopPricing = () => {
  const [isHovered, setIsHovered] = useState(false);

  const workshopFeatures = [
    'Comprehensive 2-day intensive training',
    'Hands-on exercises with real-world projects',
    'Live Q&A sessions with industry experts',
    '60-day access to all workshop materials',
    'Certificate of completion',
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">Workshop Pricing and Details</h1>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Master Your Skills</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300">
            <li>Intensive workshop designed to elevate your abilities</li>
            <li>Suitable for beginners and experienced professionals</li>
            <li>Gain valuable insights and practical knowledge</li>
            <li>Learn from industry leaders</li>
            <li>Network with like-minded professionals</li>
            <li>Limited spaces available</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden md:w-5/12"
        >
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Workshop Package</h3>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">$299</p>
            <ul className="space-y-3 mb-6">
              {workshopFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <FaCheck className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href='/workshop/Signup'>
              <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
              >
                {isHovered ? 'Secure Your Spot!' : 'Register Now'}
              </motion.button>
            </Link>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkshopPricing;
