import React from "react"
import { FaUser  } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { handleChange } from '.../utils'
import { UserContext } from "../..index"

export default function VerificationCode() {
    const [seconds, setSeconds] = React.useState(60)
    const { user, setUser } = React.useContext(UserContext)

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [seconds])

    React.useEffect(() => {
        if (user.verifyCode === '1441') {
            setUser(prev => ({
                ...prev,
                verified: true
            }))
        }
    }, [user.verifyCode])

    return (
        <div className="modal">
            <h2>Сброс пороля</h2>
            <FaUser  className="user-icon" />
            <h3>Введите код из СМС</h3>
            <input 
                type="text"
                id="verifyCode" 
                name="verifyCode"
                value={user.verifyCode}
                onChange={handleChange}
                pattern="\d*" 
                maxLength="4"
                placeholder="0000"/>
            {seconds === 0 && <Link onClick={() => setSeconds(60)}>Отпавить код еще раз</Link >}
            {user.verifyCode.length === 4 && user.verifyCode !== '1441' && <p style={{color: '#F34545'}}>Неверный код</p>}
            {seconds > 0 && <p className="explaining-message">Повторный запрос 00:{seconds}</p>}
        </div>
    ) 
}