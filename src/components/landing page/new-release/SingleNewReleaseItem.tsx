import Image from 'next/image';
import React from 'react';

const SingleNewReleaseItem = () => {
    return (
        <div className='h-full w-full flex flex-col gap-2 bg-slate-100 items-center justify-center py-3'>
            <div className='md:h-32 h-36 md:w-32 w-36 relative'>
                <Image
                    src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg"
                    alt="item"
                    fill
                    className='object-contain cursor-pointer'
                />
            </div>
            <div className='flex flex-col gap-1 text-center px-1 max-w-full md:w-auto truncate overflow-hidden text-ellipsis'>
                <span className='w-full truncate overflow-hidden font-medium text-zinc-700'>Lorem ipsum dolor sit amet.</span>
                <span className='text-zinc-400 text-sm font-medium'>$555</span>
            </div>
        </div>
    )
}

export default SingleNewReleaseItem;