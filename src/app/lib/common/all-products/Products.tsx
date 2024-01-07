"use client";

import React, { useEffect, useRef } from 'react';
import ItemCard from './ItemCard';
import ProductSkeletonLoading from '../loading/Product-Skeleton-loading';
import useFetchProducts from '@/app/lib/customHook/useFetchProduct';
import style from "@/app/style/style.module.css";


const Products: React.FC = () => {
  const productContainer = useRef<HTMLDivElement>(null);

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

  useEffect(() => {

    const handleScroll = () => {
      if (productContainer.current) {
          const { scrollTop, clientHeight, scrollHeight } = productContainer.current;
      
          // Check if the user is at the bottom (with a small threshold for better user experience)
          const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
          if (isBottom && !isFetchingNextPage) {
            fetchNextPage();
          }
      }
    };

    productContainer.current && productContainer.current.addEventListener('scroll', handleScroll);

    return () => {
      productContainer.current && productContainer.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-[#F8F8F8] flex-1'>
      {/* <button onClick={() => fetchNextPage()}>next</button> */}
      <div
        className='h-full w-full overflow-scroll flex items-center justify-center'
        ref={productContainer}
      >
        <div className='h-full w-[72rem] p-4 grid grid-cols-4 grid-rows-none gap-4 items-center justify-center'>
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeletonLoading key={index} />
            ))
          }
          {!error && allProducts?.map((item: any) => <ItemCard key={item.imgUrl} {...item} />)}
          <div className={'h-10 w-full flex items-center justify-center col-span-4 '}>
            <span className={`h-10 w-10 block border-4 border-transparent rounded-full border-r-black animate-spin ${!isFetchingNextPage && "!hidden"}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;