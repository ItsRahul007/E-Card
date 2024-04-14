"use client";

import AddressCompo from '@/components/profile-compos/addressCompo';
import { useGetAddresses } from '@/lib/customHook/useAddresses';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { ObjectId } from "mongodb";
import PageLoading from '@/components/common/loading/PageLoading';
import Image from 'next/image';
import classNames from '@/lib/util/classNames';
import { addressTypeInputValues } from '@/lib/types/addressTypes';

interface T_Addresses extends addressTypeInputValues {
    _id: ObjectId;
};

interface I_AddressListProps {
    onAddressClick?: ({
        full_name,
        phone_number,
        address
    }: addressTypeInputValues) => void;
}

const AddressList: FC<I_AddressListProps> = ({ onAddressClick }) => {
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
                                data.addresses.map((addressObj: T_Addresses) => {
                                    const { full_name, phone_number, address, _id } = addressObj;
                                    return (
                                        <li
                                            key={ JSON.stringify(_id) }
                                            className={ classNames(
                                                'h-auto w-full border rounded-md hover:border-indigo-500 duration-300',
                                                onAddressClick ? 'cursor-pointer' : ''
                                            ) }
                                            onClick={ () => {
                                                onAddressClick && onAddressClick({ full_name, phone_number, address });
                                            } }
                                        >
                                            <AddressCompo
                                                _id={ JSON.stringify(_id) }
                                                full_name={ full_name }
                                                phone_number={ phone_number }
                                                address={ address }
                                                noEditOption={ onAddressClick ? true : false }
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <div className='relative h-3/4 w-60 md:w-96 flex flex-col items-center justify-center gap-2 text-xl md:text-3xl text-[#00bf85] mx-auto'>
                            <p className="text-center font-bold font-ubuntu">No addresses found</p>
                            <span className='relative h-80 md:h-96 w-80 md:w-96'>
                                <Image
                                    src="/images/not-found.png"
                                    alt='No addresses found'
                                    fill
                                    style={ {
                                        objectFit: "contain"
                                    } }
                                />
                            </span>
                        </div>

            }
        </>
    )
}

export default AddressList;