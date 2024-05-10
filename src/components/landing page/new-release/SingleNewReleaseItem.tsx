import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface I_SingleNewReleaseItem {
    productId: string;
    product_name: string;
    price: number | string;
    imgUrl: string;
}

const SingleNewReleaseItem: React.FC<I_SingleNewReleaseItem> = ({ imgUrl, price, productId, product_name }) => {
    return (
        <Link href={ '/single-product/' + productId } target='_blank' className='h-full w-full flex flex-col gap-2 bg-slate-100 items-center justify-center py-3'>
            <div className='md:h-32 h-36 md:w-32 w-36 relative'>
                <Image
                    src={ imgUrl }
                    alt="item"
                    fill
                    className='object-contain cursor-pointer'
                />
            </div>
            <div className='flex flex-col gap-1 text-center px-1 max-w-full md:w-auto truncate overflow-hidden text-ellipsis'>
                <span className='w-full truncate overflow-hidden font-medium text-zinc-700'>{ product_name }</span>
                <span className='text-zinc-400 text-sm font-medium'>${ price }</span>
            </div>
        </Link>
    )
}

export default SingleNewReleaseItem;