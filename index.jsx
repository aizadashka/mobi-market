import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import VerificationCode from './components/password/VerificationCode'
import Modal from './components/password/Modal'
import ForgotPasswordForm from './components/password/ForgotPasswordForm'
import Register from './pages/Register'
import Profile from './pages/Profile'

const UserContext = React.createContext()

function App() {
    const [user, setUser] = React.useState({ 
        username: "", 
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        userChecked: false,
        phoneRecieved: false,
        verifyCode: '', 
        verified: false,
    })

    function handleChange(e) {
        const { name, value }= e.target

        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <UserContext.Provider value={{user, setUser, handleChange}}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path='forgot-password' element={<Modal />} >
                            <Route index element={<ForgotPasswordForm />} />
                            <Route path='verify-code' element={<VerificationCode />} />
                        </Route> 
                    <Route path='register' element={<Register />} />
                    <Route path='my-profile' element={<Profile />} />
                <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export { UserContext }

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);