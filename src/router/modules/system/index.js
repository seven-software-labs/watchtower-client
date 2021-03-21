/**
 * System Routes.
 * 
 * Routes that belong to the system.
 */

import Container from "./../../../components/layouts/utils/container.vue";
import Error from "./../../../views/system/error.vue";

const systemRoutes = [
    {
        path: "/system",
        name: "system",
        redirect: { name: "system.error", params: { code: 404 } },
        component: Container,
        children: [
            {
                path: "/error/:code",
                name: "system.error",
                component: Error,
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "system.error", params: { code: 404 } },
    },
];

export default systemRoutes;
