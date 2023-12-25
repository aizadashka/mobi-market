import React from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { FaLock } from "react-icons/fa6"
import { IoEyeSharp } from "react-icons/io5"
import { togglePassword } from "../../utils"


export default function ResetPassword({closeModal}) {
    const [password, setPassword] = React.useState('')
    const [confirm_password, setConfirm_password] = React.useState('')
    const [err, setErr] = React.useState(false)
    const navigate = useNavigate()
    const axios = useAxiosPrivate()
    const { setAuth } = useAuth()

    const passwordsLengthCorrect = password.length === confirm_password.length && password.length > 7

    function comparePassword(e) {
        e.preventDefault()

        if (password === confirm_password && password.length > 7) {
            axios
                .post('/users/change-password/', { password, confirm_password })
                .then(() => {
                    setPassword('')
                    setConfirm_password('')
                    setAuth({})
                    closeModal()
                    navigate('/login')
                    console.log(res)
                })
                .catch(error => {
                    setErr(error.message)
                })
        } else  {
            setErr('Пароли не совпадают')
        } 
    }

    return (
        <div className="form" onSubmit={comparePassword} >
            <form>
                <FaLock className="lock-icon big" />
                <h3>Придумайте пароль</h3>
                <p className="explaining-message">Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {password && <label className='left' htmlFor='password'>Пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='resetPassword'
                            name='password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Пароль'
                            type='password'
                            autoComplete='corrent-password'/>
                        <IoEyeSharp 
                            className='icon' 
                            onClick={() => {
                                togglePassword('resetPasswordToggler', 'resetPassword')
                            }} 
                            id='resetPasswordToggler'/>
                    </div>
                </div>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {confirm_password && <label className='left' htmlFor='confirm_password'>Повторите пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='resetConfirm_password'
                            name='confirm_password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={(e) => setConfirm_password(e.target.value)}
                            placeholder='Повторите пароль'
                            type='password'
                            autoComplete='corrent-password'/>
                        <IoEyeSharp 
                            className='icon' 
                            onClick={() => {
                                togglePassword('resetConfirm_passwordToggler', 'resetConfirm_password')
                            }}
                            id='resetConfirm_passwordToggler'/>
                    </div>
                </div>
                {err && <p className="error">Пароли не совпадают</p>}
                <button 
                    className={`button ${passwordsLengthCorrect && 'active-btn'}`} 
                    disabled={!passwordsLengthCorrect} 
                >Готово</button>
            </form>
        </div>
    )
}