/**
 * Vuex Router
 * 
 * Global router management.
 */

import { createRouter, createWebHistory } from "vue-router";
import AuthRoutes from "./modules/auth/index.js";
import PanelRoutes from "./modules/panel/index.js";
import PublicRoutes from "./modules/public/index.js";
import IndexView from "./../views/index.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: IndexView,
        },

        ...AuthRoutes,
        ...PanelRoutes,
        ...PublicRoutes,
    ],
});

export default router;