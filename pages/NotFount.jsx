import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>Извините, страница, которую вы искали, не найдена.</h1>
            <Link to="/login" className="link-button">Вернутся на Главную страницу</Link>
        </div>
    )
}