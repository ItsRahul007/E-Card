import IconButton from '@/components/common/buttons/IconButton';
import AddressCompo from '@/components/profile-compos/addressCompo';
import React from 'react'

const Addresses = async () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* heading with add address button */ }
            <div className='h-auto w-full flex flex-col gap-5 px-4 py-3'>
                <h3 className='text-lg font-semibold'>Manage Addresses</h3>
                <IconButton
                    type='button'
                    icon={ <span className='text-2xl'>+</span> }
                    text='Add a new Address'
                    iconFirst
                    className='text-blue-500 py-3 border hover:border-blue-500 rounded-md w-full flex justify-start items-center gap-4 px-6 capitalize font-semibold'
                />
            </div>

            {/* address list */ }
            <ul className='h-auto w-full flex flex-col gap-2 px-4 py-3 list-none'>
                <li className='h-auto w-full px-2 py-3 border rounded-md'>
                    <AddressCompo />
                </li>
                <li className='h-auto w-full px-2 py-3 border rounded-md'>
                    <AddressCompo />
                </li>
                <li className='h-auto w-full px-2 py-3 border rounded-md'>
                    <AddressCompo />
                </li>
            </ul>
        </div>
    );
};

export default Addresses;