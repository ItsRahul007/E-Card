"use client";

import React, { FC } from 'react';
import InputCompo from '@/components/common/InputCompo';
import Button from '@/components/common/buttons/Button';

interface I_EditAddressForm {
    onCancle: () => void;
}

const EditAddressForm: FC<I_EditAddressForm> = ({ onCancle }) => {
    return (
        <div className='min-h-[24rem] h-auto w-full bg-blue-50'>
            <div className='h-full w-full md:w-5/6 flex flex-col items-center justify-center self-start sm:py-3 sm:px-4 p-2'>
                <div className='flex justify-start items-start text-start w-full uppercase font-medium text-sm mb-4'>
                    <p className='text-blue-500 font-semibold'>Edit Address</p>
                </div>
                {/* Form */ }
                <form className='w-full flex flex-col items-start justify-start gap-4 text-zinc-800'>
                    <div className='flex gap-5 sm:flex-row flex-col'>
                        <InputCompo
                            name='full_name'
                            type='text'
                            isRequired
                            placeholder='Full name'
                            className='border py-2 px-4 focus:outline-blue-400 placeholder:text-zinc-400 rounded'
                        />
                        <InputCompo
                            name='phone_number'
                            type='number'
                            isRequired
                            placeholder='Phone number'
                            className='border py-2 px-4 focus:outline-blue-400  placeholder:text-zinc-400 rounded'
                        />
                    </div>
                    <textarea
                        name="address"
                        placeholder='Address'
                        className='p-2 border placeholder:text-zinc-400 focus:outline-blue-400 rounded w-full lg:w-3/4 h-40'
                    />
                    <div className='flex sm:flex-row flex-col gap-3 sm:gap-5 mt-5'>
                        <Button
                            type='submit'
                            text='save'
                            className='px-14 py-3 rounded-sm bg-blue-500 text-white uppercase text-sm sm:text-base'
                        />
                        <Button
                            type='reset'
                            text='cancel'
                            onClick={ onCancle }
                            className='px-5 py-3 rounded-sm bg-transparent text-blue-500 uppercase text-sm sm:text-base font-medium'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAddressForm;