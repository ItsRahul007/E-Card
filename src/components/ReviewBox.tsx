"use client";

import React, { FC, useState } from 'react'

interface I_ReviewBox {
    rating: number;
    reviewText: string;
};

const ReviewBox: FC<I_ReviewBox> = ({ rating, reviewText }) => {
    const [isFullText, setIsFullText] = useState<boolean>(false);

    function pikRatingText() {
        if (rating === 5) return "Absolutely awesome!"
        else if (rating === 4) return "Great product!"
        else if (rating === 3) return "Decent product!"
        else if (rating === 2) return "Not impressed"
        else if (rating === 1) return "Terrible"
    }

    return (
        <div className='w-11/12 ml-4 border-b pb-2'>
            {/* rating */ }
            <div className='h-10 w-full flex items-center justify-start'>
                <span className='h-5 w-[30px] bg-[#35a3bc] flex justify-center items-center text-white text-[13px] font-medium rounded'>
                    { rating } <span className='ml-[2px] mb-[1px]'>&#9733;</span>
                </span>
                <span className='text-sm ml-3 font-semibold mb-1 capitalize'>{ pikRatingText() }</span>
            </div>

            {/* review text */ }
            <div>
                <span>
                    { !isFullText ? reviewText.slice(0, 300) + "..." : reviewText }<span
                        className='cursor-pointer text-blue-600 uppercase block text-xs font-semibold mt-1'
                        onClick={ () => setIsFullText(!isFullText) }
                    >
                        { !isFullText && reviewText.length > 300 ? "read more" : [reviewText.length > 300 && "show less"] }
                    </span>
                </span>
            </div>
        </div>
    )
}

export default ReviewBox;