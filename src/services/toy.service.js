import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
    getLabelsCount,
    addToyMsg,
    removeToyMsg
}

function query(filterBy = {}) {
    console.log(filterBy, 'query')
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getLabelsCount() {
    return httpService.get(BASE_URL + 'labels/count')
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: '', labels: [], sortBy: 'name', price: '' }
}


function getToyLabels() {
    return Promise.resolve(labels)
}

function addToyMsg(toyId, msg) {
    return httpService.post(BASE_URL + toyId + '/msg', msg)
}

function removeToyMsg(toyId, msg) {
    return httpService.post(BASE_URL + toyId + '/msg/' + msg.id, msg)
}