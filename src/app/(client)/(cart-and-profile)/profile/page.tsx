import React, { FC } from 'react';
import ProfileSingleCompo from '@/components/profile-compos/ProfileSingleCompo';

const ProfileInformation: FC = () => {
    return (
        <section className='h-auto w-full flex flex-col gap-10'>
            <h3 className='text-2xl font-semibold'>Personal information</h3>
            <div className='h-auto w-full flex flex-col gap-5'>
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