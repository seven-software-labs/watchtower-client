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
            storeItem: (payload = {}) => new Promise((resolve, reject) => {
                return RequestClient.post(`/${endpoint}`, payload)
                    .then((response) => resolve(response.data))
                    .catch((error) => reject(error));
            }),
            updateItem(id, payload = {}) {
                return RequestClient.put(`/${endpoint}/${id}`, payload);
            },
            deleteItem(id, payload = {}) {
                return RequestClient.delete(`/${endpoint}/${id}`, payload);
            },
            ...customFunctions,
        };
    },
};

export default baseService;