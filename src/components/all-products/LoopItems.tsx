import React, { FC } from 'react'
import ItemCard from './ItemCard';
import { ProductType } from '@/lib/types/productTyps';

interface I_LoopItems {
    allProducts: ProductType[];
    allCartItems?: any;
    isUserLoggededIn?: boolean;
    isCartIconFalse?: boolean;
}

const LoopItems: FC<I_LoopItems> = ({
    allProducts,
    allCartItems = [],
    isUserLoggededIn = false,
    isCartIconFalse = false
}) => {
    return (
        <>
            {
                //? looping products
                allProducts.map((item: any) => <ItemCard
                    key={ item._id }
                    isProductAddedToCart={ allCartItems.some((cartItem: any) => cartItem._id === item._id) }
                    isUserLoggededIn={ isUserLoggededIn }
                    isCartIconFalse={ isCartIconFalse }
                    { ...item }
                />
                )
            }
        </>
    )
}

export default LoopItems;