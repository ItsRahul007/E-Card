'use client';

import Link from 'next/link';
import React from 'react';

interface I_SellerOption {
    userRole?: string;
}

const SellerOption: React.FC<I_SellerOption> = ({ userRole = 'user' }) => {
    return (
        <>
            { userRole !== 'user' ?
                <Link href="/seller/dashboard">My Dashboard</Link>
                : <Link href="/seller/become-a-seller">Become a Seller</Link>
            }
        </>
    )
}

export default SellerOption;