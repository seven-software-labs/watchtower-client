/**
 * Organization Service
 */

// import RequestClient from "../request-client";
import BaseService from "./base-service";
import Cookies from "js-cookie";

// Get the user from the stored cookie.
const user = JSON.parse(Cookies.get("user")) || { organization: {} };

const organizationService = BaseService.create("organizations", {
    channels() {
        return BaseService.create(`organizations/${user.organization?.id}/channels`, {
            // ...
        });
    },
    departments() {
        return BaseService.create(`organizations/${user.organization?.id}/departments`, {
            // ...
        });
    },
    messages() {
        return BaseService.create(`organizations/${user.organization?.id}/messages`, {
            // ...
        });
    },
    organizations() {
        return BaseService.create(`organizations/${user.organization?.id}/child-organizations`, {
            // ...
        });
    },
    priorities() {
        return BaseService.create(`organizations/${user.organization?.id}/priorities`, {
            // ...
        });
    },
    statuses() {
        return BaseService.create(`organizations/${user.organization?.id}/statuses`, {
            // ...
        });
    },
    tickets() {
        return BaseService.create(`organizations/${user.organization?.id}/tickets`, {
            // ...
        });
    },
    users() {
        return BaseService.create(`organizations/${user.organization?.id}/users`, {
            // ...
        });
    },
});

export default organizationService;