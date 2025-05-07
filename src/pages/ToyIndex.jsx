import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, saveToy, removeToy, setFilterBy } from '../store/actions/toys.actions.js'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState, } from 'react'
import { toyService } from '../services/toy.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'


export function ToyIndex() {

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const [toyLabels, setToyLabels] = useState()

    const isOnline = useOnlineStatus()
    useEffect(() => {
        console.log(`status: ${isOnline ? 'online' : 'offline'}`)
    }, [isOnline])

    useEffectOnUpdate(() => {
        loadToys()
        loadLabels()
        // toyService.getToyLabels()
        //     .then(labels => setToyLabels(labels))
    }, [filterBy])

    async function loadLabels() {
        try {
            const labels = await toyService.getToyLabels()
            setToyLabels(labels)
        } catch (err) {
            console.log('cannot get labels', err)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
          await removeToy(toyId)
            showSuccessMsg('toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    return (
        <section>
            <h1>Toys</h1>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} toyLabels={toyLabels} />
            <Link to="/toy/edit">Add Toy</Link>
            {!isLoading
                ? <ToyList toys={toys} onRemoveToy={onRemoveToy}
                /> :
                <div>Loading...</div>}
        </section>
    )
}