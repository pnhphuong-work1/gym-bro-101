'use-client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeeklyRevenueData {
    week: string;
    revenue: number;
}

interface LineChartProps {
    weeklyRevenue: WeeklyRevenueData[];
}

const Chart: React.FC<LineChartProps> = ({ weeklyRevenue }) => {
    const data = {
        labels: weeklyRevenue.map((item) => `Week ${item.week}`),
        datasets: [
            {
                label: 'Weekly Revenue',
                data: weeklyRevenue.map((item) => item.revenue),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Weekly Revenue',
            },
        },
    };

    return (
        <div className="h-[70vh] w-full flex justify-center">
            {/* 4/5 of full container height */}
            <Line data={data} options={options}/>
        </div>
    )
};

export default Chart;
