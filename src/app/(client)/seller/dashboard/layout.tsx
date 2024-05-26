import React from 'react';
import DashboardMenus from './DashboardMenus';
import Image from 'next/image';
import { Metadata } from 'next';
import UserProfile from '@/components/dashboard/UserProfileDropdown';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decode } from 'jsonwebtoken';
import { T_JwtVerifyDataType } from '@/lib/types/authToken-type';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import User from '@/lib/model/usersSchema';
import SideNavBar from '@/components/all-products/SideNavBar';

export const metadata: Metadata = {
  title: 'E-Card - Dashboard',
  description: 'The E-Card Dashboard where sellers can manage their products as well as their orders and also they can see the profit or loss margin of their products.'
};

const layout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await connectWithMongo();
  const authToken = cookies().get('authToken')?.value || '';

  if (authToken === '') redirect('/login');

  const decodedToken = decode(authToken) as T_JwtVerifyDataType;

  const getUserAvatar = await User.findById(decodedToken.user.id).select('avatar');
  const userAvatar = getUserAvatar.avatar || '/images/profile-pic.png';

  return (
    <main className='min-h-screen h-auto w-screen max-w-[1540px] mx-auto bg-zinc-100 font-poppins md:p-4 px-2 py-3'>
      {/* sile options */ }
      <div>
        <nav className='w-full h-16 flex justify-between items-center bg-white shadow-sm px-3'>
          <div className='flex items-center w-auto gap-5 md:gap-32 text-lg md:text-2xl text-zinc-900'>
            {/* logo */ }
            <div className='hidden md:flex gap-2 h-full w-40'>
              <Image
                src='/images/logo.png'
                alt='logo'
                height={ 40 }
                width={ 40 }
                className='object-contain bg-white'
              />
              <div className='text-emerald-500 font-bold font-ubuntu'>E-Card</div>
            </div>
            <div className='md:hidden'>
              <SideNavBar searchBarFalse />
            </div>
            <span className='font-bold'><span className='opacity-50 font-medium'>Hello,</span> { decodedToken.user.name }!</span>
          </div>
          <div>
            <UserProfile userAvatar={ userAvatar } />
          </div>
        </nav>
        <div className='flex gap-3'>
          <div className='h-screen w-72 bg-white md:flex hidden flex-col gap-2 px-3 py-5 shadow-md'>
            <DashboardMenus />
          </div>

          <div className='flex-1 p-2'>
            { children }
          </div>
        </div>
      </div>
    </main>
  )
}

export default layout;