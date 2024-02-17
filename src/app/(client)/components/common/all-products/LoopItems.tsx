import React, { FC } from 'react'
import ItemCard from './ItemCard';
import { ProductType } from '@/lib/types/productTyps';

interface I_LoopItems {
    allProducts: ProductType[];
}

const LoopItems: FC<I_LoopItems> = ({ allProducts }) => {
    return (
        <>
            {
                //? looping products
                allProducts.map((item: any) => {
                    return <ItemCard key={ item._id } base64Result={ { success: false, src: "" } } { ...item } />
                }
                )
            }
        </>
    )
}

export default LoopItems;