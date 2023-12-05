import React from 'react';
import BigCard from './BigCard';
import { Mukta } from 'next/font/google';
const mukta = Mukta({
  weight: '700',
  subsets: ['latin'],
  style: "normal"
});

const Card: React.FC = () => {
  return (
    <section className={"h-screen w-full bg-white flex flex-col items-center justify-center gap-2 z-20"}>
      <div className='w-full h-[15%] flex items-center justify-center'>
        <h1 className={'text-5xl mt-6 text-[#474e56] ' + mukta.className}>Today<span className='text-[#f26522]'>&apos;</span>s Special</h1>
      </div>
      <div className='w-full h-[85%] flex items-center justify-center gap-5 z-20'>
        <BigCard
          url="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg"
          headText='20% Off On Tank Tops'
          position={true}
        />
        <BigCard
          url="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg"
          headText='Latest Eyewear For You'
        />
        <BigCard
          url="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg"
          headText='Let&apos;s Lorem Suit Up!'
          position={true}
        />
      </div>
    </section>
  )
}

export default Card;