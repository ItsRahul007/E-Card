"use client";

import React from 'react';
import ItemCard from './ItemCard';
import ProductSkeletonLoading from '../loading/Product-Skeleton-loading';
import useFetchProducts from '@/app/lib/customHook/useFetchProduct';


const Products: React.FC = () => {
  const {
    allProducts,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
    isFetching,
  } = useFetchProducts();

  return (
    <div className='bg-[#F8F8F8] flex-1'>
      <div className='h-full w-full overflow-scroll flex items-center justify-center'>
        <div className='h-full w-[72rem] p-4 grid grid-cols-4 grid-rows-none gap-4 items-center justify-center'>
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeletonLoading key={index} />
            ))
          }
          {!error && allProducts?.map((item: any) => <ItemCard key={item.imgUrl} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;