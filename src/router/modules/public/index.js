/**
 * Authentication Routes.
 * 
 * Routes that are available to the public.
 */

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
        component: () => import("./../../../views/public/home/index.vue"),
        meta: {
            auth: false,
        },
    },
];

export default routes;