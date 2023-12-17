import React from "react"
import { Outlet } from "react-router-dom"
import { UserContext } from ".."

export default function AuthRequired() {
    const {user} = React.useContext(UserContext) 
    
    if (user.access) {
        return <Outlet />
    }
}