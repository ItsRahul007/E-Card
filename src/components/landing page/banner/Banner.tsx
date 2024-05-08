import React from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import BannerGSAP from './bannerGSAP';
import SideNavBar from '@/components/all-products/SideNavBar';
import { T_SearchKeys } from '@/lib/types/productTyps';

const searchKeys: T_SearchKeys[] = [
  {
    label: "All Products",
    link: "/products/all"
  },
  {
    label: "New Release",
    link: "#new-release"
  },
  {
    label: "Best Sales",
    link: "#best-sales"
  },
  {
    label: "Become a seller",
    link: "#"
  }
];

const Banner: React.FC = () => {
  return (
    <section className={ `${style.banner} text-white relative` } id="banner_component">
      <BannerGSAP />
      {/* the nav bar */ }
      <nav id='banner-nav' className="w-full md:h-[70px] h-16 flex justify-center items-center relative z-50">
        <div className={ `bg-[#2b2a29] w-full md:w-4/5 lg:w-[70%] h-full relative ${style.nav_child} font-poppins font-semibold max-md:before:!content-none max-md:after:!content-none` }>
          <ul className='h-full w-full hidden md:flex justify-center items-center gap-6 text-base'>
            {
              searchKeys.map(({ label, link }) => (
                <li className='cursor-pointer list-none hover:text-[#f26522]'>
                  <Link href={ link }>{ label }</Link>
                </li>
              ))
            }
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/cart">Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
            </li>
            <li className='cursor-pointer list-none hover:text-[#f26522]'>
              <Link href="/profile">Profile <i className="ri-user-3-fill"></i></Link>
            </li>
          </ul>
          <div className='flex md:hidden text-base h-full w-full items-center justify-between px-2'>
            <div>
              <SideNavBar stopScrolling searchKeys={ searchKeys } />
            </div>
            <div className='flex gap-4'>
              <Link href="/cart">Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
              <Link href="/profile">Profile <i className="ri-user-3-fill"></i></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* icon */ }
      <div className="md:text-[40px] text-3xl text-center font-bold mt-9 font-ubuntu" id='logo'>E-Card</div>

      {/* head lines */ }
      <div className='text-center mt-12 flex gap-5 md:gap-10 flex-col relative z-0'>
        <h1 className='lg:text-[70px] md:text-6xl text-3xl font-bold font-roboto lg:space-y-16 md:space-y-10'>
          <div id='h-text-1'>GET START</div>
          <div id='h-text-2'>YOUR FAVOURITE SHOPING</div>
        </h1>
        <div id='banner-btn'>
          <Link
            href="/products/all"
            className='text-white text-2xl bg-black p-5 px-6 mt-10 font-semibold hover:bg-[#f26522] rounded-lg uppercase inline-block'
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;