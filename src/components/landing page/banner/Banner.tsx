import React from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import BannerGSAP from './bannerGSAP';

const Banner: React.FC = () => {
  return (
    <header className={ `${style.banner} text-white` } id="banner_component">
      <BannerGSAP />
      {/* the nav bar */ }
      <nav id='banner-nav' className="w-full h-[70px] flex justify-center items-center">
        <div className={ `bg-[#2b2a29] w-[70%] h-full relative ${style.nav_child} font-poppins font-semibold` }>
          <ul className='h-full w-full flex justify-center items-center gap-6 text-base'>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/products/all">Products</Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/">Accessories</Link>
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
              <Link href="/cart">Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/favourite">Favourite <i className="ri-heart-fill font-thin"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/login">Login <i className="ri-login-box-fill font-thin"></i></Link>
            </li>
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