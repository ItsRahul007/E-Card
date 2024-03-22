import React, { FC } from 'react';
import ProfileSingleCompo from '@/components/profile-compos/ProfileSingleCompo';

const ProfileInformation: FC = () => {
    return (
        <section className='h-auto w-full flex flex-col gap-10 sm:px-4 px-2 sm:py-3 py-2'>
            <h3 className='text-lg font-semibold text-appTheme-600'>Personal information</h3>
            <div className='h-auto w-fit sm:w-full flex flex-col gap-5 max-sm:mx-auto'>
                <ProfileSingleCompo
                    headingText='Full Name'
                    inputValue='Rahul Ghosh'
                    inputType='text'
                    placeholder='Enter your name'
                />
                <ProfileSingleCompo
                    headingText='Email Address'
                    inputValue='rahul@mile9.io'
                    inputType='email'
                    placeholder='Enter your email'
                />
                <ProfileSingleCompo
                    headingText='Mobile number'
                    inputValue={ 1234567890 }
                    inputType='number'
                    placeholder='Enter your mobile number'
                />
            </div>
        </section>
    );
};

export default ProfileInformation;