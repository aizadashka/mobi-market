import React from "react"
import { Link } from "react-router-dom"
import NavBar from '../components/NavBar'
import { FaUser } from "react-icons/fa6"
import { IoArrowBack } from "react-icons/io5"
import Modal from 'react-modal'
import AuthContext from "../context/AuthContext"

export default function Profile() {
    const { auth, setAuth } = React.useContext(AuthContext)

    function handleChange(e) {
        const { name, value } = e.target

        setAuth(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="auth-nav">
                    <Link><IoArrowBack />Назад</Link>
                    <h3>Профиль</h3>
                </div> 
                { auth.photo ? <img className='user-img' src={auth.photo} alt={`${auth.username}'s profile photo`} /> : <FaUser className="user-icon big"/> }
                <label className="link center">Выберите фотографию
                    <input 
                        name="newPhoto"
                        style={{display: 'none'}} 
                        type='file'
                        onChange={handleChange}
                        accept="image/jpeg,image/jpg,image/png,image/webp" />
                </label>
                <form>
                    <div className="basic-info">
                        <div className={'profile-input-wrapper'}>
                            <input 
                                name='first-name'
                                className='input'
                                onChange={handleChange}             
                                placeholder='Имя'
                                value={auth.first_name ? auth.first_name : ''}
                                type='text' />
                        </div>
                        <div className={'profile-input-wrapper'}>
                            <input 
                                name='last-name'
                                className='input'
                                onChange={handleChange}             
                                placeholder='Фамилия'
                                value={auth.last_name ? auth.last_name : ''}
                                type='text' />
                        </div>
                        <div className={'profile-input-wrapper'}>
                            <input 
                                value={auth.username}
                                name='username'
                                className='input'
                                onChange={handleChange}             
                                type='text' />
                        </div>
                        <div className={'profile-input-wrapper'}>
                            <input 
                                name='birth_date'
                                className='input'
                                onChange={handleChange}             
                                placeholder='ГГГГ-ММ-ДД'
                                pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                type='date' />
                        </div>
                    </div>
                    <div className="contact-info">
                        <div className="phone-container">
                            <Link >Добавить номер</Link>
                        </div>
                        <input 
                            required 
                            name='email'
                            className='input'
                            onChange={handleChange}  
                            value={auth.email}           
                            placeholder='Почта'
                            type='text' />
                    </div>
                    { auth.first_name && auth.last_name && auth.birth_date && auth.phone && 
                        <button className='button active-btn'>Закончить регистрацию</button>
                    }
                </form>
            </div>
        </div>
    )
}