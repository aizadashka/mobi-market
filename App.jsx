import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import RegisterLayout from './components/RegisterLayout'
import Profile from './pages/Profile'
import SetPassword from './components/signup/SetPassword'
import CheckUserForm from './components/signup/CheckUserForm'
import AuthRequired from "./components/AuthRequired"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route element={<RegisterLayout />} >
                        <Route path='register' element={<CheckUserForm />} >
                            <Route path='set-password' element={<SetPassword />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path='/profile' element={<AuthRequired /> }>
                    <Route index element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}