"use client";

import ItemCard from '@/app/(client)/components/common/all-products/ItemCard';
import { useGetFetchQuery } from '@/lib/customHook/useGetFetchedQuery';
import { rubik } from '@/lib/fonts/fonts';
import { ProductType } from '@/lib/types/productTyps';
import Link from 'next/link';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type productQuery = {
    pageParams: number[];
    pages: {
        success: boolean;
        products: ProductType[] | [];
    }[];
    error?: string;
}

const RelatedProducts: FC = () => {
    //! for now we are using that query
    //! have to create a new query witch will fetch related products
    const data: productQuery | undefined = useGetFetchQuery(['products']);
    const relatedProductdata: ProductType[] | undefined = data?.pages.reduce((acc: any, page: any) => {
        if (page.success) return [...acc, ...page.products]
        else {
            toast.error(page.error);
            return [...acc];
        }
    }, []);

    return (
        <section className='w-full my-5'>
            <div className='h-auto w-full xl:w-11/12 flex flex-col p-2 gap-4'>

                {/* heading */ }
                <div className='w-11/12 self-end text-2xl md:text-3xl mt-2'>
                    <h1 className={ '2xl:mml-[2vw] ' + rubik.className }>Related Products</h1>
                </div>

                {/* product container */ }
                <div className='flex flex-col h-full xl:w-[72rem] lg:w-full self-center'>
                    <div
                        className='grid grid-rows-none gap-4 justify-center relative grid-cols-2 sm:grid-cols-3 md:p-4 p-2 lg:grid-cols-4 xl:grid-cols-5'
                    >
                        {
                            relatedProductdata?.map((item) => <ItemCard key={ item._id }
                                price={ item.price }
                                primaryImgUrl={ item.primaryImgUrl }
                                product_name={ item.product_name }
                                ratings={ item.ratings }
                                _id={ item._id || '' }
                            />)
                        }
                    </div>
                    <Link href="#" className='mt-3 text-xs sm:text-sm text-center font-semibold border-2 border-blue-600 rounded-2xl lg:bg-blue-100 lg:hover:bg-blue-200 bg-blue-200 text-blue-600  px-2 self-end'>
                        See all related products
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RelatedProducts;