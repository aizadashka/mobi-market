import React from "react"
import { NavLink } from "react-router-dom"
import { FaUser, FaHeart, FaStore, FaDoorOpen } from "react-icons/fa6"
import AuthContext from "../context/AuthContext"

export default function Profile() {
    const {username, email} = React.useContext(AuthContext)
    
    return (
        <nav>
            <NavLink className='nav-item' >
                <FaUser className="nav-icon medium" />
                <div>
                    <p>{username}</p>
                    <p>{email}</p>
                </div>
            </NavLink>
            <div className="nav-group">
                <NavLink className='nav-item' >
                    <FaHeart className="icon" />
                    <p>Понравившиеся</p>
                </NavLink>
                <NavLink className='nav-item' >
                    <FaStore className="icon" />
                    <p>Мои товары</p>
                </NavLink>
                <NavLink className='nav-item' >
                    <FaDoorOpen className="icon" />
                    <p>Войти</p>
                </NavLink>
            </div>
        </nav>
    )
}