import React, { FC } from 'react';
import ProfileSingleCompo from '../../components/profile-compos/ProfileSingleCompo';

const ProfileInformation: FC = () => {
    return (
        <section className='h-auto w-full flex flex-col gap-14'>
            <ProfileSingleCompo
                headingText='Personal information'
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
        </section>
    );
};

export default ProfileInformation;