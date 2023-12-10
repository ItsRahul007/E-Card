"use client";

import React, { useEffect, useMemo } from 'react';
import style from "@/app/style/style.module.css";
import { Poppins, Roboto } from 'next/font/google';
import Button from '../../common/Button';
import Link from 'next/link';
import gsap from 'gsap';

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  style: ["normal"]
});

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
  style: ["normal"]
});

const Banner: React.FC = () => {
  const bannerTimeLine = useMemo(() => gsap.timeline(), []);

  useEffect(() => {
    bannerTimeLine.fromTo("#logo", { y: -50, opacity: 0 }, { y: 0, opacity: 1 });
    bannerTimeLine.fromTo("#banner-nav", { y: -100, opacity: 0 }, { y: 0, opacity: 1 });
    bannerTimeLine.fromTo("#h-text-1", { x: -50, opacity: 0 }, { x: 0, opacity: 1 });
    bannerTimeLine.fromTo("#h-text-2", { x: 50, opacity: 0 }, { x: 0, opacity: 1 });
    bannerTimeLine.fromTo("#banner-btn", { opacity: 0, duration: 0.8 }, { opacity: 1 });

    return () => {
      bannerTimeLine.clear();
    }
  }, [bannerTimeLine]);

  return (
    <header className={`${style.banner} text-white`} id="banner_component">
      {/* the nav bar */}
      <nav id='banner-nav' className="w-full h-[70px] flex justify-center items-center">
        <div className={`bg-[#2b2a29] w-[70%] h-full relative ${style.nav_child} ${poppins.className}`}>
          <ul className='h-full w-full flex justify-center items-center gap-6 text-base'>
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
              <Link href="/">Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Fevorite <i className="ri-heart-fill font-thin"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/login">Login <i className="ri-login-box-fill font-thin"></i></Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* icon */}
      <div className='text-[40px] text-center font-bold mt-9' id='logo'>E-Card</div>

      {/* head lines */}
      <div className='text-center mt-12'>
        <h1 className={'text-[70px] font-extrabold ' + roboto.className}>
          <div id='h-text-1'>GET START</div>
          <div id='h-text-2'>YOUR FAVRIOT SHOPING</div>
        </h1>
        <span id='banner-btn'>
          <Button className='text-white text-2xl bg-black p-5 px-6 mt-10 font-semibold hover:bg-[#f26522] rounded-lg' />
        </span>
      </div>
    </header>
  );
};

export default Banner;