import React, { FC } from 'react';
import ProfileSingleCompo from '@/components/profile-compos/ProfileSingleCompo';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/lib/model/usersSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import { T_JwtVerifyDataType } from '@/lib/types/authToken-type';

const ProfileInformation: FC = async () => {
    const allCookies = cookies();
    const authToken = allCookies.get('authToken');
    const data = jwt.verify(authToken?.value!, process.env.JWT_SECRET!) as T_JwtVerifyDataType;

    await connectWithMongo();
    const { name, email, mobile_number } = await User.findById(data.user.id).select('name email mobile_number');

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
                    inputValue={ mobile_number ? mobile_number : '' }
                    inputType='number'
                    placeholder='Enter your mobile number'
                />
            </div>
        </section>
    );
};

export default ProfileInformation;