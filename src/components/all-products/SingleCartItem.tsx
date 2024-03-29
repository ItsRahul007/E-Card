import Image from 'next/image';
import React, { FC } from 'react';
import Dropdown from './DropDown';
import IconButton from '../common/buttons/IconButton';
import Button from '../common/buttons/Button';

const SingleCartItem: FC = () => {
    return (
        <div className='h-60 lg:h-28 w-full flex flex-col lg:flex-row gap-3 lg:gap-6 items-center justify-start lg:justify-between'>
            {/* item image */ }
            <div className='flex gap-2 h-28 lg:h-full w-full lg:w-2/5 items-start'>
                {/* image */ }
                <div className='h-full w-28 relative border'>
                    <Image
                        src={ "https://m.media-amazon.com/images/I/41ElF+XdP2L.jpg" }
                        alt='item'
                        fill
                        style={ { objectFit: "contain" } }
                    />
                </div>

                {/* details */ }
                <div className='mt-3 flex-1 truncate'>
                    Brand new shoe
                </div>
            </div>

            {/* price quantity and fevourite, remove buttons */ }
            <div className='w-full lg:w-3/5 h-20 lg:h-full flex sm:flex-row flex-col gap-3 sm:gap-0 items-start lg:justify-between md:justify-start justify-between'>
                <div className=' lg:w-1/2 md:w-1/3 w-full flex gap-3'>
                    <Dropdown />
                    <div className={ `font-rubik font-normal` }>
                        <div className='text-gray-800'>$200</div>
                        <div className='text-gray-400'>$100 / per item</div>
                    </div>
                </div>
                <div className='w-fit pr-5'>
                    <Button
                        text='Remove'
                        type='button'
                        className='uppercase border bg-stone-100 text-red-600 px-4 py-2 text-[12px] font-semibold rounded hover:bg-white hover:border-red-500'
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleCartItem;