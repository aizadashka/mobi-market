import React from "react"
import { FaHeart } from 'react-icons/fa6'

export default function ProductModal(props) {
    const { id, name, price, images, short_description, 
        full_description, user, phone_number, 
        like_count, liked_by_current_user, closeModal, toggleLike, openProductInfo } = props

    return (
        <div className="modal-product-container">
            <p className="close-btn" onClick={closeModal}>X</p>
            <div className="modal-product-image-container">
                <img className="product-image" src={images[0].image} />
            </div>
            <p className="link">{price} $</p>
            <a type="tel">{phone_number}</a>
            <div className="likes-container">
                <FaHeart 
                    className={`like-icon ${liked_by_current_user ? 'liked' : ''}`}
                    onClick={() => {
                        toggleLike(id)
                        openProductInfo(id)
                    }}
                />
                <span className="gray-text">Нравится: {like_count}</span>
            </div>
            <p className="product-name">{name}</p>
            <p>{short_description}</p>
            <h3>Детальное описание</h3>
            <p>{full_description}</p>
        </div>
    )
}