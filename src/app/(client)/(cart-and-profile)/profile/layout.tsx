import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/all-products/Nav';
import profileImage from "/public/images/profile-pic.png";
import { ReactNode } from 'react';
import Link from 'next/link';
import { headers } from "next/headers";
import { NextRequest } from 'next/server';

export const metadata: Metadata = {
    title: 'E-Card - Profile',
    description: 'An E-Commerce web app where user can buy any product or they can add any product to their persional card and also they can list any of their fevorite item or product to their fevorite card.'
}

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className='h-screen w-screen flex flex-col overflow-y-scroll bg-gray-100'>
            <Navbar />
            <div className='flex-1 flex justify-center items-center'>
                <div className='h-full w-full md:w-11/12 flex gap-3 justify-center p-2'>
                    {/* left component */ }
                    <div className='h-11/12 flex flex-col gap-3 w-1/4'>
                        {/* profile component */ }
                        <div className='flex gap-2 w-full h-20 bg-white border rounded shadow-sm'>
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
                                <div className='text-xs'>Hello,</div>
                                <div className='font-semibold truncate text-base'>Rahul Ghosh</div>
                            </div>
                        </div>

                        {/* list component */ }
                        <div className='flex-1 shadow-sm border flex flex-col bg-white'>
                            {/* my orders */ }
                            <Link href="/profile/orders" className='py-5 border-b text-base uppercase flex justify-between items-center cursor-pointer text-zinc-500'>
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
                                    <h3 className='uppercase  text-zinc-500 py-3 flex items-center'>
                                        <span className='text-xl text-blue-500 px-3'>
                                            <i className="ri-user-3-fill"></i>
                                        </span>
                                        <span className='font-medium text-base'>account settings</span>
                                    </h3>
                                </div>
                                <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                    <Link href="/profile/" className='cursor-pointer py-2 hover:bg-blue-50 hover:text-blue-500 w-full'>
                                        <span className='pl-7'>profile information</span>
                                    </Link>
                                    <Link href="/profile/addresses" className='cursor-pointer py-2 hover:bg-blue-50 hover:text-blue-500 w-full'>
                                        <span className='pl-7'>Manage Addresses</span>
                                    </Link>
                                </div>
                            </div>

                            {/* my stuff */ }
                            <div className='h-auto w-full border-b'>
                                <div>
                                    <h3 className='uppercase  text-zinc-500 py-3 flex items-center'>
                                        <span className='text-2xl text-blue-500 px-3'>
                                            <i className="ri-folder-user-fill"></i>
                                        </span>
                                        <span className='font-medium'>my stuff</span>
                                    </h3>
                                </div>
                                <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                    <Link href="/profile/coupons" className='cursor-pointer py-2 hover:bg-blue-50 hover:text-blue-500 w-full'>
                                        <span className='pl-7'>My coupons</span>
                                    </Link>
                                    <Link href="/profile/review" className='cursor-pointer py-2 hover:bg-blue-50 hover:text-blue-500 w-full'>
                                        <span className='pl-7'>My review & ratings</span>
                                    </Link>
                                </div>
                            </div>

                            {/* logout */ }
                            <div className='h-auto w-full border-b cursor-pointer group'>
                                {/* <div> */ }
                                <h3 className='uppercase flex items-center text-zinc-500 py-3'>
                                    <span className='text-xl text-blue-600 px-3'>
                                        <i className="ri-shut-down-line"></i>
                                    </span>
                                    <span className='font-medium text-base group-hover:text-blue-600'>Logout</span>
                                </h3>
                                {/* </div> */ }
                            </div>
                        </div>
                    </div>

                    {/* right component */ }
                    <div className='min-h-11/12 flex flex-col gap-2 border w-3/4 shadow-sm p-4 bg-white'>
                        { children }
                    </div>
                </div>
            </div>
        </main>
    )
}
