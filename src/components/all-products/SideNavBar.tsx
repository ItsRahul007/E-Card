"use client";

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import InputCompo from '../common/InputCompo';
import IconButton from '../common/buttons/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FilterByPrice from '../filters/FilterByPrice';
import LeftMenus from '../common/profile-components/LeftMenus';
import { T_SearchKeys } from '@/lib/types/productTyps';

interface I_ProductNav {
    filters?: boolean;
    profile?: boolean;
    name?: string;
    stopScrolling?: boolean;
    searchKeys?: T_SearchKeys[];
}

const SideNavBar: FC<I_ProductNav> = ({ filters, profile, name, stopScrolling, searchKeys }) => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const router = useRouter();

    const toggleScrolling = (enableScrolling: boolean) => {
        document.body.style.overflow = !enableScrolling ? 'auto' : 'hidden';
    }

    const closeSlider = () => {
        setIsNavOpen(false);
        stopScrolling && toggleScrolling(false);
    };

    useEffect(() => {
        if (isNavOpen && stopScrolling) {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isNavOpen]);


    return (
        <>
            {/* sub nav icon */ }
            <span
                className='h-full w-10 text-2xl min-[1281px]:hidden flex justify-start items-center ml-3 cursor-pointer'
                onClick={ () => {
                    setIsNavOpen(true);
                    stopScrolling && toggleScrolling(true);
                } }
            >
                <i className="ri-menu-2-line"></i>
            </span>

            {/* side bar component */ }
            <div className={ `h-screen w-screen absolute top-0 bottom-0 z-10 overflow-scroll flex 
                    ${isNavOpen ? "left-0 opacity-100" : "-left-[110vw] opacity-0"} ease-out duration-300
                `}
            >
                {/* main div that contains everything */ }
                <div
                    className="bg-slate-800 h-full w-full min-[426px]:w-[64%] overflow-y-scroll"
                >
                    {/* header */ }
                    <div className='w-full h-14 flex items-center justify-between'>
                        <h2 className={ `text-3xl ml-3 font-bold font-ubuntu` }>E-Card</h2>
                        <span
                            className='h-6 w-6 border-2 border-white mr-3 flex justify-center items-center rounded-md text-xl'
                            onClick={ closeSlider }
                        >
                            <i className="ri-close-fill"></i>
                        </span>
                    </div>

                    {/* search box */ }
                    <div className={ `h-20 w-full flex gap-3 items-center ${profile && "!hidden"}` }>
                        <InputCompo
                            type='text'
                            name='navSearch'
                            placeholder='Search products and brands'
                            className='h-10 rounded-md text-sm outline-none text-[#222222] w-60  placeholder:font-sans font-sans bg-slate-100 px-2 ml-3'
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value) }
                            value={ inputValue }
                        />
                        <IconButton
                            icon={ <i className="ri-search-line"></i> }
                            className='h-6 w-6 p-4 border-2 border-white flex justify-center items-center rounded-md text-lg'
                            type='button'
                            onClick={ () => {
                                if (inputValue.length) {
                                    router.push("/products/search-products?search=" + inputValue);
                                    closeSlider();
                                }
                            } }
                        />
                    </div>

                    {/* search keys */ }
                    <div className={ `w-full ${profile && "!hidden"}` }>
                        <div className='ml-3 flex flex-col gap-2'>
                            {
                                !searchKeys ?
                                    (
                                        <>
                                            <Link href="/products/search-products?search=shoes" onClick={ closeSlider }
                                            >
                                                Shoes
                                            </Link>
                                            <Link href="/products/search-products?search=eyeware" onClick={ closeSlider }
                                            >
                                                Eyeware
                                            </Link>
                                            <Link href="/products/search-products?search=electronics" onClick={ closeSlider }
                                            >
                                                Electronics
                                            </Link>
                                            <Link href="#" onClick={ closeSlider }
                                            >
                                                Become a Seller
                                            </Link>
                                        </>
                                    ) :
                                    searchKeys.map(({ label, link }) => (
                                        <Link
                                            key={ link + '-SideNavBar' }
                                            href={ link }
                                            onClick={ closeSlider }
                                            className='capitalize'
                                        >
                                            { label }
                                        </Link>
                                    ))
                            }
                        </div>
                    </div>

                    {/* filters */ }
                    { filters &&
                        <div className='w-full h-full mt-4 block lg:hidden'>
                            <div className='w-11/12 ml-3 flex flex-col gap-2'>
                                <div className={ `h-10 w-full font-medium font-kanit` }>
                                    <h3 className='text-4xl'>Filters</h3>
                                </div>

                                {/* filter by price */ }
                                <FilterByPrice />

                                {/* categories */ }
                                <div className='w-full mt-3'>
                                    <h5 className={ 'text-2xl mb-2 font-nunito' }>Categories</h5>
                                    <ul className='list-none text-base flex flex-col gap-3'>
                                        <li>
                                            <Link onClick={ closeSlider } href="/products/search-products?search=for men">
                                                For Men
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={ closeSlider } href="/products/search-products?search=for women">
                                                For Women
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={ closeSlider } href="/products/search-products?search=bracelet">
                                                Bracelet
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={ closeSlider } href="/products/search-products?search=bag">
                                                Bag
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    { profile &&
                        <div className='w-full h-auto mt-4 block lg:hidden select-none'>
                            <LeftMenus closeSlider={ closeSlider } isSlider name={ name } />
                        </div>
                    }
                </div>

                {/* blur div */ }
                <div
                    className='h-full w-[36%] backdrop-blur-[2px] hidden min-[426px]:block'
                    onClick={ closeSlider }
                >
                    <div className={ `h-full w-full bg-[#00000012] ease-out duration-300 ${isNavOpen ? "opacity-100" : "opacity-0 bg-transparent"}` } />
                </div>
            </div>
        </>
    )
}

export default SideNavBar;