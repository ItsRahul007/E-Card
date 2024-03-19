"use client";

import IconButton from '@/components/common/buttons/IconButton';
import EditAddressForm from '@/components/profile-compos/EditAddressForm';
import React, { FC, useState } from 'react'

const AddNewAddress: FC = () => {
    const [isEditFormActive, setIsEditFormActive] = useState<boolean>(false);

    return (
        <>
            { !isEditFormActive ?
                <div
                    className='h-auto w-full flex flex-col gap-5 px-4 py-3'
                    onClick={ () => setIsEditFormActive(true) }
                >
                    <h3 className='text-lg font-semibold'>Manage Addresses</h3>
                    <IconButton
                        type='button'
                        icon={ <span className='text-2xl'>+</span> }
                        text='Add a new Address'
                        iconFirst
                        className='text-blue-500 py-3 border hover:border-blue-500 rounded-md w-full flex justify-start items-center gap-4 px-6 capitalize font-semibold'
                    />
                </div>
                :
                <EditAddressForm onCancle={ () => setIsEditFormActive(false) } />
            }
        </>
    )
}

export default AddNewAddress;