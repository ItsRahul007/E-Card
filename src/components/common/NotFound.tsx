import React from 'react';
import Image from 'next/image';

interface I_NotFound {
    header: string;
}

const NotFound: React.FC<I_NotFound> = ({ header }) => {
    return (
        <div className='relative h-3/4 w-60 md:w-96 flex flex-col items-center justify-center gap-2 text-2xl md:text-3xl text-[#00bf85] mx-auto mt-5'>
            <p className="text-center font-bold font-ubuntu">{ header }</p>
            <span className='relative h-80 md:h-96 w-80 md:w-96'>
                <Image
                    src="/images/not-found.png"
                    alt={ header }
                    fill
                    style={ {
                        objectFit: "contain"
                    } }
                />
            </span>
        </div>
    )
}

export default NotFound