import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from 'react'

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [255, 270, 290,264,300,303,299,302,290,250,265,270],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data:  [155, 154, 190,155,95,83,125,102,190,150,153,170],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export function PricesPerMonth() {
    return (
        <div style={{ width: '100%', height: '400px' }}>
        <Line options={options} data={data} style={{ width: '100%', height: '200px' }} />
        </div>
    )
}