import React from 'react';
import itemArr from '@/app/item/itemInfo';
import ItemCard from './ItemCard';

const Products = () => {
  return (
    <div className='bg-[#F8F8F8] flex-1 h-full grid grid-cols-4 overflow-scroll'>
      {itemArr.map(item => <ItemCard key={item.imgUrl} {...item} />)}
      {itemArr.map(item => <ItemCard key={item.imgUrl} {...item} />)}
    </div>
  )
}

export default Products;