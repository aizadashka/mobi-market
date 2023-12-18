import React from "react"
import { FaSquarePhone } from "react-icons/fa6"
import { UserContext } from ".."

export default function ConfirmPhoneForm() {
    const { user, handleChange } = React.useContext(UserContext)
    const correctPhoneNumberLength = user.phone.length === 10

    return (
        <div className="modalbackground">
            <div className="modalContainer">
                <div className="modalTitle">
                    <h3>Введите номр телефона</h3>
                    <FaSquarePhone className="phone-icon big"/>
                </div>
                <div className="modalBody">
                    <p>Введите номер телефона</p>
                    <p className="explaining-message">Мы отправим вам СМС с кодом подтверждения</p>
                    <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            maxLength="10"
                            placeholder="0(000) 000 000"/>
                </div>
                <div className="modalFooter">
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
                </div>
            </div>
        </div>
    )
}