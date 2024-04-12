"use client";

import React, { FC } from 'react';
import InputCompo from '@/components/common/InputCompo';
import Button from '@/components/common/buttons/Button';

type T_InputValues = {
    full_name: string;
    phone_number: number | string;
    address: string;
}

interface I_EditAddressForm {
    onCancle: () => void;
    inputValues: T_InputValues;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditAddressForm: FC<I_EditAddressForm> = ({ onCancle, inputValues, onChange, onSubmit }) => {
    const { full_name, phone_number, address } = inputValues;

    return (
        <div className='min-h-[24rem] h-auto w-full bg-appTheme-50'>
            <div className='h-full w-full md:w-5/6 flex flex-col items-center justify-center self-start sm:py-3 sm:px-4 p-2'>
                <div className='flex justify-start items-start text-start w-full uppercase font-medium text-sm mb-4'>
                    <p className='text-appTheme-600 font-semibold'>Edit Address</p>
                </div>
                {/* Form */ }
                <form
                    className='w-full flex flex-col items-start justify-start gap-4 text-zinc-800'
                    onSubmit={ onSubmit }
                >
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium ">
                                Full name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={ onChange }
                                    value={ full_name }
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium ">
                                Phone number
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={ onChange }
                                    value={ phone_number }
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium ">
                                Address
                            </label>
                            <div className="mt-1">
                                <textarea
                                    name="address"
                                    id="address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={ onChange }
                                    value={ address }
                                />
                            </div>
                        </div>

                    </div>
                    <div className='flex sm:flex-row flex-col gap-3 sm:gap-5 mt-5'>
                        <Button
                            type='submit'
                            text='save'
                            className='px-14 py-3 rounded-sm bg-appTheme-500 text-white uppercase text-sm sm:text-base'
                        />
                        <Button
                            type='reset'
                            text='cancel'
                            onClick={ onCancle }
                            className='px-5 py-3 rounded-sm bg-transparent text-appTheme-500 uppercase text-sm sm:text-base font-medium'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAddressForm;