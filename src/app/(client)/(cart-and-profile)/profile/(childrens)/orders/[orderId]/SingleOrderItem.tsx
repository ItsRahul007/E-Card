import Image from 'next/image';
import React, { FC } from 'react';

interface I_SingleOrderItem {
    primaryImgUrl: string;
    product_name: string;
    i: number;
    product_price: number;
    quantity: number;
}

const SingleOrderItem: FC<I_SingleOrderItem> = ({
    i,
    primaryImgUrl,
    product_name,
    product_price,
    quantity
}) => {
    return (
        <>
            { i > 0 && <hr /> }
            <div className='flex flex-col sm:flex-row items-start sm:justify-center justify-start sm:gap-5 gap-3 w-full h-auto'>
                <div className='h-32 sm:h-60 sm:w-2/5 w-32 relative'>
                    <Image src={ primaryImgUrl } alt='' fill className='object-contain left-0' />
                </div>

                {/* order details */ }
                <div className='min-h-[8rem] h-auto sm:w-3/5 w-full flex flex-col gap-2 sm:gap-4'>
                    <h3 className='text-xl font-semibold'>{ product_name }</h3>
                    <h6 className='text-lg font-medium font-rubik'>Price: ${ product_price }</h6>
                    <h6>Quantity: { quantity }</h6>
                </div>
            </div>
        </>
    )
}

export default SingleOrderItem;