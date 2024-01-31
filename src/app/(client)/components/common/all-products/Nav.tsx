"use client";

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import InputCompo from '../InputCompo';
import { useRouter } from 'next/navigation';
import SideNavBar from './SideNavBar';
import { ubuntu700 } from '@/lib/fonts/fonts';

interface I_ProductNav {
  filters?: boolean;
}

const AllProductNav: React.FC<I_ProductNav> = ({ filters }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

  return (
    <nav className='w-screen min-h-[8%] sm:min-h-[9%] lg:min-h-[11%] bg-[#41B4CD] text-white flex'>
      {/* search box and logo */ }
      <span className='h-full xl:w-[30rem] min-[1281px]:flex hidden justify-end items-center gap-8'>
        <span className={ `text-3xl ${ubuntu700.className}` }>E-Card</span>
        <InputCompo
          type="text"
          name='navSearch'
          placeholder='Search products and brands'
          className='p-3 rounded-md text-sm outline-none text-[#222222] w-64 placeholder:font-sans font-sans'
          onChange={ (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value) }
          currentValue={ inputValue }
          onEnter={ () => {
            if (inputValue.length) {
              router.push("/products/search-products?search=" + inputValue);
            }
          } }
        />
      </span>

      {/* side bar logo for small screens */ }
      <SideNavBar filters={ filters } />

      {/* search keys and cart favourite */ }
      <span className='h-full flex-1 sm:flex hidden justify-center items-center gap-8 text-white font-sans lg:text-lg text-base'>
        <Link href="/products/search-products?search=shoes" className='cursor-pointer'>Shoes</Link>
        <Link href="/products/search-products?search=eyeware" className='cursor-pointer'>Eyeware</Link>
        <Link href="/products/search-products?search=electronics" className='cursor-pointer'>Electronics</Link>
        <Link href="#" className='cursor-pointer'>Become a Seller</Link>
        <Link href="/cart" className='cursor-pointer'>Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
        <Link href="/favourite" className='cursor-pointer'>Favourite <i className="ri-heart-fill font-thin"></i></Link>
      </span>

      {/* cart and favourite for small screens */ }
      <span className='flex-1 sm:hidden flex justify-end items-center gap-8 mr-3'>
        <Link href="/cart" className='cursor-pointer'>Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
        <Link href="/cart" className='cursor-pointer'>Favourite <i className="ri-heart-fill font-thin"></i></Link>
      </span>
    </nav>
  )
}

export default AllProductNav;