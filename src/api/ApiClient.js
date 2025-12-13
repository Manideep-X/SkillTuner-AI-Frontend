const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const ApiClient = async (path, options = {}) => {

    // fetching response from the endpoint
    const res = await fetch(`${BACKEND_URL}/${path}`, {
        credentials: "include",
        ...options
    })

    // Need to check if it includes any JSON content
    const contentType = res.headers.get("content-type");
    let resData = null;
    if (contentType?.includes("application/json")) {
        try {
            resData = await res.json();
        } catch {
            resData = null;
        }
    }

    // Return the data and the status code
    return {
        okay: res.ok,
        status: res.status,
        message: resData !== null 
            ? 
                (resData.message !== null ? resData.message : resData) 
            : 
                res.statusText
    };

}

export default ApiClient