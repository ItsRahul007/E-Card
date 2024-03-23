import React, { FC } from 'react';
import ProfileSingleCompo from '@/components/profile-compos/ProfileSingleCompo';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/lib/model/usersSchema';

type I_JwtVerifyDataType = {
    user: {
        id: String
    },
    iat: number | string
}

const ProfileInformation: FC = async () => {
    const allCookies = cookies();
    const authToken = allCookies.get('authToken');
    const data = jwt.verify(authToken?.value!, process.env.JWT_SECRET!) as I_JwtVerifyDataType;

    const { name, email, mobileNumber } = await User.findById(data.user.id).select('name email mobileNumber');


    return (
        <section className='h-auto w-full flex flex-col gap-5 sm:gap-10 sm:px-4 px-2 sm:py-3 py-2'>
            <h3 className='text-lg font-semibold text-appTheme-600'>Personal information</h3>
            <div className='h-auto w-full flex flex-col gap-5'>
                <ProfileSingleCompo
                    headingText='Full Name'
                    inputValue={ name }
                    inputType='text'
                    placeholder='Enter your name'
                />
                <ProfileSingleCompo
                    headingText='Email Address'
                    inputValue={ email }
                    inputType='email'
                    placeholder='Enter your email'
                />
                <ProfileSingleCompo
                    headingText='Mobile number'
                    inputValue={ mobileNumber ? mobileNumber : '' }
                    inputType='number'
                    placeholder='Enter your mobile number'
                />
            </div>
        </section>
    );
};

export default ProfileInformation;