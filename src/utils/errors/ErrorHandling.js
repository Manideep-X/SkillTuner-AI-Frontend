// Handles error status codes and returns the operation and action needed to be performed
const ErrorHandling = (status) => {

    let result = { operation: null, action: null };

    // haven't really decided what to do for this error
    // if (status >= 500) {}
    
    if (status >= 400) {
        if (status === 401 || status === 403) {
            result.operation = "redirect";
            result.action = "/signin";
        }
        else if (status === 404) {
            result.operation = "redirect";
            result.action = "/not-found";
        }
        return result;
    }

    return result;

}

export default ErrorHandling