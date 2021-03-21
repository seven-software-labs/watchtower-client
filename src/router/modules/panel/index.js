/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

import Index from "./../../../views/panel/index.vue";
import Dashboard from "./../../../views/panel/dashboard.vue";
import OrganizationRoutes from "./organization-routes";
import TicketRoutes from "./ticket-routes.js";
import UserRoutes from "./user-routes";
import SettingsRoutes from "./settings-routes";

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
                meta: { auth: true },
            },
            ...OrganizationRoutes,
            ...TicketRoutes,
            ...UserRoutes,
            ...SettingsRoutes,
        ],
    },
];

export default routes;