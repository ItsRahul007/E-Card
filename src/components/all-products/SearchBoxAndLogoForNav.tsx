'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputCompo from '../common/inputs/InputCompo';

const SearchBoxAndLogoForNav = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const router = useRouter();

    return (
        <span className='h-full xl:w-[30rem] min-[1281px]:flex hidden justify-end items-center gap-8'>
            <span className={ `text-3xl font-ubuntu font-bold` }>E-Card</span>
            <InputCompo
                type="text"
                name='navSearch'
                placeholder='Search products and brands'
                className='p-3 rounded-md text-sm outline-none text-[#222222] w-64 placeholder:font-sans font-sans border-0'
                onChange={ (e) => setInputValue(e.target.value) }
                value={ inputValue }
                onEnter={ () => {
                    if (inputValue.length) {
                        router.push("/products/search-products?search=" + inputValue.toLowerCase());
                    }
                } }
            />
        </span>
    )
}

export default SearchBoxAndLogoForNav;