import React from "react"
import Modal from 'react-modal'
import ForgotPasswordForm from "./ForgotPasswordForm"
import VerificationCode from "./VerificationCode"
import ResetPassword from "./ResetPassword"
import { UserContext } from "../..index"

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

export default function ModalComponent({ modalIsOpen, setIsOpen }) {

    const { user } = React.useContext(UserContext)

    function closeModal() {
        setIsOpen(false)
    }
    
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                {!user.phoneRecieved && <ForgotPasswordForm />}
                {user.phoneRecieved && !user.verified && <VerificationCode />}
                {user.verified && <ResetPassword closeModal={closeModal} />}
            </Modal>
        </div>
    )
}