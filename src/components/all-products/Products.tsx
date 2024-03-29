"use client";

import React, { useEffect } from 'react';
import ProductSkeletonLoading from '../common/loading/Product-Skeleton-loading';
import useFetchProducts from '@/lib/customHook/useFetchProduct';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import LoopItems from './LoopItems';
import { useGetCartItems } from '@/lib/customHook/useCartItems';
import { useGetFetchedQuery } from '@/lib/customHook/useGetFetchedQuery';

interface I_Products {
  searchKey: string;
  price?: string | undefined;
  isUserLoggededIn: boolean;
}

const Products: React.FC<I_Products> = ({ searchKey, price, isUserLoggededIn }) => {
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
  } = useFetchProducts({
    query: searchKey ? ['products', price ? price : "", searchKey] : ['products', price ? price : ""],
    searchKey,
    price
  });

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, entry, fetchNextPage, isLoading]);

  const { refetch: refetchCartItems } = useGetCartItems();
  const allCartItems = useGetFetchedQuery(["get-cart-items"]);

  useEffect(() => {
    if (isUserLoggededIn && !allCartItems) {
      refetchCartItems();
    }
  }, []);

  return (
    <div className='bg-[#F8F8F8] flex-1'>
      <div className='h-full w-full overflow-scroll flex items-start justify-center'>
        <div
          className='grid grid-rows-none gap-4 justify-center relative grid-cols-2 sm:grid-cols-3 md:p-4 p-2 lg:grid-cols-4 xl:w-[72rem] lg:w-full xl:grid-cols-5'
        >
          {
            //? loading components
            isLoading && Array.from({ length: 10 }).map((_, index) => <ProductSkeletonLoading key={ index } />)
          }

          { !error && allProducts?.length > 0 && <LoopItems allProducts={ allProducts } allCartItems={ allCartItems?.cartProducts || [] } isUserLoggededIn={ isUserLoggededIn } /> }

          {/* if their are no products */ }
          <div
            className={
              `xl:col-span-5 lg:col-span-5 sm:col-span-3 col-span-2
              items-center justify-center hidden
              ${!error && !isLoading && allProducts?.length < 1 && "!flex"}`
            }
          >
            <div className='relative h-3/4 w-60 md:w-96 flex flex-col items-center justify-center gap-2 text-xl md:text-3xl text-[#00bf85]'>
              <p className={ `text-center font-bold font-ubuntu` }>There are no { searchKey && <span className='capitalize'>&quot;{ searchKey }&quot; related</span> } products</p>
              <span className='relative h-80 md:h-96 w-80 md:w-96'>
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
            className='h-10 w-full flex items-center justify-center xl:col-span-5 lg:col-span-4 col-span-2'
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