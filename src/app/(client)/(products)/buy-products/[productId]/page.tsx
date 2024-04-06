import Navbar from '@/components/all-products/Nav';
import Products from '@/lib/model/productSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import React, { FC } from 'react';
import { decode } from 'jsonwebtoken';
import Example from './TailwindTemplate';

interface I_SingleProductPage {
    params: { productId: string };
};

const BuyProducts: FC<I_SingleProductPage> = async ({ params }) => {
    const encriptedProductId = params.productId;
    const productId = decode(encriptedProductId);

    // productId !== "cart products" && await connectWithMongo();
    // const product = productId !== "cart products" && await Products.findById(productId);

    //TODO: customze the page
    return (
        <div className='h-screen w-screen flex flex-col gap-2'>
            <Navbar />
            <Example />
        </div>
    );
};

export default BuyProducts;