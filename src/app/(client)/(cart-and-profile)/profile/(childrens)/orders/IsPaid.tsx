"use client";

import React, { FC, useEffect } from 'react';
import { useSetIsPaid } from '@/lib/customHook/useBuyProducts';

// http://localhost:3000/profile/orders?payment=success&orderId=eyJhbGciOiJIUzI1NiJ9.NjYxYmYzMzgyMDFkODQzYTk3OGQ0Yzdl.JAH_hpR2IrmXMrasBxaNBNT27LM9tBW1Zmbz7eCtpWU

interface I_SetIsPaid {
    orderId: string;
}

const IsPaid: FC<I_SetIsPaid> = ({ orderId }) => {
    const isPaidMutation = useSetIsPaid();

    useEffect(() => {
        if (orderId.length) {
            isPaidMutation.mutate(orderId);
        }
    }, [orderId]);


    return (
        <></>
    )
}

export default IsPaid