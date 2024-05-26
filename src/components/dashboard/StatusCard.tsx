import classNames from '@/lib/util/classNames';
import React from 'react';

interface I_StatusCard {
    number: string | number;
    title: string;
    iconColorAndIconBg: string;
    icon: JSX.Element;
    isOnLoss?: boolean;
    profitOrLossPercentage: number;
};


const StatusCard: React.FC<I_StatusCard> = ({ number, title, iconColorAndIconBg, icon, isOnLoss, profitOrLossPercentage }) => {
    return (
        <div className='md:w-56 md:h-32 h-28 w-44 bg-white shadow rounded-md flex justify-between p-4 col-span-1 row-span-1'>
            <div className='font-medium text-gray-800 flex flex-col justify-between'>
                <div>
                    <div className='md:text-3xl text-xl'>{ number }</div>
                    <div className='opacity-50 text-xs md:text-sm capitalize'>{ title }</div>
                </div>
                <div className={ classNames(
                    'px-3 py-1 h-fit w-fit rounded text-xs font-semibold',
                    isOnLoss ? 'text-red-500 bg-red-100' : 'bg-green-100 text-green-500'
                ) }>
                    { !isOnLoss ? '+' : '-' }{ profitOrLossPercentage }%
                </div>
            </div>
            <div className={ classNames(
                'md:text-2xl text-lg md:px-3 px-2 md:py-2 py-1 h-fit w-fit rounded-lg',
                iconColorAndIconBg
            ) }>
                { icon }
            </div>
        </div>
    )
}

export default StatusCard;