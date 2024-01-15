"use client";

import { Kanit, Nunito, Ubuntu } from 'next/font/google';
import React, { FC, useState } from 'react';
import InputCompo from '../InputCompo';
import IconButton from '../IconButton';
import Link from 'next/link';

const ubuntu = Ubuntu({
    weight: "700",
    subsets: ["latin-ext",],
    style: 'italic'
});

const kanit = Kanit({
    weight: "500",
    subsets: ["latin-ext"],
    style: 'italic'
});

const nunito = Nunito({
    weight: "600",
    subsets: ["latin-ext"]
});

interface I_ProductNav {
    filters?: boolean;
}

const SideNavBar: FC<I_ProductNav> = ({ filters }) => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    return (
        <>
            {/* sub nav icon */}
            <span
                className='h-full w-10 text-2xl lg:hidden flex justify-start items-center ml-3 cursor-pointer'
                onClick={() => setIsNavOpen(true)}
            >
                <i className="ri-menu-2-line"></i>
            </span>

            {/* side bar component */}
            <div
                className={`bg-slate-800 h-screen w-screen absolute top-0 z-10 overflow-scroll 
                    ${isNavOpen ? "left-0 opacity-100" : "-left-[110vw] opacity-0"} duration-500
                `}
            >
                {/* header */}
                <div className='w-full h-14 flex items-center justify-between'>
                    <h2 className={`text-3xl ml-3 ${ubuntu.className}`}>E-Card</h2>
                    <span
                        className='h-6 w-6 border-2 border-white mr-3 flex justify-center items-center rounded-md text-xl'
                        onClick={() => setIsNavOpen(false)}
                    >
                        <i className="ri-close-fill"></i>
                    </span>
                </div>

                {/* search box */}
                <div className='h-20 w-full flex gap-3 items-center'>
                    <InputCompo
                        type='text'
                        name='navSearch'
                        placeholder='Search products and brands'
                        className='h-10 rounded-md text-sm outline-none text-[#222222] w-60 placeholder:font-sans font-sans bg-slate-100 px-2 ml-3'
                    />
                    <IconButton
                        icon={<i className="ri-search-line"></i>}
                        className='h-6 w-6 p-4 border-2 border-white flex justify-center items-center rounded-md text-lg'
                        type='button'
                    />
                </div>

                {/* search keys */}
                <div className='w-full'>
                    <div className='ml-3 flex flex-col gap-2'>
                        <Link href="/home/search?search=shoes" className='cursor-pointer'>Shoes</Link>
                        <Link href="/home/search?search=eyeware" className='cursor-pointer'>Eyeware</Link>
                        <Link href="/home/search?search=electronics" className='cursor-pointer'>Electronics</Link>
                        <Link href="/home" className='cursor-pointer'>Become a Seller</Link>
                    </div>
                </div>

                {/* filters */}
                <div className={`w-full h-full mt-4 ${filters ? "block" : "hidden"}`}>
                    <div className='w-full ml-3 flex flex-col gap-2'>
                        <div className={`h-10 w-full ${kanit.className}`}>
                            <h3 className='text-4xl'>Filters</h3>
                        </div>

                        {/* filter by price */}
                        <div className='w-full'>
                            <span className={'text-xl ' + nunito.className}>Filter by price</span>
                            <div className='flex flex-col items-start gap-3'>
                                <span className='flex flex-col gap-1'>
                                    <InputCompo type='number' name='from' className='w-20 h-10 outline-none border-0 border-b-2 border-white bg-transparent text-sm' />
                                    <InputCompo type='number' name='to' className='w-20 h-10 outline-none border-0 border-b-2 border-white bg-transparent text-sm' />
                                </span>
                                <button className='text-xl h-10 border-2 rounded-md px-2 hover:bg-gray-100'>
                                    <i className="ri-search-line"></i>
                                </button>
                            </div>
                        </div>

                        {/* categories */}
                        <div className='w-full mt-3'>
                            <h5 className={'text-2xl mb-2 ' + nunito.className}>Categories</h5>
                            <ul className='list-none text-base flex flex-col gap-3'>
                                <li className='hover:text-sky-500 cursor-pointer'><Link href="#">For Men</Link></li>
                                <li className='hover:text-sky-500 cursor-pointer'><Link href="#">For Women</Link></li>
                                <li className='hover:text-sky-500 cursor-pointer'><Link href="#">Bracelet</Link></li>
                                <li className='hover:text-sky-500 cursor-pointer'><Link href="#">Bag</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNavBar;