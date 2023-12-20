import { json } from "stream/consumers"
import axios from "../api/axios"
import useAuth from "./useAuth"

export default function useRefreshToken() {
    const { auth, setAuth } = useAuth()

    function refresh() {
        axios
            .post('users/login/refresh/', JSON.stringify({refresh: auth.refresh}), {
                withCredentials: false
            })
            .then(res => {
                setAuth(prev => {
                    return {
                        ...prev,
                        access: res.data.access
                    }
                })
                return res.data.access
            })
    }

    return refresh
}