import React from 'react';
import { Ubuntu } from 'next/font/google';
import Link from 'next/link';

const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin-ext", ],
  style: 'italic'
});

const AllProductNav: React.FC = () => {
  return (
    <nav className='w-screen h-20 bg-[#41B4CD] text-white flex'>
        <span className='h-full w-1/3 flex justify-end items-center gap-8'>
            <span className={`!font-black text-3xl ${ubuntu.className}`}>E-Card</span>
            <input type="text" placeholder='Search products and brands' className='p-3 rounded-md text-sm outline-none text-[#222222] w-64 placeholder:font-sans font-sans' />
        </span>
        <span className='h-full flex-1 flex justify-center items-center gap-8 text-white font-sans text-lg'>
          <Link href="/home/search?search=shoes" className='cursor-pointer'>Shoes</Link>
          <Link href="/home/search?search=eyeware" className='cursor-pointer'>Eyeware</Link>
          <Link href="/home/search?search=electronics" className='cursor-pointer'>Electronics</Link>
          <Link href="/home" className='cursor-pointer'>Become a Seller</Link>
          <Link href="/cart" className='cursor-pointer'>Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
          <Link href="/cart" className='cursor-pointer'>Fevorite <i className="ri-heart-fill font-thin"></i></Link>
        </span>
    </nav>
  )
}

export default AllProductNav;