import React from 'react'
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5"
import { togglePassword, toastStyle } from '../utils'
import AuthContext from '../context/AuthContext'

export default function Login() {
    const { setAuth } = React.useContext(AuthContext)
    const [err, setErr] = React.useState('')
    const [ username, setUsername ] = React.useState('')
    const [ password, setPassword ] = React.useState('')
    const navigate = useNavigate()

    function login(e) {
        e.preventDefault()

        axios
            .post(
                '/users/login/', 
                JSON.stringify({username, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                }
            )
            .then(res => {
                console.log(res)
                setAuth(res.data)
                setUsername('')
                setPassword('')
                navigate('/profile')
            })
            .catch(error => {
                setErr(error)
                console.log(error)
                toast.error('Неверный логин или пароль', toastStyle)
            })
    }

    return (
        <div className='container'>
            <ToastContainer limit={1}/>
            
            <form className='login' onSubmit={login}>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {username && <label htmlFor='username'>Имя пользователя</label>}
                    <input 
                        required 
                        name='username'
                        className={`input ${err ? 'turn-red' : ''}`}
                        onChange={(e) => setUsername(e.target.value)}             
                        placeholder='Имя пользователя'
                        type='text' />
                </div>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {password && <label htmlFor='password'>Пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='password'
                            name='password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={(e) => setPassword(e.target.value)}
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
                <Link className='link' to='/' >Забыли пароль</Link>
                <button 
                    className={`button ${(password && username) && 'active-btn'}`}
                    disabled={password && username ? false : true}>
                        Войти
                </button>
            </form>
            <Link className='link center' to='/register' >Зарегистрироваться</Link>
        </div>
    )
}