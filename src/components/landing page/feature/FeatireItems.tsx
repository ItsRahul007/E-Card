import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface I_FeatireItems {
    productId: string;
    imgUrl: string;
}

const FeatireItems: React.FC<I_FeatireItems> = ({ imgUrl, productId }) => {
    return (
        <Link href={ '/single-product/' + productId } className='h-full sm:h-60 w-60 cursor-pointer relative' target='_blank'>
            <Image
                src={ imgUrl }
                alt="item"
                fill
                className='object-contain md:shadow-md cursor-pointer'
            />
        </Link>
    );
};

export default FeatireItems;