import React from 'react';
import style from "@/app/style/banner.module.css";
import { Poppins, Roboto } from 'next/font/google';
import Button from '../../common/Button';
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
  return (
    <section className={`${style.banner} text-white`}>
      {/* the nav bar */}
      <nav className={'w-full h-[70px] flex justify-center items-center ' + poppins.className}>
        <div className={`bg-[#2b2a29] w-3/4 h-full relative ${style.nav_child}`}>
          <ul className='h-full w-full flex justify-center items-center gap-6 text-base font-normal'>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Home</li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Fashion</li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Jewellery</li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>New Release</li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Customer Service</li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Cart <i className="ri-shopping-cart-2-fill"></i></li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>Fevorite <i className="ri-heart-fill"></i></li>
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