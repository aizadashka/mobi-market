import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AuthRequired from './components/AuthRequired'

const UserContext = React.createContext()

function App() {
    const [user, setUser] = React.useState({ 
        username: "", 
        email: '',
        photo: '',
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
                    <Route path="/*" element={<Layout />}>
                        <Route index element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route element={<AuthRequired /> }>
                        <Route path='/profile' element={<Profile />} />
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