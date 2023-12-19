import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from'./pages/NotFount'
import RegisterLayout from './components/RegisterLayout'
import Profile from './pages/Profile'
import AuthRequired from './components/AuthRequired'
import SetPassword from './components/signup/SetPassword'
import CheckUserForm from './components/signup/CheckUserForm'

const UserContext = React.createContext()

function App() {
    const [user, setUser] = React.useState({})

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
                        <Route path='register' element={<RegisterLayout />} >
                            <Route index element={<CheckUserForm />} />
                            <Route path='set-password' element={<SetPassword />} />
                        </Route>
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