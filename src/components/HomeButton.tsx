import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const HomeButton = () => {
  return (
    <Link href="/">
      <div className="fixed top-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors">
        <FaHome size={24} />
      </div>
    </Link>
  );
};

export default HomeButton;