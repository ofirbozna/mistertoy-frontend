import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { reviewService } from '../services/review.service.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { loadReviews, removeReview } from '../store/actions/review.actions.js'

export function ToyDetails() {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [toy, setToy] = useState(null)
    const [isAddingMsg, setIsAddingMsg] = useState(false)
    const [isAddingReview, setIsAddingReview] = useState(false)
    const detailsPage ='toy'
    const { toyId } = useParams()



    useEffect(() => {
        if (toyId) loadToy()
        loadReviews({ aboutToyId: toyId })
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
            await loadReviews({ aboutToyId: toyId })
        } catch (err) {
            console.error('Failed to add message', err)
        }
    }

    function onAddMsg() {
        setIsAddingMsg(!isAddingMsg)
    }

    function onAddReview() {
        setIsAddingReview(!isAddingReview)
    }

    async function onSubmitReview(ev, toyId) {
        ev.preventDefault()
        console.log('sub')
        const { target } = ev
        const txt = target.review.value


        if (!txt) return
        if (!loggedInUser) {
            alert('must log in to add message')
            return
        }

        console.log(target.review.value)
        const reviewToSave = {
            aboutToyId: toyId,
            txt,
        }
        console.log(reviewToSave)
        try {
            await reviewService.add(reviewToSave)
            await loadToy()
        } catch (err) {
            console.error('Failed to add review', err)
        }
    }


    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <section className='details'>
                <h1>{toy.name}</h1>
                <h4>Price: ${toy.price}</h4>
                <h4>Labels: <span>{toy.labels.join(' ,')}</span></h4>
                <h4 className={toy.inStock ? 'green' : 'red'}>
                    {toy.inStock ? 'In stock' : 'Not in stock'}
                </h4>
            </section>
            <section className='messages'>
                <h5>Messages:</h5>
                <button onClick={onAddMsg}>Add Message</button>
                {isAddingMsg &&
                    <form onSubmit={(ev) => onSubmitMsg(ev, toyId)}>
                        <label htmlFor="msg">write your message: </label>
                        <textarea name="msg" id="msg"></textarea>
                        <button>Send</button>
                    </form>
                }
                {toy.msgs && toy.msgs.map(msg =>
                    <section className="message-card" key={msg.id}>
                        <h6>By:{msg.by.fullname}</h6>
                        <p>{msg.txt}</p>
                    </section>
                )}
            </section>

            <section className='reviews'>
                <button onClick={onAddReview}>Add Review</button>
                {isAddingReview &&
                    <form onSubmit={(ev) => onSubmitReview(ev, toyId)}>
                        <label htmlFor="review">write your review: </label>
                        <textarea name="review" id="review"></textarea>
                        <button>Send</button>
                    </form>
                }
                <ReviewList reviews={reviews} detailsPage={detailsPage} />
            </section>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>

        </section>
    )
}