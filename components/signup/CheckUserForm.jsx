import React from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isValidEmail, toastStyle } from "../../utils"

export default function CheckUserForm() {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [err, setErr] = React.useState('')
    const navigate = useNavigate()

    function checkSpelling(e) {
        e.preventDefault()

        typeof Number(username) !== 'number' || isValidEmail(email)
            ? checkUser() 
            : toast.error('Неверный логин или почта', toastStyle)  
    }

    function checkUser() {
        axios
            .post('/users/check-user/', { username, email})
            .then(res => {
                if (res.data.username || res.data.email) {
                    toast.error('Данный пользователь уже зарегистрирован', toastStyle)
                } else {
                    navigate('set-password')
                }

            })
            .catch(error => {
                setErr(error)
                toast.error('Что-то пошло не так', toastStyle)
            })

    }

    return (
        <div>
            <ToastContainer limit={1}/>
            <form className='login' onSubmit={checkSpelling}>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {username && <label htmlFor='username'>Имя пользователя</label>}
                    <input 
                        required 
                        name='username'
                        value={username}
                        className={`input ${err && 'turn-red'}`}
                        onChange={(e) => setUsername(e.target.value)}             
                        placeholder='Имя пользователя'
                        type='text' />
                </div>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {email && <label htmlFor='email'>Почта</label>}
                    <input 
                        required 
                        name='email'
                        value={email}
                        className={`input ${err && 'turn-red'}`}
                        onChange={(e) => setEmail(e.target.value)}             
                        placeholder='Почта'
                        type='text' />
                </div>
                <button 
                    className={`button ${(email && username) && 'active-btn'}`}
                    disabled={email && username ? false : true}>
                        Далее
                </button>
            </form>
            {success && <SetPassword user={user} email={email} />}
        </div>
    )
}