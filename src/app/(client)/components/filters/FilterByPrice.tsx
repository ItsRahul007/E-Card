import React from 'react'
import InputCompo from '../common/InputCompo';
import { nunito } from '@/lib/fonts/fonts';
import IconButton from '../common/buttons/IconButton';

const FilterByPrice = () => {
    return (
        <div className='w-full lg:w-[85%]'>
            <h5 className={ 'mb-2 text-2xl ' + nunito.className }>Filter by price</h5>
            <div className='flex flex-col items-start gap-3'>
                <span className='flex flex-col gap-1'>
                    <InputCompo type='number' name='from' className='w-20 h-10 outline-none border-0 border-b-2 lg:border-black border-white bg-transparent text-sm' placeholder='From' />
                    <InputCompo type='number' name='to' className='w-20 h-10 outline-none border-0 border-b-2 lg:border-black border-white bg-transparent text-sm' placeholder='To' />
                </span>
                <IconButton
                    icon={ <i className="ri-search-line"></i> }
                    className='h-6 w-6 p-4 border-2 lg:border-black border-white flex justify-center items-center rounded-md text-lg'
                    type='button'
                />
            </div>
        </div>
    )
}

export default FilterByPrice;