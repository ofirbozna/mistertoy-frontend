import { httpService } from './http.service.js'

export const userService = {
    getLoggedInUser,
    login,
    logout,
    signup,
    getEmptyCredentials,
}
const BASE_URL = 'auth/'
const STORAGE_KEY = 'loggedinUser'


async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', {
            username,
            password,
        })
        _setLoggedInUser(user)
        return user
    } catch (error) {
        console.log('Could not login')
        throw error
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(BASE_URL + 'signup', credentials)
        _setLoggedInUser(user)
        return user
    } catch (error) {
        console.log('Could not signup')
        throw error
    }
}
async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.log('Could not logout')
        throw error
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}

function _setLoggedInUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, pref: user.pref, activities: user.activities }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userToSave))
    return userToSave
}
