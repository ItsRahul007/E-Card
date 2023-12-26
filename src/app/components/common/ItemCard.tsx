import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ItemCard: React.FC = () => {
  return (
    <div className='border h-[23rem] w-64 m-2 p-2 flex flex-col items-center gap-1 overflow-hidden rounded-md'>
      <div className='h-3/4 w-full'>
        <div className='relative h-3/4 w-full'>
          <Image
            src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg"
            alt="item"
            fill
            className='rounded-md'
          />
        </div>
        <div className='h-1/4 w-full flex flex-col items-center justify-start gap-1'>
          <span className='w-full whitespace-nowrap text-ellipsis font-semibold mt-1'>
            Shoes
          </span>
          <span className='w-full text-xl text-sky-600'>
            $200
          </span>
        </div>
      </div>
      <div className='h-1/4 w-[110%]'>
      <div className='w-full h-[1px] bg-slate-800' />
        <span className='h-full w-full ml-3 flex items-center font-semibold gap-3 text-[15px]'>
          <Link href="/home/kuchvi" className='bg-sky-600 hover:bg-sky-700 text-white p-2 px-3 rounded-md'>
            Buy now
          </Link>
          <Link href="/home/kuchvi" className='text-sky-600 hover:bg-sky-100 p-2 px-3 rounded-md'>
            Add to cart
          </Link>
        </span>
      </div>
    </div>
  )
}

export default ItemCard;