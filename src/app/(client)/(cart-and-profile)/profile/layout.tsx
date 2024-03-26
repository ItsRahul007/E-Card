import type { Metadata } from 'next';
import Navbar from '@/components/all-products/Nav';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/lib/model/usersSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import LeftMenus from '@/components/common/profile-components/LeftMenus';

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
            <Navbar profile name={ name } />
            <div className='flex-1 flex justify-center items-center'>
                <div className='h-full w-full md:w-11/12 flex gap-3 justify-center p-2'>
                    {/* left component */ }
                    <LeftMenus
                        name={ name }
                    />

                    {/* right component */ }
                    <div className='min-h-11/12 flex flex-col gap-2 border w-screen lg:w-3/4 shadow-sm sm:p-4 bg-white'>
                        { children }
                    </div>
                </div>
            </div>
        </main>
    )
}
