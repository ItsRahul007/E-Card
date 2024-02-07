import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from "@/app/style/style.module.css";
import IconButton from '../buttons/IconButton';
import { rubik500 } from '@/lib/fonts/fonts';

interface I_ItemCard {
  primaryImgUrl: string;
  product_name: string;
  ratings: {
    ratingBy: string;
    ratingNumber: number;
    _id?: string;
  }[];
  _id: string;
  discount_percentage: number;
  current_price: number;
}

const ItemCard: React.FC<I_ItemCard> = (props) => {
  const {
    primaryImgUrl,
    product_name,
    _id,
    ratings,
    discount_percentage,
    current_price
  } = props;

  //? getting the total rating number
  let totalRatingNumber: number = 0;
  ratings.map(obj => {
    const prevTotal = totalRatingNumber;
    totalRatingNumber = prevTotal + obj.ratingNumber;
  })

  // Round the rating to the nearest half
  const rating: number = totalRatingNumber / ratings.length;
  const roundedRating = Math.round(rating * 2) / 2;

  // Function to generate star icons based on the rounded rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Determine the star color based on the current rating
      let starColorClass;

      if ((i - 1) + .5 === roundedRating) {
        starColorClass = `${style.half_star}`; // Half star
      } else if (i <= roundedRating) {
        starColorClass = 'text-[#35a3bc]'; // Full star
      } else {
        starColorClass = 'text-gray-400'; // Inactive star
      }

      stars.push(
        <span key={ i } className={ `text-lg max-[385px]:text-base ${starColorClass}` }>&#9733;</span>
      );
    }
    return stars;
  };

  return (
    <div
      className='border sm:h-72 min-[390px]:h-60 h-52 sm:w-52 min-[390px]:w-44 w-36 flex flex-col items-center gap-1 overflow-hidden rounded-md shadow bg-white cursor-pointer hover:translate-y-[-2px] col-span-1 duration-200'
    >
      <div className='group relative h-3/4 w-full'>
        <Link href={ `/single-product/${_id}` }>
          <Image
            src={ primaryImgUrl }
            alt="item"
            fill
            style={ {
              objectFit: "contain"
            } }
          />

          {/* discount percentage */ }
          <span
            className={ `absolute flex items-end justify-center h-12 md:h-[50px] w-[140px] left-[-40px] top-[-20px] text-sm md:text-base px-1 text-gray-50 bg-opacity-60 bg-green-500 ${rubik500.className}
              -rotate-45
          `}
          >
            <span className='pr-8'>{ discount_percentage }% off</span>
          </span>
        </Link>

        {/* desktop hover component */ }
        <span className='absolute text-slate-50 text-2xl bottom-0 group-hover:opacity-100 opacity-0 hidden xl:flex items-center justify-end w-full h-16 bg-gradient-to-t from-[#0000005e] to-transparent duration-300'>
          <div className='w-20 flex gap-3 h-full items-center'>
            <Link href="#"><i className="hover:text-white ri-shopping-cart-2-fill font-thin"></i></Link>
            <Link href="#"><i className="hover:text-white ri-heart-fill font-thin"></i></Link>
          </div>
        </span>

        {/* fevorite icon for mobile */ }
        <IconButton
          className='absolute top-1 right-1 text-base p-1 px-2 rounded-full text-gray-50 bg-opacity-70 bg-gray-400 cursor-pointer block xl:hidden'
          icon={ <i className="ri-heart-line"></i> }
          type='button'
        />
      </div>
      <div className='h-1/4 w-full flex flex-col items-center justify-start min-[390px]:gap-[2px]'>
        <div className='w-[96%] whitespace-nowrap overflow-hidden !text-ellipsis font-bold min-[390px]:mt-1 mt-[1px] min-[390px]:ml-6 ml-1 capitalize md:text-base text-sm'>
          { product_name }
        </div>
        <div className='w-[90%] text-base text-gray-700 ml-1 font-semibold flex items-center justify-between'>
          <span>${ current_price }</span>
          <span>
            { ratings.length > 0 ? generateStars() : <span className='text-xs text-[#0000007b]'>No Ratings</span> }
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;