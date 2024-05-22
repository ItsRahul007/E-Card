import { I_BestSalesSingleItem } from '@/lib/types/productTyps';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BestSalesGsap from './BestSalesGsap';

const BestSalesSingleItem: React.FC<I_BestSalesSingleItem> = ({ _id, current_price, primaryImgUrl, product_name }) => {
    return (
        <div className='h-auto min-h-[20rem] w-full flex flex-col gap-2 bg-slate-100 items-center justify-center py-3 col-span-1 row-span-1' id={ 'best-sales-item' + String(_id) }>
            <BestSalesGsap id={ String(_id) } />
            <Link href={ '/single-product/' + _id } target='_blank' className='md:h-56 h-44 md:w-56 w-full relative'>
                <Image
                    src={ primaryImgUrl }
                    alt="item"
                    fill
                    className='object-contain cursor-pointer'
                />
            </Link>
            <div className='flex flex-col gap-1 text-center px-1 max-w-full md:w-auto truncate overflow-hidden text-ellipsis xl:px-5'>
                <span className='w-full truncate overflow-hidden font-medium text-zinc-700'>{ product_name }</span>
                <span className='text-zinc-400 text-sm font-medium'>${ current_price }</span>
            </div>
        </div>
    )
}

export default BestSalesSingleItem;