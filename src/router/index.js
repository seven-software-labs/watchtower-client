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
import AuthService from "./../services/modules/auth-service";

const auth = new AuthService();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...AuthRoutes,
        ...PanelRoutes,
        ...PublicRoutes,
        ...SystemRoutes,
    ],
});

router.beforeEach(async (to, from, next) => {
    next();
    // /**
    //  * Trigger router check only if the route contains 
    //  * an auth meta value.
    //  * 
    //  * Values:
    //  * True - Require authentication.
    //  * False/Undefined/Null - Public Page
    //  * Block - Redirect authenticated users.
    //  */
    // const handleAuthenticatedUser = async () => {
    //     const isLoggedIn = false;

    //     // Check if the user is logged in.
    //     await auth.check()
    //         .then((response) => {
    //             const { check: isLoggedIn } = response.data;
    //             this.isLoggedIn = isLoggedIn;
    //         })
    //         .catch((error) => {
    //             // if user is supposed to be logged in but is not.
    //             if(!to.name.includes("auth.")) {
    //                 next({ name: "auth.logout" });
    //             } else {
    //                 next();
    //             }
    //         });
        
    //     // If the user is logged in properly but the route
    //     // contains "block", redirect to dashboard.
    //     if(isLoggedIn && to.meta.auth == "block") next({ name: "panel.dashboard" })

    //     // If the user is logged in properly, proceed normally.
    //     else if(isLoggedIn) next();

    //     // Fallback
    //     else next();
    // }

    // if(to.meta.auth) {
    //     await handleAuthenticatedUser();
    // } else {
    //     next();
    // }
});

export default router;