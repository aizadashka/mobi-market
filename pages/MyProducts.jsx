import React from "react"
import { Link } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { modalStyles } from "../utils"
import { IoArrowBack } from "react-icons/io5"
import Modal from 'react-modal'
import ProductModal from "../components/ProductModal"
import Product from "../components/Product"
import empty from '../assets/empty.png'

export default function MyProducts() {
    const axios = useAxiosPrivate()

    const [ products, setProducts ] = React.useState([])
    const [ productForModal, setProductForModal ] = React.useState({})

    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [productInfoHTML, setProductInfoHTML] = React.useState('')

    function openModal(e, id) {
        setIsModalOpen(true)
        openProductInfo(id)
    }

    function closeModal() {
        setIsModalOpen(false)
        setProductForModal({})
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

    React.useEffect(() => {
        axios
            .get('/products/my-products/', {page: 1, limit: 32})
            .then(res => {
                setProducts(res.data.results)
                console.log(res)
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
                openProductInfo={openProductInfo}
            />)
        }
    }, [productForModal])

    return (
        <div className="profile-container">
            <div className="auth-nav">
                <Link to='/'><IoArrowBack />Назад</Link>
                <h3>Мои товары</h3>
            </div> 
            <section>
                <div className='products-container'>
                    {products.length > 0 ? productsHTML : <img className="empty" src={empty}/>}
                </div>
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                center
            >
                {productForModal && productInfoHTML}
            </Modal>
        </div>
    )
}