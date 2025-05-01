import { useState, useEffect, useRef } from 'react'

import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, inStock, labels, price, sortBy } = filterByToEdit

    return (
        <section className="car-filter full main-layout">
            <h2>Cars Filter</h2>
            <form >
                <label htmlFor="name">Vendor:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={txt}
                    onChange={handleChange}
                />

                <label htmlFor="price">Max price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={price || ''}
                    onChange={handleChange}
                />

                <select name="inStock" value={inStock || ''} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not in stock</option>
                </select>

                {toyLabels &&
                    <select
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option disabled value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                }

                <label htmlFor="sortBy">Sort</label>
                <select name="sortBy" id="sortBy" value={sortBy} onChange={handleChange}>
                    <option value="name">Name</option>
                    <option value="createdAt">Creation time</option>
                    <option value="price">Price</option>
                </select>
            </form>
        </section>
    )
}