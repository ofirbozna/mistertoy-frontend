import { BrowserRouter as Router } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/scss/main.scss'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyDashboard } from './pages/ToyDashboard.jsx'
import { About } from './pages/About.jsx'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<ToyDashboard />} path="/dashboard" />
                            <Route element={<About />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}