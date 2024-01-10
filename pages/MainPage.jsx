import React from "react"
import { Link } from "react-router-dom"
import logoSmall from '../assets/logoSmall.png'
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { FaUser, FaHeart } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { toastStyle, modalStyles } from "../utils"
import Modal from 'react-modal'
import ProductModal from "../components/ProductModal"
import Product from "../components/Product"

export default function MainPage() {
    const { auth } = useAuth()
    const { username, first_name, email, photo } = auth
    const navigate = useNavigate()
    const axios = useAxiosPrivate()

    const [ products, setProducts ] = React.useState([])
    const [ productForModal, setProductForModal ] = React.useState({})

    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [productInfoHTML, setProductInfoHTML] = React.useState('')
    const [finishRegistrationHTML, setFinishRegistrationHTML] = React.useState('')

    function openModal(e, id) {
        if (!e && !id) {
            setIsModalOpen(true)
            setFinishRegistrationHTML(
                <div className="modal-container">
                    <FaHeart className='icon-heart liked big'/>
                    <p>Вы не закончили регистрацию</p>
                    <Link className='button active-btn' to='/profile'>Зарегистрироваться</Link>
                    <Link className='button' onClick={closeModal}>Отмена</Link>
                </div>
            )
        } else if (e.target.nodeName === 'svg' || e.target.nodeName === 'path') {

        } else {
            setIsModalOpen(true)
            openProductInfo(id)
        } 
    }

    function closeModal() {
        setIsModalOpen(false)
        setProductForModal({})
        setFinishRegistrationHTML('')
        setProductInfoHTML('')
    }

    Modal.setAppElement('#root')

    function openProductInfo(id) {
        axios
            .get(`/products/${id}/`, {id})
            .then(res => {
                setProductForModal(res.data)
            })
            .catch(error => console.log(error))
    }

    function toggleLike(product_id) {
        const product = products.find(item => item.id === Number(product_id))

        if (!auth.first_name && !auth.last_name && !auth.birth_date) {
            openModal()
        } else if (product.liked_by_current_user) {
            axios
                .delete(`/products/unlike/${product_id}/`, {product_id})
                .catch(error => {
                    console.log(error)
                })
        } else {
            axios
                .post(`/products/like/${product_id}/`, {product_id})
                .then(() => {
                    toast.success('Товар добавлен в понравившиееся', toastStyle)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        axios
            .get('/products/', {page: 1, limit: 32})
            .then(res => {
                setProducts(res.data.results)
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        axios
            .get('/products/', {page: 1, limit: 32})
            .then(res => {
                setProducts(res.data.results)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const productsHTML = products.map(product => {
        const {id, name, price, like_count, liked_by_current_user, images} = product

        return (
            <Product 
                id={id} 
                key={id}
                name={name} 
                price={price} 
                like_count={like_count} 
                liked_by_current_user={liked_by_current_user} 
                images={images}
                openModal={openModal}
                toggleLike={toggleLike}
            />
        )
    })

    React.useEffect(() => {
        if (productForModal.images) {
            const { 
                id, name, price, images, short_description, 
                full_description, user, phone_number, 
                like_count, liked_by_current_user } = productForModal

            setProductInfoHTML(<ProductModal 
                id={id}
                name={name}
                price={price}
                images={images}
                short_description={short_description}
                full_description={full_description}
                user={user}
                phone_number={phone_number}
                like_count={like_count}
                liked_by_current_user={liked_by_current_user}
                closeModal={closeModal}
                toggleLike={toggleLike}
                openProductInfo={openProductInfo}
            />)
        }
    }, [productForModal])

    return (
        <div className="main-page-container">
            <ToastContainer limit={1}/>
            <header>
                <img src={logoSmall} className="logo-small"/>
                 <div className="header-components">
                    <button className="button active-btn">Подать объявление</button>
                    <div className='row-container' onClick={() => navigate('/profile')}>
                        <div>
                            <p>{first_name ? first_name : username}</p>
                            <p>{email}</p>
                        </div>
                        { photo 
                            ? <img className='user-img' src={photo} alt={`${username}'s profile photo`} />  
                            : <FaUser className="user-icon"/> 
                        }
                    </div>
                </div>
            </header>
            <section>
                <div className='products-container'>
                    {productsHTML}
                </div>
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                center
            >
                {productForModal && productInfoHTML}
                {finishRegistrationHTML ? finishRegistrationHTML : ''}
            </Modal>
        </div>
    )
}