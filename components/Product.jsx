import React from "react"
import { FaHeart } from "react-icons/fa6"

export default function Product(props) {
    const {id, name, price, like_count, liked_by_current_user, images, openModal, toggleLike} = props

    return (
        <div className="product-container" onClick={(e) => openModal(e, id)}>
            <div className="image-container">
                <img src={images[0].image} className="product-image"/>
            </div>
            <p className="product-name">{name}</p>
            <div>
                <p className="link">{price} $</p>
                <div className="likes-container">
                    <FaHeart 
                        onClick={()=> toggleLike(id)}
                        className={`like-icon ${liked_by_current_user ? 'liked' : ''}`} 
                    />
                    <span className="gray-text">{like_count}</span>
                </div>
            </div>
        </div>
    )
}