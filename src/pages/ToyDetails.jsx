import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

export function ToyDetails() {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const [toy, setToy] = useState(null)
    const [isAddingMsg, setIsAddingMsg] = useState(false)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    async function onSubmitMsg(ev, toyId) {
        ev.preventDefault()
        const { target } = ev
        const txt = target.msg.value


        if (!txt) return
        if (!loggedInUser) {
            alert('must log in to add message')
            return
        }
        const msgToSave = {
            txt,
            by: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname
            }
        }

        try {
            await toyService.addToyMsg(toyId, msgToSave)
            await loadToy()
        } catch (err) {
            console.error('Failed to add message', err)
        }
    }

    async function onAddMsg() {
        setIsAddingMsg(true)

    }


    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <h5>Labels: <span>{toy.labels.join(' ,')}</span></h5>
            <h5 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h5>
            <h5>Messages:</h5>
            <button onClick={onAddMsg}>Add Message</button>
            {isAddingMsg &&
                <form onSubmit={(ev) => onSubmitMsg(ev, toyId)}>
                    <label htmlFor="msg">write your message:</label>
                    <textarea name="msg" id="msg"></textarea>
                    <button>Send</button>
                </form>
            }
            {toy.msgs && toy.msgs.map(msg =>
                <section key={msg.id}>
                    <h6>By:{msg.by.fullname}</h6>
                    <p>{msg.txt}</p>
                </section>
            )}

            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
        </section>
    )
}