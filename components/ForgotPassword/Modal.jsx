import React from "react"
import Modal from 'react-modal'
import ForgotPasswordForm from "./ForgotPasswordForm"
import VerificationCode from "./VerificationCode"
import ResetPassword from "./ResetPassword"

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

export default function ModalComponent(props) {
    const { modalIsOpen, setIsOpen, user, setUser, handleChange, handleSubmit, togglePassword } = props

    function closeModal() {
        setIsOpen(false)
    }
    
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                center
            >
                {!user.phoneRecieved && <ForgotPasswordForm 
                    user={user}
                    setUser={setUser}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}/>}
                {user.phoneRecieved && !user.verified && <VerificationCode 
                    user={user}
                    setUser={setUser}
                    handleChange={handleChange}/>}
                {user.verified && <ResetPassword
                    user={user}
                    setUser={setUser}
                    handleChange={handleChange}
                    togglePassword={togglePassword}
                    closeModal={closeModal} />}
            </Modal>
        </div>
    )
}