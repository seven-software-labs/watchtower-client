/**
 * HTTP Request Client
 */

import Axios from "axios";
import Router from "./../router/index";

const requestClient = Axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 5000,
    withCredentials: true,
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
        Router.push({ name: "auth.login" });
    }

    // error.response.status == 401;
    if(error.response.status == 401) {
        Router.push({ name: "auth.login" });
    }
    
    return Promise.reject(error);
});

export default requestClient;