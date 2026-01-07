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

    const resMessage = 
        res.status === 400 ? "401: Bad request!" :
        res.status === 401 ? "401: Unauthorized request!" :
        res.status === 403 ? "403: Forbidden request!" :
        res.status === 404 ? "404: Not found!" :
        res.status === 406 ? "406: Not acceptable request!" :
        res.status === 409 ? "409: Conflicting request!" :
        res.status === 429 ? "429: Too many requests!" :
        res.status >= 500 ? "500: Internal server error!" :
        `${res.status}: Something went wrong!`;

    // Return the data and the status code
    return {
        okay: res.ok,
        status: res.status,
        resData: resData,
        message: resData?.message ?? resMessage
        // Note: ||(logical OR): returns RHS if the LHS have any falsy value('', false, null, undefined, NaN)
        //       ??(Nullish coalescing): returns RHS if the LHS value is either null or undefined
    };

}

export default ApiClient