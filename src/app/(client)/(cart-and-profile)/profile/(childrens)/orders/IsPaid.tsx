"use client";

import React, { FC, useEffect } from 'react';
import { useSetIsPaid } from '@/lib/customHook/useBuyProducts';

interface I_SetIsPaid {
    order: string;
    payment: string;
};

const IsPaid: FC<I_SetIsPaid> = ({ order, payment }) => {
    const isPaidMutation = useSetIsPaid();

    useEffect(() => {
        if (order.length) {
            isPaidMutation.mutate({ order, payment_status: payment });
        }
    }, []);


    return (
        <></>
    )
}

export default IsPaid