import React from "react"
import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import CheckUserForm from "../components/signup/CheckUserForm"
import SetPassword from "../components/signup/SetPassword"
import { UserContext } from ".."

export default function Register() {
    const { user } = React.useContext(UserContext)

    return (
        <div className="container">
            <div className="auth-nav">
                <Link><IoArrowBack />Назад</Link>
                <h3>Регистрация</h3>
            </div>
            {!user.userChecked && <CheckUserForm />}
            {user.userChecked && <SetPassword />}
        </div>
    )
}