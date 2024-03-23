import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import profileImage from "/public/images/profile-pic.png";
import classNames from '@/lib/util/classNames';

interface I_LeftMenus {
    closeSlider: () => void;
    isSlider?: boolean;
    name?: string;
};

const LeftMenus: React.FC<I_LeftMenus> = ({ closeSlider, isSlider, name }) => {
    return (
        <div
            className={ classNames(
                isSlider ? 'h-auto w-[95%] sm:w-3/4 flex flex-col gap-3 lg:hidden mx-auto'
                    : 'h-11/12 lg:flex flex-col gap-3 w-1/4 hidden'
            ) }
        >
            {/* profile component */ }
            <div
                className={ classNames(
                    "flex w-full h-20 border rounded shadow-sm",
                    isSlider ? 'gap-2 bg-slate-800'
                        : 'bg-white'
                ) }
            >
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
                <div className='flex-1 flex justify-center items-start flex-col truncate px-1'>
                    <div className='text-sm'>Hello,</div>
                    <div className='font-semibold truncate text-base text-appTheme-600 max-w-full'>{ name }</div>
                </div>
            </div>

            {/* //TODO: compare the below div classes with layout component's classes */ }

            {/* list component */ }
            <div className='shadow-sm flex flex-col bg-slate-800'>
                {/* my orders */ }
                <Link onClick={ closeSlider } href="/profile/orders" className='py-5 border-b text-base uppercase flex justify-between items-center cursor-pointer text-slate-100'>
                    <span>
                        <i className="ri-shopping-bag-3-fill text-xl text-appTheme-500 px-3"></i>
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
                            <span className='text-xl text-appTheme-500 px-3'>
                                <i className="ri-user-3-fill"></i>
                            </span>
                            <span className='font-medium text-base'>account settings</span>
                        </h3>
                    </div>
                    <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                        <Link onClick={ closeSlider } href="/profile/" className='cursor-pointer py-2 hover:text-appTheme-500 w-full text-sm'>
                            <span className='pl-7'>profile information</span>
                        </Link>
                        <Link onClick={ closeSlider } href="/profile/addresses" className='cursor-pointer py-2 hover:text-appTheme-500 w-full text-sm'>
                            <span className='pl-7'>Manage Addresses</span>
                        </Link>
                    </div>
                </div>

                {/* my stuff */ }
                <div className='h-auto w-full border-b'>
                    <div>
                        <h3 className='uppercase  text-slate-100 py-3 flex items-center'>
                            <span className='text-2xl text-appTheme-500 px-3'>
                                <i className="ri-folder-user-fill"></i>
                            </span>
                            <span className='font-medium'>my stuff</span>
                        </h3>
                    </div>
                    <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                        <Link onClick={ closeSlider } href="/profile/coupons" className='cursor-pointer py-2 hover:text-appTheme-500 w-full text-sm'>
                            <span className='pl-7'>My coupons</span>
                        </Link>
                        <Link onClick={ closeSlider } href="/profile/review" className='cursor-pointer py-2 hover:text-appTheme-500 w-full text-sm'>
                            <span className='pl-7'>My review & ratings</span>
                        </Link>
                    </div>
                </div>

                {/* logout */ }
                <div className='h-auto w-full cursor-pointer group'>
                    {/* <div> */ }
                    <h3 className='uppercase flex items-center text-slate-100 py-3'>
                        <span className='text-xl text-appTheme-500 px-3'>
                            <i className="ri-shut-down-line"></i>
                        </span>
                        <span className='font-medium text-base group-hover:text-appTheme-600'>Logout</span>
                    </h3>
                    {/* </div> */ }
                </div>
            </div>
        </div>
    )
}

export default LeftMenus;