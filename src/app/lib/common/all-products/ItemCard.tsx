import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from "@/app/style/style.module.css";

interface I_ItemCard {
  imgUrl: string;
  product_name: string;
  price: number | string;
  _id: string;
}

const ItemCard: React.FC<I_ItemCard> = (props) => {
  const { imgUrl, product_name, price, _id } = props;

  return (
    <div className='border h-64 w-52 flex flex-col items-center gap-1 overflow-hidden rounded-md shadow bg-white cursor-pointer hover:translate-y-[-2px]'>
      <div className={'relative h-3/4 w-full ' + style.itemImage}>
        <Link href={`/single-product/${_id}`}>
          <Image
            src={imgUrl}
            alt="item"
            fill
          // sizes='(max-width: 768px) 100vw, 33vw'
          />
        </Link>
        <span className={'absolute text-slate-50 text-2xl bottom-0 flex items-center justify-end w-full h-16 ' + style.hoverCompo}>
          <div className='w-20 flex gap-3 h-full items-center'>
            <Link href="#"><i className="hover:text-white ri-shopping-cart-2-fill font-thin"></i></Link>
            <Link href="#"><i className="hover:text-white ri-heart-fill font-thin"></i></Link>
          </div>
        </span>
      </div>
      <div className='h-1/4 w-full flex flex-col items-center gap-1'>
        <div className='w-full whitespace-nowrap text-ellipsis font-bold mt-1 ml-6'>
          {product_name}
        </div>
        <div className='w-full text-base text-gray-700 ml-6 font-semibold'>
          ${price}
        </div>
      </div>
    </div>
  )
}

export default ItemCard;