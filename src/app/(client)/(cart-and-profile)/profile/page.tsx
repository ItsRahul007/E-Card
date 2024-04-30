import React, { FC } from 'react';
import ProfileSingleCompo from '@/components/profile-compos/ProfileSingleCompo';
import User from '@/lib/model/usersSchema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decode } from 'jsonwebtoken';
import { T_JwtVerifyDataType } from '@/lib/types/authToken-type';
import axios from 'axios';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';

const ProfileInformation: FC = async () => {
    const authToken = cookies().get('authToken')?.value || '';
    if (authToken.length <= 0) redirect('/login');

    const decodedAuthToken = await decode(authToken) as T_JwtVerifyDataType;

    await connectWithMongo();
    const user = await User.findById(decodedAuthToken.user.id).select('name email mobile_number');

    const { name, email } = user;

    return (
        <section className='h-auto w-full flex flex-col gap-5 sm:gap-10 sm:px-4 px-2 sm:py-3 py-2'>
            <h3 className='text-lg font-semibold text-appTheme-600'>Personal information</h3>
            <div className='h-auto w-full flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <div className='text-sm text-zinc-400 font-medium'>Email</div>
                    <div>{ email }</div>
                </div>

                <ProfileSingleCompo
                    headingText='Name'
                    name='name'
                    inputValue={ name }
                    inputType='text'
                    placeholder='Enter your name'
                />
                <ProfileSingleCompo
                    headingText='Mobile number'
                    name='mobile_number'
                    inputValue={ user.mobile_number ? user.mobile_number : '' }
                    inputType='number'
                    placeholder='Enter your mobile number'
                />
            </div>
        </section>
    );
};

export default ProfileInformation;