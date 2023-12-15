import React from "react"
import { FaSquarePhone } from "react-icons/fa6"
import { handleChange } from '.../utils'
import { UserContext } from "../..index"


export default function ForgotPasswordForm() {
    const { user, setUser } = React.useContext(UserContext)

    const correctPhoneNumberLength = user.phone.length === 10

    return (
        <div className="modal">
            <h2>Введите номер телефона </h2>
            <FaSquarePhone className="phone-icon" />
            <p className="explaining-message">Мы отправим вам СМС с кодом подтверждения</p>
            <form>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="0(000) 000 000"/>
                    <button 
                        className={`button ${correctPhoneNumberLength && 'active-btn'}`} 
                        disabled={!correctPhoneNumberLength} 
                        onClick={() => {
                            setUser(prev => ({
                                ...prev,
                                phoneRecieved: true
                            }))
                        }} 
                    >Далее</button>
            </form>
        </div>
    )
}