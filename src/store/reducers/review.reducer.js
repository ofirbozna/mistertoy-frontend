
export const SET_REVIEWS = 'SET_REVIEWS'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const ADD_REVIEW = 'ADD_REVIEW'

const initialState = {
    reviews: [],
}

export function reviewReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_REVIEWS:
            return { ...state, reviews: cmd.reviews }
        case REMOVE_REVIEW:
            const lastReviews = [...state.reviews]
            return {
                ...state,
                reviews: state.reviews.filter(review => review._id !== cmd.reviewId),
                lastReviews
            }
        case ADD_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, cmd.review]
            }

        default:
            return state
    }
}