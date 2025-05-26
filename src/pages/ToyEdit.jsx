import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from '../store/actions/toys.actions.js'
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'
import { ImgUploader } from '../cmps/ImgUploader.jsx'


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const [labels, setLabels] = useState([])

    console.log(toyToEdit)


    const hasChanges = useRef(false)
    useConfirmTabClose(hasChanges)

    useEffect(() => {
        if (toyId) {
            loadToy()
            loadToyLabels()
        }
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
        }
        // toyService.getById(toyId)
        //     .then(toy => setToyToEdit(toy))
        //     .catch(err => {
        //         console.log('Had issues in toy edit', err)
        //         navigate('/toy')
        //     })
    }

    async function loadToyLabels() {
        try {
            const toyLabels = await toyService.getToyLabels()
            setLabels(toyLabels)
        } catch (err) {
            console.log('Had issues in toy edit:', err)
            navigate('/toy')
            showErrorMsg('Toy not found!')
        }

        // toyService.getToyLabels()
        //     .then(setLabels)
        //     .catch(err => {
        //         console.log('Had issues in toy edit:', err)
        //         navigate('/toy')
        //         showErrorMsg('Toy not found!')
        //     })
    }


    function handleChange({ target }) {
        const { name, value, type, checked } = target

        let fieldValue
        if (type === 'checkbox') {
            if (name === 'labels') {
                fieldValue = checked
                    ? [...toyToEdit.labels, value]
                    : toyToEdit.labels.filter(label => label !== value)
            } else {
                fieldValue = checked
            }
        } else if (type === 'number') {
            fieldValue = +value
        } else {
            fieldValue = value
        }

        setToyToEdit(prevToy => ({
            ...prevToy,
            [name]: fieldValue
        }))
        hasChanges.current = true
    }


    async function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        try {
            const res = await saveToy(toyToEdit)
            showSuccessMsg('toy Saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
    }

    function onUploaded(imgUrl) {
        setToyToEdit(prevToy => ({ ...prevToy, imgUrl }))
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={toyToEdit.price || ''}
                    // min="1"
                    // required
                    onChange={handleChange}
                />
                <fieldset>
                    <legend>Labels:</legend>
                    {labels.map(label => (
                        <label key={label} style={{ display: 'block' }}>
                            <input
                                type="checkbox"
                                name="labels"
                                value={label}
                                checked={toyToEdit.labels.includes(label)}
                                onChange={handleChange}
                            />
                            {label}
                        </label>
                    ))}
                </fieldset>

                {toyToEdit._id && (
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={toyToEdit.inStock}
                                onChange={handleChange}
                            />
                            In Stock
                        </label>
                    </div>
                )}
                <ImgUploader onUploaded={onUploaded} toyToEdit={toyToEdit}/>
                <button>
                    {toyToEdit._id ? 'Update Toy' : 'Add'}
                </button>
            </form>
        </section>
    )
}