import Link from 'next/link';
import React from 'react';
import InputCompo from '../common/InputCompo';
import { kanit, nunito } from "@/lib/fonts/fonts"
import FilterByPrice from './FilterByPrice';

const Filter: React.FC = () => {
  return (
    <div className='bg-[#F8F8F8] xl:w-64 w-48 h-full overflow-scroll lg:flex hidden flex-col'>
      <div className={ `h-1/5 w-full ${kanit.className}` }>
        <h3 className='text-4xl ml-4 mt-6'>Filters</h3>
      </div>
      <div className='w-full flex-1 flex flex-col items-center gap-10'>
        {/* filter by price */ }
        <FilterByPrice />

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