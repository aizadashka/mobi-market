import React from "react"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../index'
import CheckUserForm from "../components/signup/CheckUserForm"

export default function SignUp({err, handleChange}) {
    const {user} = React.useContext(UserContext)

    function register(e) {
        e.preventDefault()
        const src = 'neobook.online/mobi-market/users/register'
        axios
            .post(src, user)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => {
                setErr(err)
            })
    }

    return (
        <div>
            <ToastContainer />
            <CheckUserForm />
        </div>
    )
}