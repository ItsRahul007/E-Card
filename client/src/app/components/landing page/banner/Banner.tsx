"use client"

import React, { useEffect } from 'react';
import style from "@/app/style/banner.module.css";
import { Poppins, Roboto } from 'next/font/google';
import Button from '../../common/Button';
import Link from 'next/link';
import { Power3, gsap } from 'gsap';

const poppins = Poppins({
  weight: ['500'],
  subsets: ['latin'],
  style: ["normal"]
});
const roboto = Roboto({
  weight: ['900'],
  subsets: ['latin'],
  style: ["normal"]
});

const Banner: React.FC = () => {
  useEffect(() => {
    gsap.fromTo("#banner-nav", {
      y: -100,
      duration: 0.5
    },
      {
        opacity: 1,
        y: 0,
        duration: 0.5
      }
    );
  }, []);

  return (
    <section className={`${style.banner} text-white`}>
      {/* the nav bar */}
      <nav id='banner-nav' className={`w-full h-[70px] flex justify-center items-center opacity-0 ${poppins.className}`}>
        <div className={`bg-[#2b2a29] w-[70%] h-full relative ${style.nav_child}`}>
          <ul className='h-full w-full flex justify-center items-center gap-6 text-base font-normal'>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/home">Home</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Fashion</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Jewellery</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">New Release</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Customer Service</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Cart <i className="ri-shopping-cart-2-fill"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Fevorite <i className="ri-heart-fill"></i></Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* icon */}
      <div className='text-[40px] text-center font-bold mt-9'>E-Card</div>

      {/* head lines */}
      <div className='text-center mt-12'>
        <h1 className={'text-[70px] font-extrabold ' + roboto.className}>GET START<br />YOUR FAVRIOT SHOPING</h1>
        <Button className='text-white text-2xl bg-black p-5 px-6 mt-10 font-semibold hover:bg-[#f26522] rounded-lg' />
      </div>
    </section>
  );
};

export default Banner;