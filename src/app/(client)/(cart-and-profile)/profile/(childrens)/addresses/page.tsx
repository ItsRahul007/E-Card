import IconButton from '@/components/common/buttons/IconButton';
import AddressCompo from '@/components/profile-compos/addressCompo';
import React from 'react'
import AddNewAddress from './AddNewAddress';

const Addresses = async () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* heading with add address button */ }
            <AddNewAddress />

            {/* address list */ }
            <ul className='h-auto w-full flex flex-col gap-2 px-4 py-3 list-none'>
                <li className='h-auto w-full border rounded-md'>
                    <AddressCompo />
                </li>
                <li className='h-auto w-full border rounded-md'>
                    <AddressCompo />
                </li>
                <li className='h-auto w-full border rounded-md'>
                    <AddressCompo />
                </li>
            </ul>
        </div>
    );
};

export default Addresses;