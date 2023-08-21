import { useState } from "react"
import { useUser } from "../context/user";

const useLogoutUser = () => {
    const { logoutUser } = useUser()
    const [isLoading, setIsLoading] = useState(false);

    const logout = async (credentials) => {
        setIsLoading(true);
        try {
            logoutUser();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        logout, isLoading
    }
}

export default useLogoutUser;