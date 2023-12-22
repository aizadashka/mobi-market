import React from "react"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"

export default function RegisterLayout() {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="auth-nav">
                <Link onClick={() => navigate(-1)}><IoArrowBack />Назад</Link>
                <h3>Регистрация</h3>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}