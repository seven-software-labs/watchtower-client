/**
 * Base Service
 */

import RequestClient from "../request-client";

const baseService = {
    create(endpoint, customFunctions = {}) {
        return {
            fetchAllItems(payload = {}) {
                return RequestClient.get(`/${endpoint}`, { params: payload });
            },
            fetchOneItem(id, payload = {}) {
                return RequestClient.get(`/${endpoint}/${id}`, { params: payload });
            },
            storeItem(payload = {}) {
                return RequestClient.post(`/${endpoint}`, payload);
            },
            ...customFunctions,
        };
    },
};

export default baseService;