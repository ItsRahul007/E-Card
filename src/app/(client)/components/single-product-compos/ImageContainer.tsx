"use client";

import IconButton from '@/app/(client)/components/common/buttons/IconButton';
import Image from 'next/image';
import React, { FC, useState } from 'react'
import SmallImageContainer from './SmallImageContainer';

interface I_ImageContainer {
    primaryImgUrl: string;
    product_type: string;
    secondaryImgUrls: string[];
}

const ImageContainer: FC<I_ImageContainer> = ({ primaryImgUrl, product_type, secondaryImgUrls }) => {
    const [currentImageUrl, setCurrentImageUrl] = useState<string>(primaryImgUrl);
    const allImages: string[] = [primaryImgUrl, ...secondaryImgUrls];

    return (
        <div className='h-full md:w-[28rem] flex'>
            <div className='h-3/4 w-full flex md:gap-4 gap-1'>
                {/* secondry images */ }
                <div className='h-80 w-20 sm:w-16 max-[400px]:h-60 max-[400px]:w-16 flex flex-col gap-1 items-center'>
                    {
                        allImages.map((imageUrl) => <SmallImageContainer
                            src={ imageUrl }
                            alt={ product_type }
                            key={ imageUrl }
                            onClick={ () => setCurrentImageUrl(imageUrl) }
                        />
                        )
                    }
                </div>

                {/* primary image or selected image */ }
                <div className='relative md:h-80 sm:h-72 sm:w-64 lg:w-4/6 w-72 overflow-hidden max-[400px]:h-60 max-[400px]:w-56'>
                    <Image
                        src={ currentImageUrl }
                        alt={ product_type }
                        fill
                        style={ { objectFit: 'contain', borderRadius: '10px' } }
                    />
                    <IconButton
                        className='absolute top-3 right-3 text-base p-1 px-2 rounded-full text-gray-50 bg-opacity-70 bg-gray-400 cursor-pointer'
                        icon={ <i className="ri-heart-line opacity-100"></i> }
                        type='button'
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageContainer;