'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const NavOptions: React.FC<{ isUserLoggedIn: boolean }> = ({ isUserLoggedIn, }) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <>
            { isUserLoggedIn &&
                <>
                    <li className='cursor-pointer list-none hover:text-[#f26522]'>
                        <Link href="/cart">Cart <i className="ri-shopping-cart-2-fill font-thin"></i></Link>
                    </li>
                    <li className='cursor-pointer list-none hover:text-[#f26522]'>
                        <Link href="/profile">Profile <i className="ri-user-3-fill"></i></Link>
                    </li>
                </>
            }
            { !isUserLoggedIn ?
                <li className='cursor-pointer list-none hover:text-[#f26522]'>
                    <Link href="/login">Login <i className="ri-login-box-fill font-thin"></i></Link>
                </li>
                :
                <li className='cursor-pointer list-none hover:text-[#f26522]'>
                    <Link href="/logout">Logout <i className="ri-login-box-fill font-thin"></i></Link>
                </li>
            }
        </>
    )
}

export default NavOptions;