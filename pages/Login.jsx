import React from 'react'
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5"
import { togglePassword, toastStyle, modalStyles } from '../utils'
import useAuth from '../hooks/useAuth'
import Modal from 'react-modal'
import ForgotPassword from '../components/modal/ForgotPassword'
import ResetPassword from '../components/modal/ResetPassword'

export default function Login() {
    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from  = location.state?.from?.pathname || '/'

    const [err, setErr] = React.useState('')
    const [ username, setUsername ] = React.useState('')
    const [ password, setPassword ] = React.useState('')

    const [ isModalOpen, setIsModalOpen ] = React.useState(false)
    const [ phoneVerified, setPhoneVerified ] = React.useState(false)
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }
    Modal.setAppElement('#root')

    function login(e) {
        e.preventDefault()

        axios
            .post('/users/login/', {username, password})
            .then(res => {
                setAuth(res.data)
                setUsername('')
                setPassword('')
                res.data.first_name 
                    ? navigate(from, {replace: true})
                    : navigate('/profile')
            })
            .catch(error => {
                setErr(error)
                console.log(error)
                toast.error('Неверный логин или пароль', toastStyle)
            })
    }

    return (
        <div className='container'>
            <ToastContainer limit={1}/>    
            <form className='login' onSubmit={login}>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {username && <label htmlFor='username'>Имя пользователя</label>}
                    <input 
                        required 
                        name='username'
                        className={`input ${err ? 'turn-red' : ''}`}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setErr()
                        }}             
                        placeholder='Имя пользователя'
                        type='text' />
                </div>
                <div className={`input-wrapper ${err ? 'turn-red' : ''}`}>
                    {password && <label htmlFor='password'>Пароль</label>}
                    <div className='input-with-eye'>
                        <input 
                            required
                            id='password'
                            name='password'
                            className={`input ${err ? 'turn-red' : ''}`} 
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErr()
                            }}
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
                <Link className='link' onClick={openModal} >Забыли пароль</Link>
                <button 
                    className={`button ${(password && username) && 'active-btn'}`}
                    disabled={password && username ? false : true}>
                        Войти
                </button>
            </form>
            <Link className='link center' to='/register' >Зарегистрироваться</Link>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                center
            >
                {!phoneVerified && <ForgotPassword setPhoneVerified={setPhoneVerified}/>}
                {phoneVerified && <ResetPassword closeModal={closeModal} />}
            </Modal>
        </div>
    )
}