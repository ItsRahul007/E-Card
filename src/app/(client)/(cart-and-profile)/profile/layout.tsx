import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/all-products/Nav';
import profileImage from "/public/images/profile-pic.png";
import { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/lib/model/usersSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';

export const metadata: Metadata = {
    title: 'E-Card - Profile',
    description: 'An E-Commerce web app where user can buy any product or they can add any product to their persional card and also they can list any of their fevorite item or product to their fevorite card.'
}

type I_JwtVerifyDataType = {
    user: {
        id: String
    },
    iat: number | string
}

export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const allCookies = cookies();
    const authToken = allCookies.get('authToken');
    const data = jwt.verify(authToken?.value!, process.env.JWT_SECRET!) as I_JwtVerifyDataType;

    await connectWithMongo();
    const { name } = await User.findById(data.user.id).select('name');
    if (!name) throw new Error('Something went wrong please try again');

    return (
        <main className='h-screen w-screen flex flex-col overflow-y-scroll bg-gray-100 font-inter'>
            {/* nav bar */ }
            <Navbar profile />
            <div className='flex-1 flex justify-center items-center'>
                <div className='h-full w-full md:w-11/12 flex gap-3 justify-center p-2'>
                    {/* left component */ }
                    <div className='h-11/12 lg:flex flex-col gap-3 w-1/4 hidden'>
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
                                <div className='text-sm'>Hello,</div>
                                <div className='font-semibold truncate text-base text-appTheme-600'>{ name }</div>
                            </div>
                        </div>

                        {/* list component */ }
                        <div className='flex-1 shadow-sm border flex flex-col bg-white'>
                            {/* my orders */ }
                            <Link href="/profile/orders" className='py-5 border-b text-base uppercase flex justify-between items-center cursor-pointer text-zinc-500'>
                                <span>
                                    <i className="ri-shopping-bag-3-fill text-xl text-appTheme-600 px-3"></i>
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
                                        <span className='text-xl text-appTheme-600 px-3'>
                                            <i className="ri-user-3-fill"></i>
                                        </span>
                                        <span className='font-medium text-base'>account settings</span>
                                    </h3>
                                </div>
                                <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                    <Link href="/profile/" className='cursor-pointer py-2 hover:bg-appTheme-50 hover:text-appTheme-700 w-full text-sm'>
                                        <span className='pl-7'>profile information</span>
                                    </Link>
                                    <Link href="/profile/addresses" className='cursor-pointer py-2 hover:bg-appTheme-50 hover:text-appTheme-700 w-full text-sm'>
                                        <span className='pl-7'>Manage Addresses</span>
                                    </Link>
                                </div>
                            </div>

                            {/* my stuff */ }
                            <div className='h-auto w-full border-b'>
                                <div>
                                    <h3 className='uppercase  text-zinc-500 py-3 flex items-center'>
                                        <span className='text-2xl text-appTheme-600 px-3'>
                                            <i className="ri-folder-user-fill"></i>
                                        </span>
                                        <span className='font-medium'>my stuff</span>
                                    </h3>
                                </div>
                                <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                                    <Link href="/profile/coupons" className='cursor-pointer py-2 hover:bg-appTheme-50 hover:text-appTheme-700 w-full text-sm'>
                                        <span className='pl-7'>My coupons</span>
                                    </Link>
                                    <Link href="/profile/review" className='cursor-pointer py-2 hover:bg-appTheme-50 hover:text-appTheme-700 w-full text-sm'>
                                        <span className='pl-7'>My ratings & review</span>
                                    </Link>
                                </div>
                            </div>

                            {/* logout */ }
                            <div className='h-auto w-full border-b cursor-pointer group'>
                                {/* <div> */ }
                                <h3 className='uppercase flex items-center text-zinc-500 py-3'>
                                    <span className='text-xl text-appTheme-600 px-3'>
                                        <i className="ri-login-circle-fill"></i>
                                    </span>
                                    <span className='font-medium text-base group-hover:text-appTheme-700'>Logout</span>
                                </h3>
                                {/* </div> */ }
                            </div>
                        </div>
                    </div>

                    {/* right component */ }
                    <div className='min-h-11/12 flex flex-col gap-2 border w-screen lg:w-3/4 shadow-sm sm:p-4 bg-white'>
                        { children }
                    </div>
                </div>
            </div>
        </main>
    )
}
