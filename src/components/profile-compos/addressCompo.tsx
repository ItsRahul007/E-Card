"use client";

import React, { FC, useCallback, useState } from 'react';
import EditAddressForm from './EditAddressForm';
import toast from 'react-hot-toast';
import { useSetAddresses, useGetAddresses } from '@/lib/customHook/useAddresses';
import { ErrorMessage, addressDeleteSuccessMessage, addressUpdateSuccessMessage } from '@/lib/util/toastMessages';
import { addressTypeInputValues } from '@/lib/types/addressTypes';

interface T_AddressCompo extends addressTypeInputValues {
    _id: string;
    noEditOption?: boolean;
}

const AddressCompo: FC<T_AddressCompo> = (props) => {
    const initialValues: T_AddressCompo = {
        full_name: '',
        phone_number: "",
        address: '',
        _id: props._id
    };

    const [isEditFormActive, setIsEditFormActive] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState<T_AddressCompo>(props);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({ ...prev, [name]: value }));
    };

    const { refetch } = useGetAddresses();
    const setAddress = useSetAddresses();

    const handleUpdate = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setAddress.mutate({ addresses: inputValues, method: "put" }, {
                onSuccess: () => {
                    refetch();
                    toast.success(addressUpdateSuccessMessage);
                    setIsEditFormActive(false);
                    setInputValues(initialValues);
                },
                onError: (error: any) => {
                    console.log(error);
                    toast.error(error.response.data.error || ErrorMessage);
                },
            });
        }, [inputValues]
    );

    const handleDelete = () => {
        setAddress.mutate({ addresses: inputValues, method: "delete" }, {
            onSuccess: () => {
                refetch();
                toast.success(addressDeleteSuccessMessage);
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error.response.data.error || ErrorMessage);
            },
        });
    }

    return (
        <>
            { !isEditFormActive ?
                <div className='h-auto w-full flex flex-col gap-2 px-6 py-5 text-zinc-800 relative'>
                    {/* three dots*/ }
                    { !props.noEditOption &&
                        <div className='absolute top-2 right-2 text-zinc-500 peer z-[1]'>
                            <i className="ri-more-2-fill text-xl"></i>
                        </div>
                    }

                    {/* options */ }
                    <div className='absolute top-2 right-2 p-3 peer-hover:!flex hover:!flex flex-col gap-2 rounded text-sm border shadow-md text-zinc-800 z-[2] hidden bg-white'>
                        <span
                            className='hover:text-blue-500 cursor-pointer'
                            onClick={ () => setIsEditFormActive(true) }
                        >
                            Edit
                        </span>
                        <span
                            className='hover:text-blue-500 cursor-pointer'
                            onClick={ handleDelete }
                        >
                            Delete
                        </span>
                    </div>

                    {/* address details */ }
                    <div className='flex gap-1.5 sm:gap-3 text-sm sm:text-base font-medium'>
                        <span className='capitalize'>{ props.full_name }</span>
                        <span>{ props.phone_number }</span>
                    </div>
                    <div className='text-xs sm:text-sm capitalize'>
                        { props.address }
                    </div>
                </div>
                :
                <EditAddressForm
                    onCancle={ () => setIsEditFormActive(false) }
                    inputValues={ inputValues }
                    onChange={ handleInputChange }
                    onSubmit={ handleUpdate }
                />
            }
        </>
    );
};

export default AddressCompo;