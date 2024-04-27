'use client';

import PageLoading from '@/components/common/loading/PageLoading';
import { useGetOrders } from '@/lib/customHook/useBuyProducts';
import React, { useState } from 'react'
import OrdersTR from './OrdersTR';
import ConfirmationDialog from '@/components/common/confirmation/ConfirmationDialog';

const OrderTableBody = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        data,
        isLoading,
    } = useGetOrders();

    return (
        <div className='h-auto w-full overflow-x-auto text-zinc-800'>
            { isOpen &&
                <ConfirmationDialog
                    onCancel={ () => setIsOpen(false) }
                    onConfirm={ () => setIsOpen(false) }
                    text='Are you sure you want to cancle this order?'
                />
            }
            <table className="table-auto border-collapse border border-gray-300 w-full max-w-screen text-sm duration-100 overflow-x-auto">
                <thead className='bg-appTheme-500 text-white'>
                    <tr>
                        <th className="px-4 py-1.5 truncate border capitalize">Products</th>
                        <th className="px-4 py-1.5 truncate border capitalize">Payment status</th>
                        <th className="px-4 py-1.5 truncate border capitalize">delivary status</th>
                        <th className="px-4 py-1.5 truncate border capitalize">total price</th>
                        <th className="px-4 py-1.5 truncate border capitalize">options</th>
                        {/* in options give 2 options delete and view in detail */ }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.data.length > 0 && data.data.map((obj: any) => {
                            const { _id, products, payment_status, delivary_status, total_price } = obj;
                            return <OrdersTR
                                _id={ _id }
                                key={ _id }
                                delivary_status={ payment_status }
                                payment_status={ delivary_status }
                                total_price={ total_price }
                                primaryImgUrl={ products[0].primaryImgUrl }
                                handleOnDelete={ () => setIsOpen(true) }
                            />
                        })
                    }
                </tbody>
            </table>
            { isLoading &&
                <div className='w-full h-20'>
                    <PageLoading />
                </div>
            }
        </div>
    )
}

export default OrderTableBody;