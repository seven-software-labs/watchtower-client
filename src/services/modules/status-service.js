/**
 * Status Service
 */

import RequestClient from "../request-client";
import BaseService from "./base-service";

const statusService = BaseService.create({
    fetchAllItems(payload) {
        return RequestClient.get("/statuses", { params: payload });
    },
    fetchItem(id, payload) {
        return RequestClient.get(`/statuses/${id}`, { params: payload });
    },
});

export default statusService;