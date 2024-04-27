import React, { FC } from 'react';
import SetIsPaid from './IsPaid';
import OrderTableBody from './OrderTableBody';

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
            <span className='hidden'>{ (order.length && payment.length) && (<SetIsPaid order={ order } payment={ payment } />) }</span>
            <OrderTableBody />
        </>
    )
}

export default Orders;