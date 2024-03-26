import AddressCompo from '@/components/profile-compos/addressCompo';
import React from 'react';
import AddNewAddress from './AddNewAddress';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import User from '@/lib/model/usersSchema';
import { T_JwtVerifyDataType } from '@/lib/types/authToken-type';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import AddressList from './AddressList';

type T_Addresses = {
    addresses: {
        full_name: string;
        phone_number: number;
        address: string;
        _id: ObjectId;
    }[];
}

const Addresses = async () => {
    return (
        <div className='flex flex-col gap-4 sm:px-4 px-2 sm:py-3 py-2'>
            {/* heading with add address button */ }
            <AddNewAddress />

            {/* address list */ }
            <AddressList />
        </div>
    );
};

export default Addresses;