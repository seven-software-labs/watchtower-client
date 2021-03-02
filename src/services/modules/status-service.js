/**
 * Status Service
 */

import requestClient from "../request-client";

const statusService = {
    fetchAllItems(payload) {
        return requestClient.get("/statuses", { params: payload });
    },
    fetchItem(id, payload) {
        return requestClient.get(`/statuses/${id}`, { params: payload });
    },
};

export default statusService;