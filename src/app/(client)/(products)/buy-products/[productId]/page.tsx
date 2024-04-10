import Navbar from '@/components/all-products/Nav';
import React, { FC } from 'react';
import { decode } from 'jsonwebtoken';
import Example from './TailwindTemplate';
import { isValidObjectId } from 'mongoose';
import axios from 'axios';
import { hasSymbols } from '@/lib/util/emailChecker';

interface I_SingleProductPage {
    params: { productId: string };
};

const BuyProducts: FC<I_SingleProductPage> = async ({ params }) => {
    const encriptedProductId = params.productId;
    const productId = decode(encriptedProductId);

    const isProductIdHaveSymbol = hasSymbols(productId?.toString());

    const isValidMongooDBId = productId && !isProductIdHaveSymbol && isValidObjectId(productId);

    const product = isValidMongooDBId ? await axios.get(`https://e-card-itsrahul007s-projects.vercel.app/api/single-product?productId=${productId}`, {
        headers: {
            AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN!)
        }
    }) : { data: {} };

    return (
        <div className='h-screen w-screen flex flex-col gap-2'>
            <Navbar />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-2xl px-4 md:pb-24 md:pt-16 pb-12 pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
                    {/* <Example product={ [] } /> */ }
                    <Example product={ product.data?.success ? [product.data.product] : [] } />
                </div>
            </div>
        </div>
    );
};

export default BuyProducts;