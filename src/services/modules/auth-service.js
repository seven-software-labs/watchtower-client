/**
 * Department Service
 */

import Axios from "axios";
import RequestClient from "../request-client";

const authRequestClient = Axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 5000,
    withCredentials: true,
});

const authService = {
    getCookie() {
        return authRequestClient.get("/sanctum/csrf-cookie");
    },
    login(payload = {}) {
        return this.getCookie()
            .then(() => {
                return authRequestClient.post("/login", payload);
            });
    },
    logout() {
        return authRequestClient.post("/logout");
    },
    register() {
        // ...
    },
    forgotPassword() {
        // ...
    },
    resetPassword() {
        // ...
    },
    me(payload) {
        return RequestClient.get("/me", payload);
    },
};

export default authService;