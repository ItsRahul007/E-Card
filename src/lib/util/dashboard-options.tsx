import { DashboardOptions } from "../types/dashboard";

export const dashboardOptions: DashboardOptions[] = [
    {
        label: 'Dashboard',
        icon: <i className="ri-bar-chart-2-fill"></i>,
        url: '/seller/dashboard'
    },
    {
        label: 'Orders',
        icon: <i className="ri-file-list-2-fill"></i>,
        url: '/seller/dashboard/orders'
    },
    {
        label: 'Products',
        icon: <i className="ri-gift-2-fill"></i>,
        url: '/seller/dashboard/products'
    },
    {
        label: 'Help',
        icon: <i className="ri-question-fill"></i>,
        url: '/seller/dashboard/help'
    },
    {
        label: 'Support',
        icon: <i className="ri-hand-heart-fill"></i>,
        url: '/seller/dashboard/support'
    },
    {
        label: 'Settings',
        icon: <i className="ri-settings-2-fill"></i>,
        url: '/seller/dashboard/settings'
    },
];