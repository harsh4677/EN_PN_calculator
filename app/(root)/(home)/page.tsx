import React from 'react';
import EN_Button from '@/components/EN_Button';
import PN_Button from '@/components/PN_Button';

function Home() {
  return (
    <section className="flex h-screen w-screen flex-col glowing-stars justify-center items-center gap-10 text-white no-scrollbar overflow-hidden">
      <div className="h-[700px] w-full rounded-[30px] bg-cover bg-center flex items-center justify-center">
        <span className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-white group'>
          <span className='self-center whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-5xl relative'>
            Fueling Recovery with Accurate Nutrition Calculations
            <span className='absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
          </span>
        </span>
      </div>
      <div className='flex flex-col md:flex-row gap-4 w-full justify-center items-center max-w-lg'>
        <EN_Button className="w-full md:w-auto px-4 py-2 text-center" />
        <PN_Button className="w-full md:w-auto px-4 py-2 text-center" />
      </div>
    </section>
  );
}

export default Home;
