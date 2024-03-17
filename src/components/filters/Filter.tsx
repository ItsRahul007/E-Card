import Link from 'next/link';
import React from 'react';
import { kanit, nunito } from "@/lib/fonts/fonts"
import FilterByPrice from './FilterByPrice';

const Filter: React.FC<{ search: string | undefined }> = ({ search }) => {
  return (
    <div className='bg-[#F8F8F8] xl:w-64 w-48 h-full overflow-scroll lg:flex hidden flex-col'>
      <div className={ `h-1/5 w-full ${kanit.className}` }>
        <h3 className='text-4xl ml-4 mt-6 font-medium'>Filters</h3>
      </div>
      <div className='w-full flex-1 flex flex-col items-center gap-10'>
        {/* filter by price */ }
        <FilterByPrice search={ search } />

        {/* categories */ }
        <div className='w-[85%]'>
          <h5 className={ 'text-2xl mb-2 ' + nunito.className }>Categories</h5>
          <ul className='list-none text-base flex flex-col gap-3'>
            <li>
              <Link className='hover:text-sky-500 cursor-pointer' href="/products/search-products?search=for men">For Men</Link>
            </li>
            <li>
              <Link className='hover:text-sky-500 cursor-pointer' href="/products/search-products?search=for women">For Women</Link>
            </li>
            <li>
              <Link className='hover:text-sky-500 cursor-pointer' href="/products/search-products?search=bracelet">Bracelet</Link>
            </li>
            <li>
              <Link className='hover:text-sky-500 cursor-pointer' href="/products/search-products?search=bag">Bag</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filter;