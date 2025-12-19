import { createContext, useContext, useState } from "react"
import ApiClient from "../api/ApiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const checkStatusAndFetch = async () => {
        
        // If the user is already authenticated or A fetch is already in progress then no need of backend check
        if (authStatus === "authenticated" || authStatus === "loading") {
            return;
        }

        setAuthStatus("loading");
        // If the user is not authenticated or null then the backend needed to be checked.
        try {
            const { okay, message } = await ApiClient("user/details", {});

            if (okay) {
                setUserDetails(message);
                setAuthStatus("authenticated");
                return true;
            } else {
                setUserDetails(null);
                setAuthStatus("unauthenticated");
                return false;
            }
        // If there is error while fetching then the status will be set to unauthenticated.
        } catch {
            setUserDetails(null);
            setAuthStatus("unauthenticated");
            return false;
        }

    }

    const signout = () => {
        setUserDetails(null);
        setAuthStatus("unauthenticated");
    }

    return (
        <AuthContext.Provider value={{ authStatus, userDetails, checkStatusAndFetch, signout }} >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = useContext(AuthContext);