/**
 * HTTP Request Client
 */

import Axios from "axios";

const requestClient = Axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 5000,
    withCredentials: true,
});

export default requestClient;