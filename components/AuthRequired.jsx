import React from "react"
import { Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext"

export default function AuthRequired() {
    const { auth } = React.useContext(AuthContext) 
    
    if (auth.access) {
        return <Outlet />
    }
}