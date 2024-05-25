import React from 'react';
import Link from 'next/link';
import SideNavBar from './SideNavBar';
import SearchBoxAndLogoForNav from './SearchBoxAndLogoForNav';
import { T_JwtVerifyDataType } from '@/lib/types/authToken-type';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
import SellerOption from '../landing page/banner/SellerOption';

interface I_ProductNav {
  filters?: boolean;
  profile?: boolean;
};

const Navbar: React.FC<I_ProductNav> = ({ filters, profile }) => {
  const authToken = cookies().get('authToken')?.value || '';
  let userObj: any = {
    name: 'E-Card user',
    userRole: 'user'
  };

  if (authToken) {
    const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
    userObj = decodedAuthToken.user;
  }

  const sellerOption = <SellerOption userRole={ userObj.userRole } />;

  return (
    <nav className='w-screen min-h-[8%] sm:min-h-[9%] lg:min-h-[11%] bg-appTheme-500 text-white flex'>
      {/* search box and logo */ }
      <SearchBoxAndLogoForNav />

      {/* side bar logo for small screens */ }
      <SideNavBar filters={ filters } profile={ profile } name={ userObj.name } sellerOption={ sellerOption } />

      {/* search keys and cart favourite */ }
      <span className='h-full flex-1 sm:flex hidden justify-center items-center gap-8 text-white font-sans text-base font-medium'>
        <Link href="/products/search-products" className='cursor-pointer'>All Products</Link>
        <Link href="/products/search-products?search=shoes" className='cursor-pointer'>Shoes</Link>
        <Link href="/products/search-products?search=electronics" className='cursor-pointer'>Electronics</Link>
        { sellerOption }
        <Link href="/cart" className='cursor-pointer'>Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
        <Link href="/profile" className='cursor-pointer' >My Profile <i className="ri-user-3-fill"></i></Link>
      </span>

      {/* cart and favourite for small screens */ }
      <span className='flex-1 sm:hidden flex justify-end items-center gap-4 mr-3 text-sm font-medium'>
        <Link href="/cart" className='cursor-pointer'>Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
        <Link href="/profile" className='cursor-pointer'>My Profile <i className="ri-user-3-fill"></i></Link>
      </span>
    </nav>
  )
}

export default Navbar;