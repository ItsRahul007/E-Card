import React from 'react';
import AddNewAddress from './AddNewAddress';
import AddressList from './AddressList';

const Addresses = async () => {
    return (
        <div className='flex flex-col gap-4 sm:px-4 px-2 sm:py-3 py-2'>
            {/* heading with add address button */ }
            <AddNewAddress />

            {/* address list */ }
            <AddressList />
        </div>
    );
};

export default Addresses;