import { reviewService } from "../../services/review.service.js"
import { SET_IS_LOADING} from "../reducers/toy.reducer.js"
import { ADD_REVIEW, SET_REVIEWS, REMOVE_REVIEW } from "../reducers/review.reducer.js"
import { store } from "../store.js"

export async function loadReviews(filterBy={}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const reviews = await reviewService.query(filterBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('review action -> Cannot load revies', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }

}


export async function removeReview(reviewId) {
    try {
        await reviewService.remove(reviewId)
        store.dispatch({ type: REMOVE_REVIEW, reviewId })
    } catch (err) {
        console.log('review action -> Cannot remove review', err)
        throw err
    }
}

export async function addReview(review) {
    try {
        const savedReview = await reviewService.save(review)
        store.dispatch({ ADD_REVIEW, review: savedReview })
        return savedReview
    } catch (err) {
        console.log('review action -> Cannot add review', err)
        throw err
    }
}



