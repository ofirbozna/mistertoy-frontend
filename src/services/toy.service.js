import { storageService } from "./async-storage.service.js";
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

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
_createToys()


export const toyService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
    getToyLabels
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (typeof filterBy.inStock === 'boolean') {
                toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
            }

            if (filterBy.price) {
                toys = toys.filter(toy => toy.price <= filterBy.price)
            }

            if (filterBy.labels?.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            if (sortBy.type) {
                const dir = +sortBy.desc
                toys.sort((a, b) => {
                    if (sortBy.type === 'name') {
                        return a.name.localeCompare(b.name) * dir
                    } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
                        return (a[sortBy.type] - b[sortBy.type]) * dir
                    }
                })
            }


            toys.sort((toy1, toy2) => {
                if (filterBy.sortBy === 'name') {
                    return toy1.name.localeCompare(toy2.name) 
                } else if (filterBy.sortBy === 'price' ||filterBy.sortBy  === 'createdAt') {
                    return (toy1[filterBy.sortBy ] - toy2[filterBy.sortBy ])
                }
            })

            return toys
        })
}


function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
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

function getToyLabels() {
    return Promise.resolve(labels)
}

function getDefaultFilter() {
    return { txt: '', inStock: '', labels: [], sortBy: 'name', price: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801011,
            inStock: true,
        },
        {
            _id: 't102',
            name: 'Speedy Car',
            price: 89,
            labels: ['On wheels', 'Battery Powered'],
            createdAt: 1631032801011,
            inStock: true,
        },
        {
            _id: 't103',
            name: 'Puzzle Mania',
            price: 59,
            labels: ['Puzzle'],
            createdAt: 1631033801011,
            inStock: false,
        },
        {
            _id: 't104',
            name: 'Color Splash Kit',
            price: 74,
            labels: ['Art'],
            createdAt: 1631034801011,
            inStock: true,
        },
        {
            _id: 't105',
            name: 'Outdoor Explorer Set',
            price: 130,
            labels: ['Outdoor', 'Box game'],
            createdAt: 1631035801011,
            inStock: true,
        },
        {
            _id: 't106',
            name: 'Magic Puzzle Cube',
            price: 45,
            labels: ['Puzzle', 'Box game'],
            createdAt: 1631036801011,
            inStock: false,
        },
        {
            _id: 't107',
            name: 'Baby Rattle Set',
            price: 35,
            labels: ['Baby'],
            createdAt: 1631037801011,
            inStock: true,
        },
        {
            _id: 't108',
            name: 'Deluxe Dollhouse',
            price: 220,
            labels: ['Doll', 'Art'],
            createdAt: 1631038801011,
            inStock: true,
        },
        {
            _id: 't109',
            name: 'Electric Scooter',
            price: 310,
            labels: ['On wheels', 'Battery Powered', 'Outdoor'],
            createdAt: 1631039801011,
            inStock: false,
        },
        {
            _id: 't110',
            name: 'Crafty Kids Box',
            price: 68,
            labels: ['Art', 'Box game'],
            createdAt: 1631040801011,
            inStock: true,
        }

    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
}