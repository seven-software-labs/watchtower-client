/**
 * HTTP Request Client
 */

import Axios from "axios";
import Cookie from "js-cookie";
import Router from "./../router/index";

const requestClient = Axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    timeout: 5000,
    headers: {
        "Authorization": `Bearer ${Cookie.get("access_token")}`,
    },
});

// Add a request interceptor
requestClient.interceptors.request.use(function (config) {
    // Do something before request is sent
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
    if(error.response.data.message == "Unauthenticated.") {
        // Router.push({ name: "auth.login" });
    }

    if(error.response.status == 401) {
        // Router.push({ name: "auth.login" });
    }
    
    return Promise.reject(error);
});

export default requestClient;