import { useState } from "react"
import { API } from "../api";
import { useUser } from "../context/user";

const useLoginUser = () => {
    const { loginUser } = useUser()
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await API.login(credentials);
            loginUser(response.data.token, response.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        login, isLoading
    }
}

export default useLoginUser;