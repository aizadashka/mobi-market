import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5"
import Modal from '../components/password/Modal'
import { togglePassword, handleChange } from '../utils'

export default function Login() {    
    const [err, setErr] = React.useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false)

    const errorToast = toast.error('Неверный логин или пароль', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        containerId: 'login-container'
    })

    function login(e) {
        e.preventDefault()
        const src = 'neobook.online/mobi-market/users/login'

        axios
            .post(src, {...user.username, ...user.password})
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => {
                setErr(error)
                errorToast()
            })
    }

    function openNewModal() {
        setIsOpen(true)
    }

    return <div className='login-container' id='login-container'>
        <ToastContainer />
        <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        
        <form className='login'>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {user.username && <label htmlFor='username'>Имя пользователя</label>}
                <input 
                    required 
                    name='username'
                    className={`input ${err && 'turn-red'}`}
                    onChange={handleChange}             
                    placeholder='Имя пользователя'
                    type='text' />
            </div>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {user.password && <label htmlFor='password'>Пароль</label>}
                <div className='input-with-eye'>
                    <input 
                        required
                        id='password'
                        name='password'
                        className={`input ${err && 'turn-red'}`} 
                        onChange={handleChange}
                        placeholder='Пароль'
                        type='password'
                        autoComplete='corrent-password'/>
                    <IoEyeSharp 
                        className='icon' 
                        onClick={() => {
                            togglePassword('passwordToggler', 'password')
                        }} 
                        id='passwordToggler'/>
                </div>
            </div>
            <Link className='link' to='forgot-password' onClick={openNewModal}>Забыли пароль</Link>
            <button 
                id='login-button'
                className={`button ${(user.password && user.username) && 'active-btn'}`}
                onClick={login}
                disabled={user.password && user.username ? false : true}>
                    Войти
            </button>
        </form>
        <Link className='link center' to='/register' >Зарегистрироваться</Link>
    </div>
}