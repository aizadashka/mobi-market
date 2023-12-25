import React from "react"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa6"
import { IoArrowBack } from "react-icons/io5"
import Modal from 'react-modal'
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { isValidEmail, toastStyle, modalStyles } from "../utils"
import { ToastContainer, toast } from "react-toastify"
import AddPhone from '../components/modal/AddPhone'

export default function Profile() {
    const { auth, setAuth } = useAuth()
    const [ userDataChanged, setUserDataChanged ] = React.useState(false)
    const axios = useAxiosPrivate()
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }
    Modal.setAppElement('#root')

    const { username, first_name, last_name, birth_date, phone, email } = auth

    function handleChange(e) {
        const { name, value } = e.target

        setUserDataChanged(true)

        if (name === 'email') {
            isValidEmail(value) 
            ? setAuth(prev => ({...prev, [name]: value})) 
            : toast.error('Некорректная почта', toastStyle)
        }

        setAuth(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function submitChanges(e) {
        e.preventDefault()

        axios
            .put('/users/profile/update/', {
                first_name, 
                last_name, 
                username, 
                email,
                birth_date
            })
            .then(res => {
                setAuth(prev => ({
                    ...prev,
                    ...res.data
                }))
            })
            .catch(error => {
                console.log(error)
                toast.error('Неверный логин или пароль', toastStyle)
            })
            
    }  

    return (
        <div className="container">
            <ToastContainer limit={1}/>
            <div className="auth-nav">
                <Link to='/'><IoArrowBack />Назад</Link>
                <h3>Профиль</h3>
            </div> 
            {/* { photo ? <img className='user-img' src={photo} alt={`${username}'s profile photo`} /> : } */ <FaUser className="user-icon big"/> }
            {/* <label className="link center">Выберите фотографию
                <input 
                    name="photo"
                    id="photo"
                    style={{display: 'none'}} 
                    type='file'
                    onChange={handleChange}
                    accept="image/jpeg,image/jpg,image/png,image/webp" />
            </label> */}
            <form onSubmit={submitChanges}>
                <div className="basic-info">
                    <div className={'profile-input-wrapper'}>
                        <input 
                            required
                            name='first_name'
                            className='input'
                            onChange={handleChange}             
                            placeholder='Имя'
                            value={first_name || ''}
                            type='text' />
                    </div>
                    <div className={'profile-input-wrapper'}>
                        <input 
                            required
                            name='last_name'
                            className='input'
                            onChange={handleChange}             
                            placeholder='Фамилия'
                            value={last_name || ''}
                            type='text' />
                    </div>
                    <div className={'profile-input-wrapper'}>
                        <input 
                            required
                            value={username}
                            name='username'
                            className='input'
                            onChange={handleChange} 
                            disabled            
                            type='text' />
                    </div>
                    <div className={'profile-input-wrapper'}>
                        <input 
                            name='birth_date'
                            className='input'
                            onChange={handleChange}             
                            placeholder='ГГГГ-ММ-ДД'
                            value={birth_date || ''}
                            pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                            type='date' />
                    </div>
                </div>
                <div className="contact-info">
                    <div className="phone-container">
                        <Link onClick={openModal}>{phone ? 'Изменить' : 'Добавить'} номер</Link>
                        <span>{phone ? phone : '0 000 000 000'}</span>
                    </div>
                    <input 
                        required 
                        name='email'
                        className='input'
                        onChange={handleChange}  
                        value={email}           
                        placeholder='Почта'
                        type='text' />
                </div>
                { (!first_name || !last_name || !birth_date || userDataChanged) && 
                    <button className='button active-btn'>
                        {(first_name && last_name && birth_date) ? 'Сохранить' : 'Закончить регистрацию'}
                    </button>
                }
            </form>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                center
            >
                <AddPhone closeModal={closeModal} />
            </Modal>
        </div>
    )
}