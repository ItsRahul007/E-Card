import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

type ReviewObj = {
    primaryImgUrl: string;
    ratingNumber: number;
    comment: string;
    productId: string;
}

const ReviewTR: FC<ReviewObj> = ({ comment, primaryImgUrl, productId, ratingNumber }) => {
    return (
        <tr className='hover:bg-appTheme-50 hover:text-appTheme-700'>
            <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">
                <Link href={ `/single-product/${productId}` } className='mx-auto'>
                    <Image
                        src={ primaryImgUrl }
                        alt='Product Image'
                        height={ 10 }
                        width={ 50 }
                        style={ {
                            objectFit: "contain"
                        } }
                    />
                </Link>
            </td>
            <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">{ ratingNumber } out of 5</td>
            <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">{ comment }</td>
        </tr>
    );
};

export default ReviewTR