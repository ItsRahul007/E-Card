import React, { FC } from 'react';
import AllProductNav from '@/app/lib/common/all-products/Nav';
import Products from '@/app/lib/common/all-products/Products';
import Filter from '@/app/lib/common/all-products/Filter';

interface pageProps {
  params: { productKey: string };
  searchParams: { search: string };
}

const page: FC<pageProps> = ({ params, searchParams }) => {
  return (
    <div className='h-screen w-screen bg-[#EAEAEA] flex flex-col'>
      <AllProductNav filters={ true } />
      <div className='h-[92%] sm:h-[91%] lg:h-[87%] flex gap-3 lg:mt-3'>
        <Filter />
        <Products />
      </div>
    </div>
  );
};

export default page;