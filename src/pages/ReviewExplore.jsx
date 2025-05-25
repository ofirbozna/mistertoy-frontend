import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadReviews, removeReview } from '../store/actions/review.actions.js'
import { Link, useParams } from 'react-router-dom'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { ReviewFilter } from '../cmps/ReviewFilter.jsx'
import { reviewService } from '../services/review.service.js'

export function ReviewExplore() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const detailsPage = 'explore'
    console.log(reviews)


    const [filterBy, setFilterBy] =useState(reviewService.getDefaultFilter())
    useEffect(() => {
        loadReviews(filterBy)
    }, [filterBy])


    function onSetFilterBy(filterBy){
        setFilterBy(filterBy)
    }


    return <section className='review-page'>
        <ReviewFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
        <ReviewList reviews={reviews} detailsPage={detailsPage}/>
    </section>
}