'use client';

import React, { useState } from 'react';
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
    }

    return (
        <div className='h-full w-full'>
            <Line data={ data } />
        </div>
    )
}

export default Dashboard;