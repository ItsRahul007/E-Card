import React from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import BannerGSAP from './bannerGSAP';
import { cookies } from 'next/headers';
import NavOptions from './NavOptions';

const Banner: React.FC = () => {
  const isUserLoggedIn = cookies().get('authToken') ? true : false;

  return (
    <header className={ `${style.banner} text-white` } id="banner_component">
      <BannerGSAP />
      {/* the nav bar */ }
      <nav id='banner-nav' className="w-full h-[70px] flex justify-center items-center">
        <div className={ `bg-[#2b2a29] w-[70%] h-full relative ${style.nav_child} font-poppins font-semibold` }>
          <ul className='h-full w-full flex justify-center items-center gap-6 text-base'>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/products/all">All Products</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Best Sales</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">New Release</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Become a seller</Link>
            </li>
            <NavOptions isUserLoggedIn={ isUserLoggedIn ? true : false } />
          </ul>
        </div>
      </nav>

      {/* icon */ }
      <div className={ `text-[40px] text-center font-bold mt-9 font-ubuntu` } id='logo'>E-Card</div>

      {/* head lines */ }
      <div className='text-center mt-12'>
        <h1 className='text-[70px] font-bold font-roboto'>
          <div id='h-text-1'>GET START</div>
          <div id='h-text-2'>YOUR FAVOURITE SHOPING</div>
        </h1>
        <span id='banner-btn'>
          <Button className='text-white text-2xl bg-black p-5 px-6 mt-10 font-semibold hover:bg-[#f26522] rounded-lg' />
        </span>
      </div>
    </header>
  );
};

export default Banner;