/**
 * HTTP Request Client
 */

import Axios from "axios";
import Cookie from "js-cookie";

const requestClient = Axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    timeout: 3000,
});

// Add a request interceptor
requestClient.interceptors.request.use(function (config) {
    config.headers["Authorization"] = "Bearer " + Cookie.get("access_token");
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
requestClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if(error.response.status == 401) {
        localStorage.clear();
        window.location.href = "/login";
    }
    
    return Promise.reject(error);
});

export default requestClient;