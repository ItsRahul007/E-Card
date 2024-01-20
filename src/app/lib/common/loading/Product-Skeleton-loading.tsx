import React from 'react';

const ProductSkeletonLoading = () => {
    return (
        <div className='border sm:h-64 min-[390px]:h-56 h-48 sm:w-52 min-[390px]:w-44 w-36 flex flex-col items-center gap-1 overflow-hidden rounded-md shadow bg-white cursor-pointer hover:translate-y-[-2px] col-span-1'>
            <div className='h-3/4 w-full bg-gray-300 animate-pulse' />
            <div className='h-1/4 w-full flex flex-col items-center md:gap-3 gap-1'>
                <div className='sm:mr-10 mr-7 w-3/4 mt-1 h-4 md:h-5 bg-gray-300 animate-pulse' />
                <div className='sm:mr-10 mr-7 w-3/4 h-4 md:h-5 bg-gray-300 animate-pulse' />
            </div>
        </div>
    )
}

export default ProductSkeletonLoading;