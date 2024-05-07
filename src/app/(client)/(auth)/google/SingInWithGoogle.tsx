import { signIn, auth } from '@/app/api/auth/[...nextauth]/options';
import IconButton from '@/components/common/buttons/IconButton';
import React from 'react';
import { cookies } from 'next/headers';
import User from '@/lib/model/usersSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import { sign } from 'jsonwebtoken';
import toast from 'react-hot-toast';
import { ErrorMessage } from '@/lib/util/toastMessages';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const SingInWithGoogle = async () => {
    return (
        <form
            className='w-11/12'
            action={ async () => {
                "use server"
                await signIn();
            } }
        >
            <button className='w-11/12 px-4 py-2 bg-[#0d0827cc] flex justify-center gap-4 items-center text-base rounded-lg' type='submit'>
                <Image
                    alt='google logo'
                    src='https://authjs.dev/img/providers/google.svg'
                    width={ 30 }
                    height={ 30 }
                    className='bg-transparent rounded-full'
                />
                <span>Continue with Google</span>
            </button>
        </form>
    )
}

export default SingInWithGoogle;