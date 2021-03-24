/**
 * Utils Plugin
 * 
 * A custom plugin built to include common utilities into components.
 */

import AuthService from "./../../services/modules/auth-service";
import Store from "./../../store/index";

export default {
    install: (app) => {
        app.config.globalProperties.$auth = new AuthService();
        app.config.globalProperties.$me = {
            user: () => Store.getters["getUser"],
            fetchUser: () => Store.dispatch("fetchUser"),
        };
    },
};
