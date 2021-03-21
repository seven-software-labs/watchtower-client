/**
 * Vuex Router
 * 
 * Global router management.
 */

import { createRouter, createWebHistory } from "vue-router";
import AuthRoutes from "./modules/auth/index.js";
import PanelRoutes from "./modules/panel/index.js";
import PublicRoutes from "./modules/public/index.js";
import SystemRoutes from "./modules/system/index.js";
// import AuthService from "./../services/modules/auth-service";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...AuthRoutes,
        ...PanelRoutes,
        ...PublicRoutes,
        ...SystemRoutes,
    ],
});

// router.beforeEach((to, from, next) => {
//     AuthService.ping()
//         .finally(() => {
//             next();
//         });
// });

export default router;