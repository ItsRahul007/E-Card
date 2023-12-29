import React from 'react';
import ItemCard from '@/app/components/common/all-products/ItemCard';
import AllProductNav from '../components/common/all-products/Nav';

const Home: React.FC = () => {
  return (
    <div className='h-screen w-screen bg-[#EAEAEA] flex'>
      <AllProductNav />
    </div>
  )
}

export default Home;