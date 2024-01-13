"use client";

import React, { useEffect } from 'react';
import ItemCard from './ItemCard';
import ProductSkeletonLoading from '../loading/Product-Skeleton-loading';
import useFetchProducts from '@/app/lib/customHook/useFetchProduct';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({
  weight: "700",
  style: "italic",
  subsets: ["latin"]
});

const Products: React.FC = () => {
  const { ref: loadingRef, inView, entry } = useInView();

  const {
    allProducts,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFetchProducts();

  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView, entry, fetchNextPage, isLoading]);

  return (
    <div className='bg-[#F8F8F8] flex-1'>
      <div className='h-full w-full overflow-scroll flex items-center justify-center'>
        <div
          className='h-full w-11/12 p-4 grid grid-cols-4 grid-rows-none gap-4 justify-center relative xl:w-[72rem] xl:grid-cols-5'
        >
          {/* loading components */}
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeletonLoading key={index} />
            ))
          }

          {/* looping products */}
          {!error && allProducts?.length > 0 &&
            allProducts.map((item: any) => <ItemCard key={item._id} {...item} />)
          }

          {/* if their are no products */}
          <div className={`h-full hidden items-center justify-center w-full absolute top-0 right-0 ${!error && !isLoading && allProducts?.length < 1 && "flex"}`}>
            <div className='relative h-3/4 w-96 flex flex-col items-center justify-center gap-2 text-3xl text-[#00bf85]'>
              <p className={ubuntu.className}>No Products Founded</p>
              <span className='relative h-full w-full'>
                <Image
                  src="/images/not-found.png"
                  alt='No results found'
                  fill
                  onError={(e) => console.log(e)}
                />
              </span>
            </div>
          </div>

          {/* pagination loading component */}
          <div
            className='h-10 w-full flex items-center justify-center col-span-4'
            ref={loadingRef}
          >
            <span className={`h-10 w-10 block border-4 border-transparent rounded-full border-r-black animate-spin ${!isFetchingNextPage && "!hidden"}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;