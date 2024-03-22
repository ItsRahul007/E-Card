"use client";

import IconButton from '@/components/common/buttons/IconButton';
import EditAddressForm from '@/components/profile-compos/EditAddressForm';
import React, { FC, useState } from 'react'

const AddNewAddress: FC = () => {
    const [isEditFormActive, setIsEditFormActive] = useState<boolean>(false);

    return (
        <div className='h-auto w-full flex flex-col gap-5'>
            <h3 className='text-lg font-semibold text-appTheme-600'>Manage Addresses</h3>
            { !isEditFormActive ?
                <IconButton
                    type='button'
                    icon={ <span className='text-2xl'>+</span> }
                    text='Add a new Address'
                    iconFirst
                    className='text-appTheme-600 py-3 border hover:border-appTheme-500 rounded-md w-full flex justify-start items-center gap-4 px-6 capitalize font-semibold'
                    onClick={ () => setIsEditFormActive(true) }
                />
                :
                <span className='border rounded w-full'>
                    <EditAddressForm onCancle={ () => setIsEditFormActive(false) } />
                </span>
            }
        </div>
    )
}

export default AddNewAddress;