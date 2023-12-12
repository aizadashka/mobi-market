import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa"


export default function Login() {

    function togglePassword() {
        const togglePassword = document.querySelector("#togglePassword")
        const password = document.querySelector("#password")

        const type = password.getAttribute("type") === "password" ? "text" : "password"
        password.setAttribute("type", type)

        togglePassword.classList.toggle("turn-blue")
    }

    return <div className='login-container'>
        <form className='login'>
            <div className='input-wrapper'>
                <input className='input' required placeholder='Имя пользователя' />
            </div>
            <div className='input-wrapper'>
                <input 
                    className='input' 
                    required 
                    placeholder='Пароль'
                    type='password'
                    id='password'
                    autoComplete='corrent-password'/>
                <FaEye className='eye' onClick={togglePassword} id='togglePassword'/>
            </div>
            <Link className='link' to='change-password' >Забыли пароль</Link>
            <button className='button' >Войти</button>
        </form>
        <Link className='link center' to='register' >Зарегистрироваться</Link>
    </div>
}