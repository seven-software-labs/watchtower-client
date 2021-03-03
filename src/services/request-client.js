/**
 * HTTP Request Client
 */

import Axios from "axios";

const requestClient = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 5000,
});

export default requestClient;