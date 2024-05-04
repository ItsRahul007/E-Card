import Image from 'next/image';
import React from 'react'

const FeatireItems = () => {
    return (
        <div className='h-full sm:h-60 w-60 cursor-pointer relative'>
            <Image
                src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg"
                alt="item"
                fill
                className='object-contain md:shadow-md cursor-pointer'
            />
        </div>
    );
};

export default FeatireItems;