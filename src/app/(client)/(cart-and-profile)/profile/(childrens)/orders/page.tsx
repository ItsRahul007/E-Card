import React, { FC } from 'react';
import SetIsPaid from './IsPaid';

interface I_Orders {
    searchParams: {
        payment: string;
        orderId: string;
    };
};

const Orders: FC<I_Orders> = ({ searchParams }) => {
    console.log(searchParams);
    const orderId = searchParams.orderId || '';
    const payment = searchParams.payment || '';

    return (
        <>
            { orderId.length && payment.length && <SetIsPaid orderId={ orderId } /> }
            hello ji
        </>
    )
}

export default Orders;