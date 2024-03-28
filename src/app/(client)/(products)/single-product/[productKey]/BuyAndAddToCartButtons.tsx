"use client";

import Button from '@/components/common/buttons/Button';
import { useSetCartItems } from '@/lib/customHook/useCartItems';
import { ErrorMessage, cartAddedSuccessMessage } from '@/lib/util/toastMessages';
import React from 'react';
import toast from 'react-hot-toast';

const BuyAndAddToCartButtons = ({ _id }: { _id: string }) => {
    const cartMutation = useSetCartItems();

    function addToCart() {
        cartMutation.mutate({ productId: _id, method: 'post' }, {
            onSuccess: () => toast.success(cartAddedSuccessMessage),
            onError: (err) => {
                console.log(err);
                toast.error(ErrorMessage);
            },
        });
    };

    return (
        <div className='mt-6 lg:w-full'>
            <Button
                text='BUY NOW'
                className='lg:px-16 sm:px-10 px-8 py-4 text-sm font-bold bg-[#35a3bc] mr-4 text-white rounded-lg mb-3'
                type='button'
            />
            <Button
                text='ADD TO CART'
                className='lg:px-14 sm:px-7 px-5 py-4 text-sm font-bold bg-[#eb3c33] text-white rounded-lg'
                type='button'
                onClick={ addToCart }
            />
        </div>
    );
};

export default BuyAndAddToCartButtons;