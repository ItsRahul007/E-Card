import React, { FC } from 'react'
import ItemCard from './ItemCard';
import { ProductType } from '@/lib/types/productTyps';

interface I_LoopItems {
    allProducts: ProductType[];
    allCartItems: any;
    isUserLoggededIn: boolean;
}

const LoopItems: FC<I_LoopItems> = ({ allProducts, allCartItems, isUserLoggededIn }) => {
    return (
        <>
            {
                //? looping products
                allProducts.map((item: any) => <ItemCard
                    key={ item._id }
                    isProductAddedToCart={ allCartItems.some((cartItem: any) => cartItem._id === item._id) }
                    isUserLoggededIn={ isUserLoggededIn }
                    { ...item }
                />
                )
            }
        </>
    )
}

export default LoopItems;