import React from "react"
import { UserContext } from "../../index"
import { FaUser, FaHeart, FaStore, FaDoorOpen } from "react-icons/fa6"

export default function Profile() {
    const { user } = React.useContext(UserContext)
    
    return (
        <nav>
            <div>
                <FaUser />
                <div>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            <div>
                <FaHeart />
                <p>Понравившиеся</p>
            </div>
            <div>
                <FaStore />
                <p>Мои товары</p>
            </div>
            <div>
                <FaDoorOpen />
                <p>Войти</p>
            </div>
        </nav>
    )
}