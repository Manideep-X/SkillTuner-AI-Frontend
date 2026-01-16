import { createContext, useContext, useEffect, useState } from "react"
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    // auth status can be either null(initial), "loading", "authenticated", or "unauthenticated"
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
            const { okay, resData } = await ApiClient(ApiEndpointExtensions.userDetails, {});

            if (okay) {
                setUserDetails(resData);
                setAuthStatus("authenticated");
            } else {
                setUserDetails(null);
                setAuthStatus("unauthenticated");
            }
        // If there is error while fetching then the status will be set to unauthenticated.
        } catch (err) {
            if (err instanceof TypeError)
                toast.error("You are offline!", { toasterId: "closable", style: ToastStyle.error, description: "Please check your connection and then refresh this page" });
            setUserDetails(null);
            setAuthStatus("unauthenticated");
        }

    }

    useEffect(() => {
      if (authStatus === null) {
        checkStatusAndFetch();
      }
    }, [authStatus]);

    const signout = async () => {
        if (authStatus !== "authenticated") return;
        try {
            await ApiClient(ApiEndpointExtensions.signout, {
                method: "POST"
            });
            toast.success("Successfully signed out!", { toasterId: "global", style: ToastStyle.success });
        } catch (e) {
            toast.error(`Error occured while signing out!`, { toasterId: "global", style: ToastStyle.error });
        } finally {
            setUserDetails(null);
            setAuthStatus("unauthenticated");
        }
    }

    const signin = (userData) => {
        setUserDetails(userData);
        setAuthStatus("authenticated");
    }

    return (
        <AuthContext.Provider value={{ authStatus, userDetails, signout, signin }} >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);