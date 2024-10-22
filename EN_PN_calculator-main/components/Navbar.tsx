import Link from 'next/link';
import React from 'react';
import AboutButton from './AboutButton'; 

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href='/' passHref>
        <span className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Anoushka
          </span>
        </span>
      </Link>
      <AboutButton />
    </nav>
  );
};

export default Navbar;
