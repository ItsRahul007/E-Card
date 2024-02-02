"use client";

import React, { useEffect } from 'react';
import ItemCard from './ItemCard';
import ProductSkeletonLoading from '../loading/Product-Skeleton-loading';
import useFetchProducts from '@/lib/customHook/useFetchProduct';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ubuntu700 } from '@/lib/fonts/fonts';

interface I_Products {
  searchKey: string;
}

const Products: React.FC<I_Products> = ({ searchKey }) => {
  const { ref: loadingRef, inView, entry } = useInView();

  const {
    allProducts,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useFetchProducts({ query: ['products'], searchKey });

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, entry, fetchNextPage, isLoading]);

  return (
    <div className='bg-[#F8F8F8] flex-1'>
      <div className='h-full w-full overflow-scroll flex items-center justify-center'>
        <div
          className='h-full grid grid-rows-none gap-4 justify-center relative grid-cols-2 sm:grid-cols-3 md:p-4 p-2 lg:grid-cols-4 xl:w-[72rem] lg:w-full xl:grid-cols-5'
        >
          {/* loading components */ }
          {
            isLoading && Array.from({ length: 10 }).map((_, index) => <ProductSkeletonLoading key={ index } />)
          }

          {/* looping products */ }
          {
            !error && allProducts?.length > 0 && allProducts.map((item: any) => <ItemCard key={ item._id } { ...item } />)
          }

          {/* if their are no products */ }
          <div className={ `h-full hidden items-center justify-center w-full absolute top-0 right-0 ${!error && !isLoading && allProducts?.length < 1 && "flex"}` }>
            <div className='relative h-3/4 w-96 flex flex-col items-center justify-center gap-2 text-3xl text-[#00bf85]'>
              <p className={ ubuntu700.className }>No Products Founded</p>
              <span className='relative h-full w-full'>
                <Image
                  src="/images/not-found.png"
                  alt='No results found'
                  fill
                  style={ {
                    objectFit: "contain"
                  } }
                />
              </span>
            </div>
          </div>

          {/* pagination loading component */ }
          <div
            className='h-10 pb-10 w-full flex items-center justify-center xl:col-span-5 lg:col-span-4 col-span-2'
            ref={ loadingRef }
          >
            <span className={ `h-10 w-10 block border-4 border-transparent rounded-full border-r-black animate-spin ${!isFetchingNextPage && "!hidden"}` } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;