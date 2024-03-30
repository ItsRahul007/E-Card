"use client";

import { useGetCartItems, useSetCartItems } from '@/lib/customHook/useCartItems';
import { ErrorMessage, cartAddedSuccessMessage } from '@/lib/util/toastMessages';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import IconButton from '../common/buttons/IconButton';
import classNames from '@/lib/util/classNames';

interface I_CartIconButton {
    isProductAddedToCart?: boolean;
    isUserLoggededIn?: boolean;
    _id: string;
}

const CartIconButton: FC<I_CartIconButton> = ({
    isProductAddedToCart = false,
    isUserLoggededIn = false,
    _id
}) => {
    const router = useRouter();

    const redirect = (path: string) => {
        router.push(path);
    };

    const { refetch: refetchCartItems } = useGetCartItems();
    const cartMutation = useSetCartItems();

    function addToCart() {
        if (!isUserLoggededIn) {
            toast.error('Please login to add items to cart');
            redirect('/login');
            return;
        }

        if (isProductAddedToCart) {
            toast.success('Item is already added to cart');
            return;
        }

        cartMutation.mutate({ productId: _id, method: 'post' }, {
            onSuccess: () => {
                refetchCartItems();
                toast.success(cartAddedSuccessMessage)
            },
            onError: (err: any) => {
                console.log(err);
                toast.error(err.response.data.error || ErrorMessage);
            },
        });
    };

    return (
        <IconButton
            className={ classNames(
                'absolute top-1 right-1 text-base p-1 px-2 rounded-full text-gray-50 bg-opacity-70 cursor-pointer block xl:opacity-0 group-hover:opacity-100',
                isProductAddedToCart ? 'bg-green-400' : 'bg-gray-400'
            ) }
            icon={ <i className="ri-shopping-cart-2-fill"></i> }
            type='button'
            onClick={ addToCart }
        />
    )
}

export default CartIconButton;