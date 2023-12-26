import Image from 'next/image';
import React from 'react';

interface itemProps {
    imgUrl: string;
    itemName: string;
    itemRate: string | number;
};

function Item(props: itemProps) {
    const { imgUrl, itemName, itemRate } = props;
    console.log(imgUrl);

    return (
        <div className='flex flex-col'>
            <span className='h-60 w-60 cursor-pointer relative'>
                <Image
                    src={imgUrl? imgUrl: ''}
                    alt="item"
                    fill
                />
            </span>
            <span className='flex flex-col gap-1 mt-5'>
                <h5 className='font-semibold cursor-pointer'>{itemName}</h5>
                <div className='font-medium cursor-pointer'>${itemRate}</div>
            </span>
        </div>
    )
}

export default Item;