import React from 'react';
import itemArr from '@/app/item/itemInfo';
import ItemCard from './ItemCard';

const Products: React.FC = async () => {
  return (
    <div className='bg-[#F8F8F8] flex-1'>
      <div className='h-full w-full overflow-scroll flex items-center justify-center'>
        <div className='h-full w-[72rem] p-4 grid grid-cols-4 grid-rows-none gap-4 items-center justify-center'>
          {itemArr.map(item => <ItemCard key={item.imgUrl} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;