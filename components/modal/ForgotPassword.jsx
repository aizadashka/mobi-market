import React from "react"
import axios from "../../api/axios"
import { FaUser, FaSquarePhone } from "react-icons/fa6"
import useAuth from "../../hooks/useAuth"

export default function ForgotPassword({setPhoneVerified}) {
    const [ user_id, setUser_id ] = React.useState()
    const [ phone, setPhone ] = React.useState('')
    const [err, setErr] = React.useState()
    const { setAuth } = useAuth()

    function sendPhone(e) {
        e.preventDefault()

        axios
            .post('/users/forgot-password/', { phone })
            .then(res => {
                setUser_id(res.data.user_id)
            })
            .catch(() => {
                setErr('Данный номер телефона не зарегистрирован')
            })
    }

    function sendCode(code) {
        setTimeout(() => {
            axios
                .post(`/users/reset-password/${user_id}/`, {code, user_id}, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                })
                .then(res => {
                    setPhoneVerified(true)
                    setAuth(res.data)
                })
                .catch(() => {
                    setErr('Неверный код')
                })
        }, 1000)
    }

    return (
        <>
            {!user_id && <div>
                <h2>Введите номер телефона </h2>
                <FaSquarePhone className="phone-icon" />
                <p className="explaining-message">Мы отправим вам СМС с кодом подтверждения</p>
                <form onSubmit={sendPhone} >
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={phone || ''}
                        onChange={(e) => {
                            setPhone(e.target.value)
                            setErr()
                        }}
                        maxLength="10"
                        placeholder="0(000) 000 000"
                    />
                    {err && <p className="error" >{err}</p>}
                    <button 
                        className={`button ${(phone.length === 10 && !err) && 'active-btn'}`} 
                        disabled={!phone.length === 10 || err} 
                    >Далее</button>
                </form>
            </div>}
            {user_id && <div>
                <h3>Сброс пароля</h3>
                <FaUser className="phone-icon"/>
                <p>Введите код из СМС</p>
                <input 
                    type="text"
                    name="code"
                    onChange={(e) => {
                        if (e.target.value.length === 4) {
                            sendCode(e.target.value)
                        } else {
                            setErr()
                        }
                    }}
                    maxLength="4"
                    placeholder="0000"
                />
                {<a>Отправить код еще раз</a> }
                {err && <p className="error" >{err}</p>}
            </div>}
        </>
    )
}