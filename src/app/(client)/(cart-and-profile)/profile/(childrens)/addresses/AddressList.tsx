"use client";

import AddressCompo from '@/components/profile-compos/addressCompo';
import { useGetAddresses } from '@/lib/customHook/useAddresses';
import React from 'react';
import toast from 'react-hot-toast';
import { ObjectId } from "mongodb";
import PageLoading from '@/components/common/loading/PageLoading';

type T_Addresses = {
    full_name: string;
    phone_number: number;
    address: string;
    _id: ObjectId;
};

const AddressList = () => {
    //TODO: get addresses from backend using react query and use the new addresses route
    const {
        data,
        isLoading,
        error
    } = useGetAddresses();

    if ((!isLoading && data && !data.success) || error) {
        toast.error(data.error || "Something went wrong while fetching addresses");
        return <>Something went wrong</>;
    }

    return (
        <>
            {
                isLoading ?
                    <PageLoading /> :
                    data.addresses.length ?
                        <ul className='overflow-y-scroll h-auto w-full flex flex-col gap-2 list-none'>
                            {
                                data.addresses.map((address: T_Addresses) => (
                                    <li key={ JSON.stringify(address._id) } className='h-auto w-full border rounded-md'>
                                        <AddressCompo
                                            _id={ JSON.stringify(address._id) }
                                            full_name={ address.full_name }
                                            phone_number={ address.phone_number }
                                            address={ address.address }
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                        : "No addresses found"

            }
        </>
    )
}

export default AddressList;