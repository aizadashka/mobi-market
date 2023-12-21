import React from "react"
import logoSmall from '../assets/logoSmall.png'
import useAuth from "../hooks/useAuth"
import { FaUser } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
    const { auth } = useAuth()
    const { username, first_name, email, photo } = auth
    const navigate = useNavigate()

    return (
        <>
            <header>
                <img src={logoSmall} className="logo-small"/>
                 <div>
                    <button className="button active-btn">Подать объявление</button>
                    <div onClick={() => navigate('/profile')}>
                        <div>
                            <p>{first_name ? first_name : username}</p>
                            <p>{email}</p>
                        </div>
                        { photo 
                            ? <img className='user-img small' src={photo} alt={`${username}'s profile photo`} />  
                            : <FaUser className="user-icon small"/> 
                        }
                    </div>
                </div>
            </header>
            <section>
                <div>products here</div>
            </section>
        </>
    )
}