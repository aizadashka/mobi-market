import React from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../index"
import { FaUser, FaHeart, FaStore, FaDoorOpen } from "react-icons/fa6"

export default function Profile() {
    const { user } = React.useContext(UserContext)
    
    return (
        <nav>
            <NavLink className='nav-item' >
                <FaUser className="nav-icon medium" />
                <div>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
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