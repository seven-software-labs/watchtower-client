/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

import OrganizationRoutes from "./organization-routes";
import TicketRoutes from "./ticket-routes.js";
import UserRoutes from "./user-routes";
import SettingsRoutes from "./settings-routes";

const routes = [
    {
        path: "/panel",
        name: "panel",
        redirect: { name: "panel.dashboard" },
        component: () => import("./../../../views/panel/index.vue"),
        children: [
            {
                path: "/dashboard",
                name: "panel.dashboard",
                component: () => import("./../../../views/panel/dashboard.vue"),
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