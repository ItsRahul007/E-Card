import React, { FC } from 'react';
import style from "@/app/style/style.module.css";

const ReviewStar: FC = () => {
    return (
        <div className='flex flex-row-reverse w-[82px]'>
            <span className={ "text-xl text-gray-400 cursor-pointer " + style.review_star }>
                &#9733;
            </span>
            <span className={ "text-xl text-gray-400 cursor-pointer " + style.review_star }>
                &#9733;
            </span>
            <span className={ "text-xl text-gray-400 cursor-pointer " + style.review_star }>
                &#9733;
            </span>
            <span className={ "text-xl text-gray-400 cursor-pointer " + style.review_star }>
                &#9733;
            </span>
            <span className={ "text-xl text-gray-400 cursor-pointer " + style.review_star }>
                &#9733;
            </span>
        </div>
    )
}

export default ReviewStar;