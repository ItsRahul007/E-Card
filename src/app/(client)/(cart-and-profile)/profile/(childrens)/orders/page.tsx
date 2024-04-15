import React, { FC } from 'react';
import SetIsPaid from './IsPaid';

interface I_Orders {
    searchParams: {
        payment: string;
        order: string;
    };
};

const Orders: FC<I_Orders> = ({ searchParams }) => {
    const order = searchParams.order || '';
    const payment = searchParams.payment || '';

    return (
        <>
            { order.length && payment.length && <SetIsPaid order={ order } payment={ payment } /> }
            hello ji
        </>
    )
}

export default Orders;