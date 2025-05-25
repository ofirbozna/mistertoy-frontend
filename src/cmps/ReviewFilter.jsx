import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service'

export function ReviewFilter({ filterBy, onSetFilterBy}) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    console.log(filterBy)
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 300))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    

    const { userName, toyName, createdAt} = filterByToEdit

    return (
        <section className="toy-filter full main-layout">
            <form >
                <label htmlFor="toy-name">Toy Name:</label>
                <input type="text"
                    id="toy-name"
                    name="toyName"
                    placeholder="By toy name"
                    value={toyName}
                    onChange={handleChange}
                />

                <label htmlFor="user-name">User Name:</label>
                <input type="text"
                    id="user-name"
                    name="userName"
                    placeholder="By user name"
                    value={userName}
                    onChange={handleChange}
                />

                <label htmlFor="createdAt">Creation time:</label>
                <input type="date"  id="created-at"
                    name="createdAt" value={createdAt}  onChange={handleChange}/>




            </form>
        </section>
    )
}