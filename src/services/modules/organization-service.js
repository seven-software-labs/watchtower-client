/**
 * Organization Service
 */

import RequestClient from "../request-client";
import BaseService from "./base-service";
import Cookies from "js-cookie";

// Get the user from the stored cookie.
const user = JSON.parse(Cookies.get("user"));

const organizationService = BaseService.create("organizations", {
    channels() {
        return BaseService.create(`organizations/${user.primary_organization.id}/channels`, {
            attachItem(payload) {
                return RequestClient.post(`/organizations/${user.primary_organization.id}/channels/attach`, payload);
            },
            updateAttachedItem(pivot_id, payload) {
                return RequestClient.post(`/organizations/${user.primary_organization.id}/channels/${pivot_id}/update`, payload);
            },
            fetchAttachedItem(pivot_id, payload = {}) {
                return RequestClient.get(`/organizations/${user.primary_organization.id}/channels/${pivot_id}`, { params: payload });
            },
        });
    },
    departments() {
        return BaseService.create(`organizations/${user.primary_organization.id}/departments`, {
            // ...
        });
    },
    messages() {
        return BaseService.create(`organizations/${user.primary_organization.id}/messages`, {
            // ...
        });
    },
    organizations() {
        return BaseService.create(`organizations/${user.primary_organization.id}/organizations`, {
            // ...
        });
    },
    priorities() {
        return BaseService.create(`organizations/${user.primary_organization.id}/priorities`, {
            // ...
        });
    },
    statuses() {
        return BaseService.create(`organizations/${user.primary_organization.id}/statuses`, {
            // ...
        });
    },
    tickets() {
        return BaseService.create(`organizations/${user.primary_organization.id}/tickets`, {
            // ...
        });
    },
    users() {
        return BaseService.create(`organizations/${user.primary_organization.id}/users`, {
            // ...
        });
    },
});

export default organizationService;