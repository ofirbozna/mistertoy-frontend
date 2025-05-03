import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from 'react'
import { LabelsCount } from "../cmps/LabelsCount.jsx"
import { PricesPerMonth } from "../cmps/PricesPerMonth.jsx"


export function ToyDashboard() {
    return (
        <section className="toy-dashboard">
            <h1>Dashboard</h1>
            <LabelsCount/>
            <PricesPerMonth/>
        </section>
    )
}




