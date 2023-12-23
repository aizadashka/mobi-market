import React from "react"
import { NavLink } from "react-router-dom"
import { FaUser, FaHeart, FaStore, FaDoorOpen, FaAngleRight } from "react-icons/fa6"
import useAuth from "../hooks/useAuth"

export default function NavBar() {
    const { auth, setAuth } = useAuth()
    const { username, email, first_name } = auth

    function logout(e) {
        e.preventDefault()

        setTimeout(() => setAuth({}), 500)
    }
    
    return (
        <nav>
            <NavLink to='/profile' className='nav-item' >
                <FaUser className="nav-icon medium" />
                <div>
                    <p>{username}</p>
                    <p>{email}</p>
                </div>
            </NavLink>
            <div className="nav-group">
                { first_name 
                    ? <><NavLink to='/liked-products' className='nav-item' >
                        <div>
                            <FaHeart className="icon" />
                            <p>Понравившиеся</p>
                        </div>
                        <FaAngleRight />
                    </NavLink>
                    <NavLink to='/my-products' className='nav-item' >
                        <div>
                            <FaStore className="icon" />
                            <p>Мои товары</p>
                        </div>
                        <FaAngleRight />
                    </NavLink></>
                    : <><div className='nav-item disabled' >
                        <div>
                            <FaHeart className="icon" />
                            <p>Понравившиеся</p>
                        </div>
                        <FaAngleRight />
                    </div>
                    <div className='nav-item disabled' >
                        <div>
                            <FaStore className="icon" />
                            <p>Мои товары</p>
                        </div>
                        <FaAngleRight />
                    </div></>
                }
            </div>
            <NavLink onClick={logout} className='nav-item' >
                <div>
                    <FaDoorOpen className="icon" />
                    <p>Выйти</p>
                </div>
                <FaAngleRight />
            </NavLink>
        </nav>
    )
}