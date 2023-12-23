import React from "react"
import { Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import LoginLayout from './components/layout/LoginLayout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import RegisterLayout from './components/layout/RegisterLayout'
import Profile from './pages/Profile'
import SetPassword from './components/signup/SetPassword'
import CheckUserForm from './components/signup/CheckUserForm'
import RequireAuth from "./components/RequireAuth"
import MainPage from "./pages/MainPage"
import ProfileLayout from "./components/layout/ProfileLayout"
import LikedProducts from "./pages/LikedProducts"
import MyProducts from "./pages/MyProducts"

export default function App() {
    return (
        <Routes>

            {/* public pages */}
            <Route element={<LoginLayout />}>
                <Route path="login" element={<Login />} />
                <Route element={<RegisterLayout />} >
                    <Route path='register' element={<CheckUserForm />} />
                    <Route path='set-password' element={<SetPassword />} />
                </Route>
            </Route>

            {/* private pages */}
            <Route element={<RequireAuth />}>
                <Route index element={<MainPage />} />
                <Route element={<ProfileLayout />} >
                    <Route path='profile' element={<Profile />} />
                    <Route path='liked-products' element={<LikedProducts />} />
                    <Route path='my-products' element={<MyProducts />} />
                </Route>
            </Route>

            {/* Missing pages */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}