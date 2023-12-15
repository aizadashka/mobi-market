import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import VerificationCode from './components/password/VerificationCode'
import Modal from './components/password/Modal'
import ForgotPasswordForm from './components/password/ForgotPasswordForm'
import Register from './pages/SignUp'

const UserContext = React.createContext()

function App() {
    const [user, setUser] = React.useState({ 
        username: "", 
        email: '',
        password: "",
        phone: '',
        phoneRecieved: false,
        verifyCode: '', 
        verified: false,
        newPassword: '', 
        confirmPassword: ''
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path='login' element={<Login />} >
                        <Route path='forgot-password' element={<Modal />} >
                            <Route index element={<ForgotPasswordForm />} />
                            <Route path='verify-code' element={<VerificationCode />} />
                        </Route> 
                    </Route>
                    <Route path='register' element={<Register />} />
                <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export { FunctionsContext, UserContext }

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);