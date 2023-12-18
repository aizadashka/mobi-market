import React from "react"
import { UserContext } from ".."
import { Link } from "react-router-dom"
import NavBar from '../components/profile/NavBar'
import { FaUser } from "react-icons/fa6"
import { IoArrowBack } from "react-icons/io5"
import ConfirmPhoneForm from "../components/ConfirmPhoneForm"
import Modal from 'react-modal'

export default function Profile() {
    const { user, handleChange } = React.useContext(UserContext)
    const [openModal, setOpenModal ] = React.useState(true)


    console.log(user) 
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="auth-nav">
                    <Link><IoArrowBack />Назад</Link>
                    <h3>Профиль</h3>
                </div> 
                { user.photo ? <img className='user-img' src={user.photo} alt={`${user.username}'s profile photo`} /> : <FaUser className="user-icon big"/> }
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
                                value={user._name ? user._name : ''}
                                type='text' />
                        </div>
                        <div className={'profile-input-wrapper'}>
                            <input 
                                name='last-name'
                                className='input'
                                onChange={handleChange}             
                                placeholder='Фамилия'
                                value={user.last_name ? user.last_name : ''}
                                type='text' />
                        </div>
                        <div className={'profile-input-wrapper'}>
                            <input 
                                value={user.username}
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
                            <Link onClick={() => setOpenModal(prev => !prev)}>Добавить номер</Link>
                        </div>
                        <input 
                            required 
                            name='email'
                            className='input'
                            onChange={handleChange}  
                            value={user.email}           
                            placeholder='Почта'
                            type='text' />
                    </div>
                </form>
                <Modal >
                    <ConfirmPhoneForm />
                </Modal>
            </div>
        </div>
    )
}