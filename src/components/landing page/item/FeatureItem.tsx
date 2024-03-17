import Image from 'next/image';
import React from 'react';

interface itemProps {
    primaryImgUrl: string;
    product_name: string;
    price: string | number;
};

function Item(props: itemProps) {
    const { primaryImgUrl, product_name, price } = props;

    return (
        <div className='flex flex-col'>
            <span className='h-60 w-60 cursor-pointer relative'>
                <Image
                    src={ primaryImgUrl ? primaryImgUrl : '' }
                    alt="item"
                    fill
                />
            </span>
            <span className='flex flex-col gap-1 mt-5'>
                <h5 className='font-semibold cursor-pointer'>{ product_name }</h5>
                <div className='font-medium cursor-pointer'>${ price }</div>
            </span>
        </div>
    )
}

export default Item;