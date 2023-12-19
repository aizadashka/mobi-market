import React from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from "../.."
import { isValidEmail, toastStyle } from "../../utils"

export default function CheckUserForm() {
    const { user, handleChange } = React.useContext(UserContext)
    const [err, setErr] = React.useState('')
    const navigate = useNavigate()

    const userToCheck = {
        username: user.username,
        email: user.email
    }

    function checkSpelling(e) {
        e.preventDefault()

        typeof Number(user.username) !== 'number' || isValidEmail(user.email)
            ? checkUser() 
            : toast.error('Неверный логин или почта', toastStyle)  
    }

    function checkUser() {
        axios
            .post('/users/check-user/', userToCheck)
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
                    {user.username && <label htmlFor='username'>Имя пользователя</label>}
                    <input 
                        required 
                        name='username'
                        value={user.username}
                        className={`input ${err && 'turn-red'}`}
                        onChange={handleChange}             
                        placeholder='Имя пользователя'
                        type='text' />
                </div>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {user.email && <label htmlFor='email'>Почта</label>}
                    <input 
                        required 
                        name='email'
                        value={user.email}
                        className={`input ${err && 'turn-red'}`}
                        onChange={handleChange}             
                        placeholder='Почта'
                        type='text' />
                </div>
                <button 
                    className={`button ${(user.email && user.username) && 'active-btn'}`}
                    disabled={user.email && user.username ? false : true}>
                        Далее
                </button>
            </form>
        </div>
    )
}