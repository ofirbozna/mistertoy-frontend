import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadReviews } from '../store/actions/review.actions'
import { ReviewList } from '../cmps/ReviewList'


export function UserDetails() {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const detailsPage = 'user'
    console.log(reviews)

    useEffect(() => {
        loadReviews({ byUserId: loggedInUser._id })
    }, [])

    console.log(loggedInUser)


    return <section className="user-details">
        <h1>Your Profile</h1>
        <h3>Fullname: <span>{loggedInUser.fullname}</span></h3>
        {reviews && <ReviewList reviews={reviews} detailsPage={detailsPage} />}

    </section>
}