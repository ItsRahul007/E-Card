import React from 'react';
import { Roboto } from 'next/font/google';
import BigCard from './BigCard';

const Card: React.FC = () => {
  return (
    <section className={"h-screen w-full bg-white flex items-center justify-center gap-5 z-20"}>
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
    </section>
  )
}

export default Card;