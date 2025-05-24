import { useState, useEffect, useRef } from 'react'
import { MultipleSelectFilter } from './MultiSelectFilter.jsx'
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
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
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
                <label htmlFor="inStock">In stock</label>
                <select name="inStock" value={inStock || ''} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock:</option>
                    <option value="false">Not in stock</option>
                </select>

                <label htmlFor="labels">Labels:</label>
                <MultipleSelectFilter toyLabels={toyLabels} setFilterByToEdit={setFilterByToEdit} />

                <label htmlFor="sortBy">Sort by:</label>
                <select className='sort-by' name="sortBy" id="sortBy" value={sortBy} onChange={handleChange}>
                    <option value="name">Name</option>
                    <option value="createdAt">Creation time</option>
                    <option value="price">Price</option>
                </select>
            </form>
        </section>
    )
}