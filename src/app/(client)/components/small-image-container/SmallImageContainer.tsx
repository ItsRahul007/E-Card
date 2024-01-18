"use client";

import Image from 'next/image';
import React, { FC } from 'react'

interface I_SmallImageContainer {
    src: string;
    alt: string;
    onClick?: () => void;
}

const SmallImageContainer: FC<I_SmallImageContainer> = ({ src, alt, onClick }) => {
    return (
        <button
            className='h-20 w-16 max-[385px]:h-16 max-[385px]:w-14 rounded relative border-2 overflow-hidden'
            onClick={ onClick }
        >
            <Image
                src={ src }
                alt={ alt }
                fill
            />
        </button>
    );
};

export default SmallImageContainer;