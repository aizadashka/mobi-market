import React from "react"
import { FaLock } from "react-icons/fa6"
import { IoEyeSharp } from "react-icons/io5"
import { togglePassword } from "../../utils"
import { UserContext } from "../.."

export default function ResetPassword({closeModal}) {
    const { user, setUser, handleChange } = React.useContext(UserContext)
    const [err, setErr] = React.useState(false)
    const [passwordReset, setPasswordReset] = React.useState(false)

    function comparePassword() {
        if (user.newPassword.length === user.confirmPassword.length) {
            setPasswordReset(true)
            if (user.newPassword !== user.confirmPassword) {
                setErr(true)
            } else {
                setUser(prev => ({
                    ...prev,
                    password: '',
                    confirm_password: ''
                }))
                closeModal()
            }
        }
    }

    return (
        <div className="form">
            <form>
                <FaLock  className="lock-icon" />
                {<h3>Придумайте пароль</h3>}
                <p className="explaining-message">Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {user.newPassword && <label className='left' htmlFor='newPassword'>Пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='newPassword'
                            name='newPassword'
                            className={`input ${err && 'turn-red'}`} 
                            onChange={handleChange}
                            placeholder='Пароль'
                            minLength={8}
                            type='password'
                            autoComplete='corrent-password'/>
                        <IoEyeSharp 
                            className='icon' 
                            onClick={() => {
                                togglePassword('newPasswordToggler', 'newPassword')
                            }} 
                            id='newPasswordToggler'/>
                    </div>
                </div>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {user.confirmPassword && <label className='left' htmlFor='confirmPassword'>Повторите пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='confirmPassword'
                            name='confirmPassword'
                            className={`input ${err && 'turn-red'}`} 
                            onChange={handleChange}
                            placeholder='Повторите пароль'
                            minLength={8}
                            type='password'
                            autoComplete='corrent-password'/>
                        <IoEyeSharp 
                            className='icon' 
                            onClick={() => {
                                togglePassword('confirmPasswordToggler', 'confirmPassword')
                            }}
                            id='confirmPasswordToggler'/>
                    </div>
                </div>
                {err && <p style={{color: '#F34545', marginTop: '0.5rem'}}>Неверный код</p>}
                <button 
                    className={`button ${passwordReset && 'active-btn'}`} 
                    disabled={passwordReset} 
                    onClick={comparePassword} 
                >Далее</button>
            </form>
        </div>
    )
}