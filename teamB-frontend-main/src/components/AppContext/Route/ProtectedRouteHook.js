import { useContext } from "react";
import {AuthState} from "../Context";
const useProtectedRoutePolicy = () => {
    const { user, setUser } = useContext(AuthState)
    return {
        user,
        setUser
    }
}
export default useProtectedRoutePolicy