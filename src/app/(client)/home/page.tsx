import React from 'react';
import AllProductNav from '@/app/lib/common/all-products/Nav';
import Products from '@/app/lib/common/all-products/Products';
import Filter from '@/app/lib/common/all-products/Filter';

const Home: React.FC = () => {
  return (
    <div className='h-screen w-screen bg-[#EAEAEA] flex flex-col'>
      <AllProductNav />
      <div className='h-[87%] flex gap-3 mt-3'>
        <Filter />
        <Products />
      </div>
    </div>
  )
}

export default Home;