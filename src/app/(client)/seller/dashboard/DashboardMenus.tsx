'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { dashboardOptions } from '@/lib/util/dashboard-options';
import Link from 'next/link';
import classNames from '@/lib/util/classNames';

type T_CurrentTab = '/seller/dashboard' | '/seller/dashboard/orders' | '/seller/dashboard/products' | '/seller/dashboard/settings' | '/seller/dashboard/help' | '/seller/dashboard/support';


const DashboardMenus = () => {
    const pathName = usePathname() as T_CurrentTab;

    const [currentTab, setCurrentTab] = useState<T_CurrentTab>(pathName);

    useEffect(() => {
        setCurrentTab(pathName);
    }, [pathName]);

    return (
        <>
            {
                dashboardOptions.map(option => (
                    <Link
                        href={ option.url }
                        className={ classNames(
                            'flex gap-3 px-4 py-3 font-medium capitalize items-center justify-between rounded-md shadow',
                            currentTab === option.url ? 'bg-emerald-500 text-white' : 'hover:text-white hover:bg-emerald-500 text-gray-500'
                        ) }
                    >
                        <div className='flex items-center gap-2'>
                            <span>{ option.icon }</span>
                            <span>{ option.label }</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-2xl"></i>
                    </Link>
                ))
            }
        </>
    )
}

export default DashboardMenus