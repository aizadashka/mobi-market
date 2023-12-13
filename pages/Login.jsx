import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ username: "", password: "" })
    const [err, setErr] = React.useState('')

    const passwordToggler = document.querySelector("#togglePassword")
    const passwordInput = document.querySelector("#password")

    function togglePassword() {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)

        passwordToggler.classList.toggle("turn-blue")
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function login(e) {
        e.preventDefault()
        const src = 'neobook.online/mobi-market/users/login'
        axios
            .post(src)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => {
                setErr(err)
                toast.error('Неверный логин или пароль', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    containerId: 'login-container'
                })
            })
    }
    
    return <div className='login-container' id='login-container'>
        <ToastContainer />
        <form className='login'>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {loginFormData.username && <label htmlFor='user-name'>Имя пользователя</label>}
                <input 
                    required 
                    name='username'
                    className={`input ${err && 'turn-red'}`}
                    onChange={handleChange}             
                    placeholder='Имя пользователя'
                    type='text' />
            </div>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {loginFormData.password && <label htmlFor='password'>Пароль</label>}
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
                    <IoEyeSharp className='icon' onClick={togglePassword} id='togglePassword'/>
                </div>
            </div>
            <Link className='link' to='forgot-password' >Забыли пароль</Link>
            <button 
                id='login-button'
                className={`${(loginFormData.password && loginFormData.username) && 'active-btn'}`}
                onClick={login}
                disabled={loginFormData.password && loginFormData.username ? false : true}>
                    Войти
            </button>
        </form>
        <Link className='link center' to='register' >Зарегистрироваться</Link>
    </div>
}