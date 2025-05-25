export function ReviewDetails({ review, detailsPage }) {
    if (review) {
        if (detailsPage === 'toy') {
            console.log('in')
            return (
                <h6>by: <span>{review.byUser.fullname}</span></h6>
            )
        } else if (detailsPage === 'user') {
            return (
                <h6>About toy: <span>{review.aboutToy.name}</span></h6>
            )
        } else {
            return (
                <div>
                    <h6>by: <span>{review.byUser.fullname}</span></h6>
                    <h6>About toy: <span>{review.aboutToy.name}</span></h6>
                </div>
            )
        }
    }
}
