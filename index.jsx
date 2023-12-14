import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import VerificationCode from './components/ForgotPassword/VerificationCode'
import Modal from './components/ForgotPassword/Modal'
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm'

const ToggleContext = React.createContext()

function App() {
    function togglePassword(togglerID, inputID) {
        const passwordToggler = document.querySelector(`#${togglerID}`)
        const passwordInput = document.querySelector(`#${inputID}`)

        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)

        passwordToggler.classList.toggle("turn-blue")
    }

    return (
        <ToggleContext.Provider value={togglePassword}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route path='login' element={<Login />} >
                    <Route path='forgot-password' element={<Modal />} >
                        <Route index element={<ForgotPasswordForm />} />
                        <Route path='verify-code' element={<VerificationCode />} />
                    </Route> 
                </Route>
                <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </ToggleContext.Provider>
    )
}

export { ToggleContext }

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);