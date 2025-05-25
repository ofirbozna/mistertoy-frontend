import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    add,
    remove,
    getDefaultFilter
}

function query(filterBy={}) {
    console.log(filterBy)
    return httpService.get(BASE_URL, filterBy)
}


function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function add(review) {
    return httpService.post(BASE_URL, review)

}

function getDefaultFilter() {
    return { userName: '', toyName: '', createdAt:''}
}
