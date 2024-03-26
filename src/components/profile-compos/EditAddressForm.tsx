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
                    <div className='flex gap-5 sm:flex-row flex-col'>
                        <InputCompo
                            name='full_name'
                            type='text'
                            isRequired
                            placeholder='Full name'
                            className='border py-2 px-4 focus:outline-appTheme-400 placeholder:text-zinc-400 rounded'
                            onChange={ onChange }
                            value={ full_name }
                        />
                        <InputCompo
                            name='phone_number'
                            type='tel'
                            isRequired
                            placeholder='Phone number'
                            className='border py-2 px-4 focus:outline-appTheme-400  placeholder:text-zinc-400 rounded'
                            onChange={ onChange }
                            value={ phone_number }
                            minLength={ 10 }
                            autoComplete='off'
                        />
                    </div>
                    <textarea
                        name="address"
                        placeholder='Address'
                        className='p-2 border placeholder:text-zinc-400 focus:outline-appTheme-400 rounded w-full lg:w-3/4 h-40'
                        onChange={ onChange }
                        value={ address }
                        required
                    />
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