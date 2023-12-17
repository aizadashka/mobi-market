import React from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from "../.."
import { isValidEmail, toastStyle, baseURL } from "../../utils"

export default function CheckUserForm() {
    const { user, setUser, handleChange } = React.useContext(UserContext)
    const [err, setErr] = React.useState('')

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
            .post(baseURL + '/users/check-user/', userToCheck)
            .then(res => {
                setUser(prev => ({
                    ...prev,
                    userChecked: true
                }))
            })
            .catch(error => {
                setErr(error)
                toast.error('Данный пользователь уже зарегистрирован', toastStyle)
            })

    }

    return (
        <div>
            <ToastContainer limit={1}/>
            <form className='login'>
                <div className={`input-wrapper ${err && 'turn-red'}`}>
                    {user.username && <label htmlFor='user-name'>Имя пользователя</label>}
                    <input 
                        required 
                        name='username'
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
                        className={`input ${err && 'turn-red'}`}
                        onChange={handleChange}             
                        placeholder='Почта'
                        type='text' />
                </div>
                <button 
                    className={`button ${(user.email && user.username) && 'active-btn'}`}
                    onClick={checkSpelling}
                    disabled={user.email && user.username ? false : true}>
                        Далее
                </button>
            </form>
        </div>
    )
}