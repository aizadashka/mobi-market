import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5"
import { togglePassword, toastStyle, baseURL } from '../utils'
import { UserContext } from '..'

export default function Login() {    
    const [err, setErr] = React.useState('')
    const { user, setUser, handleChange } = React.useContext(UserContext)
    const navigate = useNavigate()

    const userToLogin = {
        username: user.username, 
        password: user.password
    }

    function login(e) {
        e.preventDefault()

        axios
            .post(baseURL + '/users/login/', userToLogin)
            .then(res => {
                setUser(prev => ({
                    ...prev,
                    ...res.data,
                    password: ''
                }))
                navigate('/profile')
            })
            .catch(error => {
                setErr(error)
                toast.error('Неверный логин или пароль', toastStyle)
            })
    }

    function openNewModal() {
        setIsOpen(true)
    }

    return <div className='container'>
        <ToastContainer limit={1}/>
        
        <form className='login'>
            <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                {user.username && <label htmlFor='username'>Имя пользователя</label>}
                <input 
                    required 
                    name='username'
                    className={`input ${err ? 'turn-red' : ''}`}
                    onChange={handleChange}             
                    placeholder='Имя пользователя'
                    type='text' />
            </div>
            <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                {user.password && <label htmlFor='password'>Пароль</label>}
                <div className='input-with-eye'>
                    <input 
                        required
                        id='password'
                        name='password'
                        className={`input ${err ? 'turn-red' : ''}`} 
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
            <Link className='link' to='/' onClick={openNewModal}>Забыли пароль</Link>
            <button 
                className={`button ${(user.password && user.username) && 'active-btn'}`}
                onClick={login}
                disabled={user.password && user.username ? false : true}>
                    Войти
            </button>
        </form>
        <Link className='link center' to='/register' >Зарегистрироваться</Link>
    </div>
}