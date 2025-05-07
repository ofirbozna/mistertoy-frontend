import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from 'react'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export function LabelsCount(){
        const [labelsCount, setLabelsCount] = useState({})
    
        useEffect(() => {
            loadLabelsCount()
        }, [])
    
        async function loadLabelsCount() {
            const labelsCount = await toyService.getLabelsCount()
                setLabelsCount(labelsCount)
        }
        const data = {
            labels: Object.keys(labelsCount),
            datasets: [
                {
                    label: '# of toys',
                    data: Object.values(labelsCount),
                    backgroundColor: [
                        'rgba(145, 92, 103, 0.55)',
                        'rgb(113, 153, 179,0.55)',
                        'rgb(189, 167, 112,0.55)',
                        'rgb(116, 173, 173,0.55)',
                        'rgb(129, 113, 161,0.55)',
                        'rgb(180, 138, 95,0.55)',
                        'rgb(111, 87, 63,0.55)',
                        'rgb(53, 77, 101,0.55)'
                    ],
                    borderColor: [
                        'rgb(145, 92, 103)',
                        'rgb(113, 153, 179)',
                        'rgb(189, 167, 112)',
                        'rgb(116, 173, 173)',
                        'rgb(129, 113, 161)',
                        'rgb(180, 138, 95)',
                        'rgb(111, 87, 63)',
                        'rgb(53, 77, 101)'
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <div style={{ width: '100%', height: '400px' }}>
                <Pie data={data} />
                </div>
        
        )
}