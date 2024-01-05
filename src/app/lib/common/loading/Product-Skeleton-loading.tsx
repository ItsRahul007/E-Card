import React from 'react';

const ProductSkeletonLoading = () => {
    return (
        <div className='border h-[18rem] w-64 flex flex-col items-center gap-1 overflow-hidden rounded-md shadow bg-white'>
            <div className='relative h-3/4 w-full bg-gray-300 animate-pulse' />
            <div className='h-1/4 w-full flex flex-col items-center gap-3'>
                <div className='mr-10 w-3/4 mt-1 h-5 bg-gray-300 animate-pulse' />
                <div className='mr-10 w-3/4 h-5 bg-gray-300 animate-pulse' />
            </div>
        </div>
    )
}

export default ProductSkeletonLoading;