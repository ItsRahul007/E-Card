import Orders from '@/lib/model/ordersSchema';
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';
import Image from 'next/image';
import React from 'react';
import SingleOrderItem from './SingleOrderItem';

interface I_SingleOrder {
    params: {
        orderId: string;
    }
}

const SingleOrder: React.FC<I_SingleOrder> = async ({ params }) => {
    const orderId = params.orderId;

    await connectWithMongo();
    const order = await Orders.findById(orderId).select('-__v -createdAt -updatedAt -customer_id -_id');

    return (
        <>
            <section className='w-full h-auto md:mb-5 mb-3 sm:p-4 p-2'>
                <h4 className='text-lg sm:text-2xl font-semibold text-start text-appTheme-500'>Shipping address</h4>
                <div className='flex flex-col gap-2.5 mt-5'>
                    <div className='text-lg font-normal flex flex-col'>
                        <span className='text-zinc-400 text-base'>Full Name</span>
                        <span>{ order.shipping_address.full_name }</span>
                    </div>
                    <div className='text-lg font-normal flex flex-col'>
                        <span className='text-zinc-400 text-base'>Phone Number</span>
                        <span>{ order.shipping_address.phone_number }</span>
                    </div>
                    <div className='text-lg font-normal flex flex-col'>
                        <span className='text-zinc-400 text-base'>Address</span>
                        <span>{ order.shipping_address.address }</span>
                    </div>
                </div>
            </section>

            {/* products */ }
            <section className='w-full h-full flex flex-col gap-5 sm:gap-10 sm:p-4 p-2'>
                <h4 className='text-lg sm:text-2xl font-semibold text-start text-appTheme-500'>Ordered Products</h4>
                {/* image */ }
                { order.products.map((obj: any, i: number) => <SingleOrderItem
                    key={ obj._id }
                    i={ i }
                    primaryImgUrl={ obj.primaryImgUrl }
                    product_name={ obj.product_name }
                    product_price={ obj.product_price }
                    quantity={ obj.quantity }
                />
                ) }
            </section>
        </>
    );
};

export default SingleOrder;