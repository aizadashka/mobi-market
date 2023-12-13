import React from "react"
import Modal from 'react-modal'
import { FaSquarePhone } from "react-icons/fa6"
import Login from "../pages/Login"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '40px'
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
    }
}

Modal.setAppElement('#root')
  
export default function ForgotPassword() {
    const [modalIsOpen, setIsOpen] = React.useState(true)

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
    // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
    }

    function phoneMask(value) { 
        if (!value) return ''
        const phoneNumber = value.replace(/[^\d]/g, '')
        const phoneNumberLength = phoneNumber.length

        if (phoneNumberLength < 2) {
            return `${phoneNumber.slice(0, 1)}(${phoneNumber.slice(1)}`
        }

        if (phoneNumberLength < 4) {
            return `${phoneNumber.slice(0, 1)}(${phoneNumber.slice(1, 4)})`
        }
        if (phoneNumberLength > 10) {
            return phoneNumber.slice(0, 9)
        }

        return `${phoneNumber.slice(0, 1)}(${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)}`
    }

    function phoneNumberFormatter() {
        const phoneInput = document.getElementById('phone')
        const formatted = phoneMask(phoneInput.value)
        phoneInput.value = formatted
    }
    
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                center
            >
                <div className="modal">
                    <h2>Введите номер телефона </h2>
                    <FaSquarePhone className="phone-icon" />
                    <p className="explaining-message">Мы отправим вам СМС с кодом подтверждения</p>
                    <form>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            onKeyDown={phoneNumberFormatter}
                            pattern="[0]{1}([0-9]{3}) [0-9]{3} [0-9]{3}" 
                            placeholder="0(000) 000 000"/>
                    </form>
                    <button onClick={closeModal}>Далее</button>
                </div>

            </Modal>
        </div>
    )
}