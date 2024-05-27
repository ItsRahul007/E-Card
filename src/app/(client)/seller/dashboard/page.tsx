'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { dayHours, last30Days, last7Days } from '@/lib/util/lineChartDatas';
import StatusCard from '@/components/dashboard/StatusCard';

const Dashboard = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: dayHours,
        datasets: [
            {
                label: 'Sales this day',
                data: [0, 5, 4, 0, 1, 2, 3, 4, 1, 6, 6, 1],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'red'
            },
        ]
    };

    return (
        <div className='h-auto w-full md:mt-3'>
            {/* cards */ }
            <div className='grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-4 w-fit max-[381px]:grid-cols-1 max-[381px]:grid-rows-4 max-[381px]:gap-2 max-[381px]:w-full xl:mx-auto'>
                <StatusCard
                    number={ 5 }
                    title="today's sales"
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-green-100 text-green-500'
                    profitOrLossPercentage={ 10 }
                    isOnLoss
                />
                <StatusCard
                    number={ 21 }
                    title='last 7 days sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-blue-100 text-blue-500'
                    profitOrLossPercentage={ 5 }
                />
                <StatusCard
                    number={ 122 }
                    title='total sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-rose-100 text-rose-500'
                />
                <StatusCard
                    number={ 500 }
                    title='orders'
                    icon={ <i className="ri-file-list-2-fill"></i> }
                    iconColorAndIconBg='bg-purple-200 text-purple-700'
                />
            </div>

            <div className='w-full xl:w-11/12 xl:mx-auto mt-3 bg-white md:px-4 px-2 h-[28rem]'>
                <div className='mx-auto max-h-full h-auto flex justify-center items-center'>
                    <Line data={ data } />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;