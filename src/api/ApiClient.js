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
        resData: resData,
        message: resData?.message ?? res?.statusText
        // Note: ||(logical OR): returns RHS if the LHS have any falsy value('', false, null, undefined, NaN)
        //       ??(Nullish coalescing): returns RHS if the LHS value is either null or undefined
    };

}

export default ApiClient