import {Link,NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions'
import { showErrorMsg,showSuccessMsg } from '../services/event-bus.service.js'
export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    console.log(user)
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Bye Bye')
        } catch (error) {
            showErrorMsg('OOPs try again')
        }
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container flex justify-between align-center">
                <h1 className='logo'>Toy App</h1>
                {user ? (
                    < section className="flex space-between align-center container">
                        <Link to={`/user`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/review" >Review</NavLink>
                    

                </nav>
            </section>
        </header>
    )
}
