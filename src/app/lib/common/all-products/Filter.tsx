import { Kanit, Nunito } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const kanit = Kanit({
  weight: "600",
  subsets: ["latin-ext"],
  style: 'italic'
});

const nunito = Nunito({
  weight: "600",
  subsets: ["latin-ext"]
});

const Filter = () => {
  return (    
    <div className='bg-[#F8F8F8] w-1/5 h-full overflow-scroll flex flex-col'>
      <div className={`h-1/5 w-full ${kanit.className}`}>
        <h3 className='text-4xl ml-4 mt-6'>Filters</h3>
      </div>
      <div className='w-full flex-1 flex flex-col items-center gap-10'>
        {/* filter by price */}
        <div className='w-[85%]'>
          <h5 className={'text-2xl mb-2 ' + nunito.className}>Filter by price</h5>
          <div className='flex gap-3'>
            <input type="number" className='w-24 h-10 outline-none border-0 border-b-2 border-black bg-transparent text-sm' min={1} />
            <input type="number" className='w-24 h-10 outline-none border-0 border-b-2 border-black bg-transparent text-sm' min={1} />
            <button className='text-xl ml-3 border-2 rounded-md px-2 hover:bg-gray-100'>
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>

        {/* categories */}
        <div className='w-[85%]'>
          <h5 className={'text-2xl mb-2 ' + nunito.className}>Categories</h5>
          <ul className='list-none text-base flex flex-col gap-3'>
            <li className='hover:text-sky-500 cursor-pointer'><Link href="#">For Men</Link></li>
            <li className='hover:text-sky-500 cursor-pointer'><Link href="#">For Women</Link></li>
            <li className='hover:text-sky-500 cursor-pointer'><Link href="#">Bracelet</Link></li>
            <li className='hover:text-sky-500 cursor-pointer'><Link href="#">Bag</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filter;