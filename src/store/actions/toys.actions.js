import { toyService } from "../../services/toy.service.js"
import { SET_IS_LOADING, SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY, SET_FILTER_BY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
	const filterBy = store.getState().toyModule.filterBy
	store.dispatch({ type: SET_IS_LOADING, isLoading: true })

	try {
		const toys = await toyService.query(filterBy)
		store.dispatch({ type: SET_TOYS, toys })
	} catch (err) {
		console.log('toy action -> Cannot load toys', err)
		throw err
	} finally {
		store.dispatch({ type: SET_IS_LOADING, isLoading: false })
	}

}


export async function removeToy(toyId) {
	try {
		await toyService.remove(toyId)
		store.dispatch({ type: REMOVE_TOY, toyId })
	} catch (err) {
		console.log('toy action -> Cannot remove toy', err)
		throw err
	}
}

export async function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
	try {
		const savedToy = await toyService.save(toy)
		store.dispatch({ type, toy: savedToy })
		return savedToy
	} catch (err) {
		console.log('toy action -> Cannot save toy', err)
		throw err
	}
}



export function setFilterBy(filterBy) {
	store.dispatch({ type: SET_FILTER_BY, filterBy })
}