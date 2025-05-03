import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container flex justify-between align-center">
                <h1>Toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    
                </nav>
            </section>
        </header>
    )
}
