/**
 * Vuex Router
 * 
 * Global router management.
 */

import { createRouter, createWebHistory } from "vue-router";
import AuthRoutes from "./modules/auth/index.js";
import PanelRoutes from "./modules/panel/index.js";
import SystemRoutes from "./modules/system/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "public",
            redirect: { name: "auth.login" },
            meta: {
                auth: false,
            },
        },

        ...AuthRoutes,
        ...PanelRoutes,
        ...SystemRoutes,
    ],
});

router.beforeEach(async (to, from, next) => {
    next();
});

export default router;