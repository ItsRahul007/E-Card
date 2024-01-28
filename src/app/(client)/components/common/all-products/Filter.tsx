import Link from 'next/link';
import React from 'react';
import InputCompo from '../InputCompo';
import { kanit, nunito } from "@/lib/fonts/fonts"

const Filter: React.FC = () => {
  return (
    <div className='bg-[#F8F8F8] xl:w-64 w-48 h-full overflow-scroll lg:flex hidden flex-col'>
      <div className={ `h-1/5 w-full ${kanit.className}` }>
        <h3 className='text-4xl ml-4 mt-6'>Filters</h3>
      </div>
      <div className='w-full flex-1 flex flex-col items-center gap-10'>
        {/* filter by price */ }
        <div className='w-[85%]'>
          <h5 className={ 'mb-2 text-2xl ' + nunito.className }>Filter by price</h5>
          <div className='flex xl:flex-col 2xl:flex-row gap-9 2xl:items-center xl:items-start xl:gap-3'>
            <span className='flex flex-col gap-1'>
              <InputCompo type='number' name='from' className='w-20 h-10 outline-none border-0 border-b-2 border-black bg-transparent text-sm' />
              <InputCompo type='number' name='to' className='w-20 h-10 outline-none border-0 border-b-2 border-black bg-transparent text-sm' />
            </span>
            <button className='text-xl h-10 border-2 rounded-md px-2 hover:bg-gray-100'>
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>

        {/* categories */ }
        <div className='w-[85%]'>
          <h5 className={ 'text-2xl mb-2 ' + nunito.className }>Categories</h5>
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