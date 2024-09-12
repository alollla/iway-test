import React from "react"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <>
            <header>
                <div>
                    <strong>I'Way</strong>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout