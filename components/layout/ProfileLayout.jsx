import React from "react"
import NavBar from "../NavBar"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
    return (
        <>
            <NavBar />
            <main>
                { < Outlet />}
            </main>
        </>
    )
}