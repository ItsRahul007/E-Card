"use client";

import React, { FC, useEffect, useState } from 'react';
import InputCompo from '../common/InputCompo';
import Link from 'next/link';
import toast from 'react-hot-toast';

type filterState = {
    from: string | number;
    to: string | number;
}

const FilterByPrice: FC<{ search?: string | undefined }> = ({ search }) => {
    const [filterprice, setFilterprice] = useState<filterState>({
        from: "",
        to: "",
    });
    const [url, setUrl] = useState<string>("#");

    useEffect(() => {
        const { from, to } = filterprice;
        if (from && to && Number(to) > Number(from)) {
            setUrl(`/products/search-products?${search ? `search=${search}&` : ""}${`price=from ${filterprice.from} to ${filterprice.to}`}`);
        }
        else {
            setUrl("#");
        };
    }, [filterprice, search]);

    function showProblemInNotification() {
        const { from, to } = filterprice;
        if (!from || !to) {
            toast.error("Please give a price");
        }
        else if (Number(to) < Number(from)) {
            toast.error("From price should be less than to price");
        }
    };

    return (
        <div className='w-full lg:w-[85%]'>
            <h5 className={ 'mb-2 text-2xl font-semibold font-nunito' }>Filter by price</h5>
            <div className='flex flex-col items-start gap-3'>
                <span className='flex flex-col gap-1'>
                    <InputCompo
                        type='number'
                        name='from'
                        className='w-20 h-10 outline-none border-0 border-b-2 lg:border-black border-white bg-transparent text-sm' placeholder='From'
                        value={ filterprice.from }
                        onChange={ (e) => setFilterprice(prev => ({ ...prev, from: e.target.value })) }
                    />
                    <InputCompo
                        type='number'
                        name='to'
                        className='w-20 h-10 outline-none border-0 border-b-2 lg:border-black border-white bg-transparent text-sm'
                        placeholder='To'
                        value={ filterprice.to }
                        onChange={ (e) => setFilterprice(prev => ({ ...prev, to: e.target.value })) }
                    />
                </span>
                <Link
                    className='h-6 w-6 p-4 border-2 lg:border-black border-white flex justify-center items-center rounded-md text-lg'
                    type='submit'
                    href={ url }
                    onClick={ showProblemInNotification }
                >
                    <i className="ri-search-line"></i>
                </Link>
            </div>
        </div>
    )
}

export default FilterByPrice;