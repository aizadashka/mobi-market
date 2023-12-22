import React from "react"
import { Outlet } from "react-router-dom"
import logo from '../../assets/logo.png'

export default function LoginLayout() {
    return (
        <div className="site-wrapper">
            <div className="auth-page-container">
                <img 
                    src={logo} 
                    alt="Grocery cart with text 'MOBI MARKET'" 
                    className="logo"
                />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
