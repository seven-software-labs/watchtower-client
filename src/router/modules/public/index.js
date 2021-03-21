/**
 * Authentication Routes.
 * 
 * Routes that are available to the public.
 */

import Home from "./../../../views/public/home.vue";

const routes = [
    {
        path: "/",
        name: "public",
        redirect: { name: "public.home" },
        meta: {
            auth: false,
        },
    },
    {
        path: "/home",
        name: "public.home",
        component: Home,
        meta: {
            auth: false,
        },
    },
];

export default routes;