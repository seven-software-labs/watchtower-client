/**
 * Utils Plugin
 * 
 * A custom plugin built to include common utilities into components.
 */

import Store from "./../../store/index.js";

export default {
    install: (app) => {
        app.config.globalProperties.$auth = () => {
            return {
                user: () => Store.getters["authModule/getUser"],
            };
        };
    },
};
