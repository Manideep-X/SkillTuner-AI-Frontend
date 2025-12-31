// Handles error status codes and returns the operation and action needed to be performed
const ErrorHandling = (status, signout) => {

    let result = { toast: null, action: null };

    // haven't really decided what to do for this error
    // if (status >= 500) {}
    
    if (status >= 400) {
        if (status === 401 || status === 403) {
            if (status === 401)
                signout(); // For expired/empty JWT token
            result.toast = "error";
            result.action = "/signin";
        }
        else if (status === 404) {
            result.toast = "warning";
            result.action = "/user/home";
        }
        return result;
    }

    return result;

}

export default ErrorHandling