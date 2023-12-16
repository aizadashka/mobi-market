import React from "react"
import { Link } from "react-router-dom"
import { FaLock } from "react-icons/fa6"
import { IoEyeSharp } from "react-icons/io5"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseURL, toastStyle, togglePassword } from "../../utils"
import { UserContext } from "../.."
import axios from "axios"

export default function SetPassword() {
    const { user, setUser, handleChange } = React.useContext(UserContext)
    const [err, setErr] = React.useState(false)

    const passwordsLengthEqual = user.password.length === user.confirm_password.length

    const newUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        confirm_password: user.confirm_password
    }

    function comparePassword(e) {
        e.preventDefault()
        console.log(user)

        if (user.password === user.confirm_password && user.password.length > 7) {
            axios
                .post(baseURL + '/users/register/', newUser)
                .then(data => console.log(data))
                .catch(error => {
                    setErr(error)
                    toast.error('Что-то пошло не так как надо', toastStyle)
                })
            setUser(prev => ({
                ...prev,
                password: '',
                confirm_password: ''
            }))
        } else {
            setErr(true)
        }
    }

    return (
        <div className="form">
            <ToastContainer limit={1}/>
            <form>
                <FaLock  className="lock-icon" />
                {<h3>Придумайте пароль</h3>}
                <p className="explaining-message">Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {user.password && <label className='left' htmlFor='password'>Пароль</label>}
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
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {user.confirm_password && <label className='left' htmlFor='confirm_password'>Повторите пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='confirm_password'
                            name='confirm_password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={handleChange}
                            placeholder='Повторите пароль'
                            type='password'
                            autoComplete='corrent-password'/>
                        <IoEyeSharp 
                            className='icon' 
                            onClick={() => {
                                togglePassword('confirm_passwordToggler', 'confirm_password')
                            }}
                            id='confirm_passwordToggler'/>
                    </div>
                </div>
                {err && <p style={{color: '#F34545', marginTop: '0.5rem'}}>Пароли не совпадают</p>}
                <Link to='/'>
                    <button 
                        className={`button ${passwordsLengthEqual && 'active-btn'}`} 
                        disabled={!passwordsLengthEqual} 
                        onClick={comparePassword} 
                    >Готово</button>
                </Link>
            </form>
        </div>
    )
}