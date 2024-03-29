import React from "react"
import NavBar from "../NavBar"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
    return (
        <div className="site-wrapper">
            <NavBar />
            <Outlet />
        </div>
    )
}