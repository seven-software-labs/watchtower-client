/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

import Index from "./../../../views/panel/index.vue";
import Dashboard from "./../../../views/panel/dashboard.vue";

const routes = [
    {
        path: "/panel",
        name: "panel",
        redirect: { name: "panel.dashboard" },
        component: Index,
        children: [
            {
                path: "/dashboard",
                name: "panel.dashboard",
                component: Dashboard,
            },
        ],
    },
];

export default routes;