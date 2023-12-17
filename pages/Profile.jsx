import React from "react"
import { UserContext } from ".."
import NavBar from '../components/profile/NavBar'

export default function Profile() {
    const { user } = React.useContext(UserContext)

    return (
        <div>
            <NavBar />
        </div>
    )
}