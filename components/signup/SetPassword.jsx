import React from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { FaLock } from "react-icons/fa6"
import { IoEyeSharp } from "react-icons/io5"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastStyle, togglePassword } from "../../utils"


export default function SetPassword({username, email}) {
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [err, setErr] = React.useState(false)
    const navigate = useNavigate()

    const passwordsLengthEqual = password.length === confirmPassword.length

    function comparePassword(e) {
        e.preventDefault()
        console.log(user)

        if (password === confirmPassword && password.length > 7) {
            axios
                .post('/users/register/', JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                }), {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    setPassword('')
                    setConfirmPassword('')
                    navigate('/')
                })
                .catch(error => {
                    setErr(error)
                    toast.error('Что-то пошло не так как надо', toastStyle)
                })
        } else {
            setErr(true)
        }
    }

    return (
        <div className="form" onSubmit={comparePassword} >
            <ToastContainer limit={1}/>
            <form>
                <FaLock className="lock-icon big" />
                <h3>Придумайте пароль</h3>
                <p className="explaining-message">Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {password && <label className='left' htmlFor='password'>Пароль</label>}
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
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {confirmPassword && <label className='left' htmlFor='confirm_password'>Повторите пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='confirm_password'
                            name='confirm_password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                {err && <p className="error">Пароли не совпадают</p>}
                <button 
                    className={`button ${passwordsLengthEqual && 'active-btn'}`} 
                    disabled={!passwordsLengthEqual} 
                >Готово</button>
            </form>
        </div>
    )
}