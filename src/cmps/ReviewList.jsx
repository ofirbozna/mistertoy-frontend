import { ReviewDetails } from "./ReviewDetails"

export function ReviewList({ reviews, detailsPage }) {

    function getDate(date) {
        date = new Date("2025-05-24T14:08:10.000Z")
        const formatted = date.toLocaleString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        return formatted
    }

    async function onRemoveReview(reviewId) {
        try {
            removeReview(reviewId)
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }


    return <section className="review-list">
        <h5>Reviews:</h5>
        {reviews && reviews.map(review =>
            <section key={review._id} className="review-card">
                <ReviewDetails review={review} detailsPage={detailsPage}/>
                <p>{getDate(review.createdAt)}</p>
                <p>{review.txt}</p>
                <button onClick={() => onRemoveReview(review._id)}>x</button>
            </section>
        )}
    </section>
}