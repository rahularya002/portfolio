"use client"

import { motion } from 'framer-motion';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Link from 'next/link'

const WorkshopNav = () => {
  return (
    <motion.nav
      className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-teal-500"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center h-20">
          <div className="col-span-1 text-white font-bold text-lg md:text-xl animate-pulse">
            🔥 Flash Sale: 50% OFF All Workshops!
          </div>
          <div className="col-span-1 flex justify-end items-center space-x-4">
            <Link href='/workshop/Signup'>
              <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold py-2 px-6 rounded-full transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
                Register Now!
              </button>
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default WorkshopNav;
