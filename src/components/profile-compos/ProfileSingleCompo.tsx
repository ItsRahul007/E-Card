"use client";

import React, { useCallback, useState } from 'react'
import InputCompo from '../common/InputCompo';
import Button from '../common/buttons/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ErrorMessage } from '@/lib/util/toastMessages';

interface I_ProfileSingleCompo {
    headingText: string;
    name: string;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string | number;
    inputType: string;
    placeholder: string;
}

const ProfileSingleCompo: React.FC<I_ProfileSingleCompo> = ({
    onInputChange,
    inputValue: givenInputValue,
    headingText,
    inputType,
    placeholder,
    name
}) => {
    const [isEditAble, setIsEditAble] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string | number>(givenInputValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onInputChange?.(e);
    };

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (inputValue === givenInputValue) {
                toast.error("Please change anything and submit");
                return;
            };

            try {
                toast.loading("Sending request");
                const response = await axios.put("/api/auth/login", { [name]: inputValue });
                console.log(response.data);
                toast.dismiss();
                toast.success(response.data.message);
            } catch (error: any) {
                console.log(error);
                toast.dismiss();
                toast.error(error.response.data.error || ErrorMessage);
            }
        }, [inputValue]
    );

    return (
        <div className='h-auto w-full flex flex-col gap-3'>
            <div className='w-fit flex justify-between gap-6 items-end'>
                <h3 className='text-sm text-zinc-400 font-medium capitalize'>{ headingText }</h3>
                <span className='text-appTheme-700 cursor-pointer text-base font-medium select-none'
                    onClick={ () => setIsEditAble(!isEditAble) }
                >
                    { !isEditAble ? "Edit" : "Cancle" }
                </span>
            </div>
            <form className='flex gap-3 flex-col sm:flex-row' onSubmit={ onSubmit }>
                <InputCompo
                    name={ name }
                    placeholder={ placeholder }
                    type={ inputType }
                    value={ inputValue }
                    className='border text-black py-3 px-4 rounded font-normal read-only:bg-zinc-100 read-only:text-zinc-400 read-only:cursor-not-allowed focus:outline-appTheme-200'
                    isReadOnly={ !isEditAble }
                    onChange={ onChange }
                    minLength={ inputType === "number" ? 10 : undefined }
                    isRequired
                />
                { isEditAble && <Button
                    type='submit'
                    text='Save'
                    className='bg-appTheme-500 text-white py-3 px-5 sm:py-3 sm:px-10 rounded-sm font-semibold uppercase max-sm:text-sm max-sm:w-fit'
                /> }
            </form>
        </div>
    )
}

export default ProfileSingleCompo;