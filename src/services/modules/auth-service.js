import Axios from "axios";
import Cookie from "js-cookie";
import AuthedRequestClient from "./../request-client";

class AuthService {
    /**
     * Create a new AuthService instance.
     * 
     * @return void
     */
    constructor() {
        this.authedRequestClient = AuthedRequestClient;

        this.requestClient = Axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }

    /**
     * Set the authentication cookies in the browser.
     * 
     * @param { Object } response
     * @return void
     */
    setCookies({ access_token, expires_in, refresh_token }) {
        Cookie.set("access_token", access_token);
        Cookie.set("expires_in", expires_in);
        Cookie.set("refresh_token", refresh_token);
    }

    /**
     * Remove authentication cookies in the browser.
     * 
     * @return void
     */
    removeCookies() {
        Cookie.remove("access_token");
        Cookie.remove("expires_in");
        Cookie.remove("refresh_token");
    }

    /**
     * Request for an authentication token.
     * 
     * @param { Object } payload
     * @return { Promise }
     */
    login(payload) {
        return new Promise((resolve, reject) => {
            payload = {
                "grant_type": "password",
                "client_id": import.meta.env.VITE_CLIENT_ID,
                "client_secret": import.meta.env.VITE_CLIENT_SECRET,
                "scope": "*",
                ...payload,
            };

            const handleSuccess = (response) => {
                this.setCookies(response.data);
                resolve(response);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            this.requestClient.post("/oauth/token", payload)
                .then(handleSuccess)
                .catch(handleFailure);
        });
    }

    /**
     * Request for a new account.
     * 
     * @param { Object } payload
     * @return { Promise }
     */
    register(payload = {}) {
        return new Promise((resolve, reject) => {
            const handleSuccess = (response) => {
                resolve(response);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            this.requestClient.post("/api/register", payload)
                .then(handleSuccess)
                .catch(handleFailure);
        });
    }

    /**
     * Fetch the currently authenticated user.
     * 
     * @return { Promise }
     */
    fetchUser() {
        return this.authedRequestClient.get("/me");
    }

    /**
     * Update the currently authenticated user's profile.
     * 
     * @return { Promise }
     */
    updateProfile(payload = {}) {
        return this.authedRequestClient.patch("/me/profile/update", payload);
    }

    /**
     * Update the currently authenticated user's password.
     * 
     * @return { Promise }
     */
    updatePassword(payload = {}) {
        return this.authedRequestClient.patch("/me/password/update", payload);
    }    

    /**
     * Request for an authentication token.
     * 
     * @param { Object } payload
     * @return { Promise }
     */
    refreshToken() {
        return new Promise((resolve, reject) => {
            const payload = {
                "grant_type": "refresh_token",
                "refresh_token": Cookie.get("refresh_token"),
                "client_id": import.meta.env.VITE_CLIENT_ID,
                "client_secret": import.meta.env.VITE_CLIENT_SECRET,
                "scope": "*",
                ...payload,
            };

            const handleSuccess = (response) => {
                this.setCookies(response.data);
                resolve(response);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            this.requestClient.post("/oauth/token", payload)
                .then(handleSuccess)
                .catch(handleFailure);
        });
    }

    /**
     * Determine if the current user is authenticated.
     * 
     * @return { Promise }
     */
    check() {
        return new Promise((resolve, reject) => {
            const handleSuccess = (response) => {
                const { check: isLoggedIn } = response.data;
                
                if(!isLoggedIn) {
                    this.removeCookies();
                    return reject({ message: "Unauthenticated." });
                }

                return resolve(response);
            };

            const handleFailure = (error) => {
                return reject(error);
            };

            this.authedRequestClient.post("/check")
                .then(handleSuccess)
                .catch(handleFailure);
        });
    }
}

export default AuthService;
