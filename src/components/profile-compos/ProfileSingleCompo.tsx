"use client";

import React, { useState } from 'react'
import InputCompo from '../common/InputCompo';
import Button from '../common/buttons/Button';

interface I_ProfileSingleCompo {
    headingText: string;
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
    placeholder
}) => {
    const [isEditAble, setIsEditAble] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string | number>(givenInputValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onInputChange?.(e);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submited");
    };

    return (
        <div className='h-auto w-full flex flex-col gap-3'>
            <div className='flex gap-6 items-end'>
                <h3 className='text-base font-medium capitalize'>{ headingText }</h3>
                <span className='text-appTheme-700 cursor-pointer text-base font-medium select-none'
                    onClick={ () => setIsEditAble(!isEditAble) }
                >
                    { !isEditAble ? "Edit" : "Cancle" }
                </span>
            </div>
            <form className='flex gap-3 flex-col sm:flex-row' onSubmit={ onSubmit }>
                <InputCompo
                    name='name'
                    placeholder={ placeholder }
                    type={ inputType }
                    value={ inputValue }
                    className='border text-black py-3 px-4 rounded-sm font-normal read-only:bg-zinc-100 read-only:text-zinc-400 read-only:cursor-not-allowed focus:outline-appTheme-200'
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