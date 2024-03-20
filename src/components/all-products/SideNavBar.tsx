"use client";

import React, { ChangeEvent, FC, useState } from 'react';
import InputCompo from '../common/InputCompo';
import IconButton from '../common/buttons/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FilterByPrice from '../filters/FilterByPrice';
import Image from 'next/image';
import profileImage from "/public/images/profile-pic.png";

interface I_ProductNav {
    filters?: boolean;
    profile?: boolean;
}

const SideNavBar: FC<I_ProductNav> = ({ filters, profile }) => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const router = useRouter();

    const closeSlider = () => {
        setIsNavOpen(false)
    }

    return (
        <>
            {/* sub nav icon */ }
            <span
                className='h-full w-10 text-2xl min-[1281px]:hidden flex justify-start items-center ml-3 cursor-pointer'
                onClick={ () => setIsNavOpen(true) }
            >
                <i className="ri-menu-2-line"></i>
            </span>

            {/* side bar component */ }
            <div className={ `h-screen w-screen absolute top-0 z-10 overflow-scroll flex 
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
                        <div className='w-full h-full mt-4 block lg:hidden'>
                            <div className='h-auto w-[95%] sm:w-3/4 flex flex-col gap-3 lg:hidden mx-auto'>
                                {/* profile component */ }
                                <div className='flex gap-2 w-full h-20 bg-slate-800 border rounded shadow-sm'>
                                    {/* image */ }
                                    <div className='w-20 h-full flex items-center justify-center'>
                                        <Image
                                            src={ profileImage }
                                            alt='profile'
                                            width={ 50 }
                                            height={ 50 }
                                            placeholder='blur'
                                            blurDataURL="/public/images/profile-pic.png"
                                        />
                                    </div>
                                    <div className='flex-1 flex justify-center items-start flex-col '>
                                        <div className='text-sm'>Hello,</div>
                                        <div className='font-semibold truncate text-base'>Rahul Ghosh</div>
                                    </div>
                                </div>

                                {/* list component */ }
                                <div className='shadow-sm flex flex-col bg-slate-800'>
                                    {/* my orders */ }
                                    <Link onClick={ closeSlider } href="/profile/orders" className='py-5 border-b text-base uppercase flex justify-between items-center cursor-pointer text-slate-100'>
                                        <span>
                                            <i className="ri-shopping-bag-3-fill text-xl text-blue-500 px-3"></i>
                                            <span className='font-medium text-base'>My Orders</span>
                                        </span>
                                        <span>
                                            <i className="ri-arrow-right-s-line font-medium text-2xl pr-3"></i>
                                        </span>
                                    </Link>

                                    {/* account settings */ }
                                    <div className='h-auto w-full border-b'>
                                        <div>
                                            <h3 className='uppercase  text-slate-100 py-3 flex items-center'>
                                                <span className='text-xl text-blue-500 px-3'>
                                                    <i className="ri-user-3-fill"></i>
                                                </span>
                                                <span className='font-medium text-base'>account settings</span>
                                            </h3>
                                        </div>
                                        <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                            <Link onClick={ closeSlider } href="/profile/" className='cursor-pointer py-2 hover:text-blue-500 w-full text-sm'>
                                                <span className='pl-7'>profile information</span>
                                            </Link>
                                            <Link onClick={ closeSlider } href="/profile/addresses" className='cursor-pointer py-2 hover:text-blue-500 w-full text-sm'>
                                                <span className='pl-7'>Manage Addresses</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* my stuff */ }
                                    <div className='h-auto w-full border-b'>
                                        <div>
                                            <h3 className='uppercase  text-slate-100 py-3 flex items-center'>
                                                <span className='text-2xl text-blue-500 px-3'>
                                                    <i className="ri-folder-user-fill"></i>
                                                </span>
                                                <span className='font-medium'>my stuff</span>
                                            </h3>
                                        </div>
                                        <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                            <Link onClick={ closeSlider } href="/profile/coupons" className='cursor-pointer py-2 hover:text-blue-500 w-full text-sm'>
                                                <span className='pl-7'>My coupons</span>
                                            </Link>
                                            <Link onClick={ closeSlider } href="/profile/review" className='cursor-pointer py-2 hover:text-blue-500 w-full text-sm'>
                                                <span className='pl-7'>My review & ratings</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* logout */ }
                                    <div className='h-auto w-full cursor-pointer group'>
                                        {/* <div> */ }
                                        <h3 className='uppercase flex items-center text-slate-100 py-3'>
                                            <span className='text-xl text-blue-600 px-3'>
                                                <i className="ri-shut-down-line"></i>
                                            </span>
                                            <span className='font-medium text-base group-hover:text-blue-600'>Logout</span>
                                        </h3>
                                        {/* </div> */ }
                                    </div>
                                </div>
                            </div>
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