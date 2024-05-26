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
    {/* <Line data={ data } /> */ }

    return (
        <div className='h-auto w-full md:mt-3'>
            {/* cards */ }
            <div className='grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-4 w-fit mx-auto max-[381px]:grid-cols-1 max-[381px]:grid-rows-4 max-[381px]:gap-2 max-[381px]:w-full max-[381px]:mx-0'>
                <StatusCard
                    number={ 500 }
                    title='todays sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-green-100 text-green-500'
                    profitOrLossPercentage={ 10 }
                    isOnLoss
                />
                <StatusCard
                    number={ 500 }
                    title='todays sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-green-100 text-green-500'
                    profitOrLossPercentage={ 10 }
                    isOnLoss
                />
                <StatusCard
                    number={ 500 }
                    title='todays sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-green-100 text-green-500'
                    profitOrLossPercentage={ 10 }
                    isOnLoss
                />
                <StatusCard
                    number={ 500 }
                    title='todays sales'
                    icon={ <i className="ri-bar-chart-box-fill"></i> }
                    iconColorAndIconBg='bg-green-100 text-green-500'
                    profitOrLossPercentage={ 10 }
                    isOnLoss
                />
            </div>


            <div></div>
        </div>
    )
}

export default Dashboard;