import React from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import { FaUser, FaSquarePhone } from "react-icons/fa6"
import { toast } from "react-toastify"
import { toastStyle } from "../../utils"

export default function AddPhone({closeModal}) {
    const { auth, setAuth } = useAuth()
    const axios = useAxiosPrivate()
    const [ phoneRecieved, setPhoneRecieved ] = React.useState(false)
    const [err, setErr] = React.useState()

    const correctPhoneNumberLength = auth.phone ? auth.phone.length === 10 : false

    function handleChange(e) {
        const { name, value } = e.target

        setAuth(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function sendPhone(e) {
        e.preventDefault()

        axios
            .put('/users/add-phone/', { phone: auth.phone }, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: false
            })
            .then(res => {
                setAuth(prev => ({
                    ...prev,
                    ...res.data
                }))
                setPhoneRecieved(true)
            })
            .catch(error => {
                console.log(error)
                setErr('Данный номер уже зарегистрирован')
            })
    }

    function sendCode(code) {
        setTimeout(() => {
            axios
                .post('/users/verify-phone/', {code}, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                })
                .then(res => {
                    setAuth(prev => ({...prev, verified: true}))
                    setTimeout(() => {
                        closeModal()
                        toast.success('Данные успешно изменены', toastStyle)
                    }, 1000)
                })
                .catch(error => {
                    setErr('Неверный код')
                    console.log(error)
                })
        }, 1000)
    }

    return (
        <>
            {!phoneRecieved && <div>
                <h2>Введите номер телефона </h2>
                <FaSquarePhone className="phone-icon" />
                <p className="explaining-message">Мы отправим вам СМС с кодом подтверждения</p>
                <form onSubmit={sendPhone} >
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={auth.phone || ''}
                        onChange={handleChange}
                        maxLength="10"
                        placeholder="0(000) 000 000"
                    />
                    {err && <p className="error" >{err}</p>}
                    <button 
                        className={`button ${(correctPhoneNumberLength && !err) && 'active-btn'}`} 
                        disabled={!correctPhoneNumberLength || err} 
                    >Далее</button>
                </form>
            </div>}
            {phoneRecieved && <div>
                <h3>Изменить номер телефона</h3>
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