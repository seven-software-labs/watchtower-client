/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

const routes = [
    {
        path: "/auth",
        name: "auth",
        redirect: { name: "auth.login" },
        component: () => import("./../../../components/layouts/utils/container.vue"),
        children: [
            {
                path: "/login",
                name: "auth.login",
                component: () => import("./../../../views/auth/login.vue"),
                meta: { auth: "block" },
            },
            {
                path: "/logout",
                name: "auth.logout",
                component: () => import("./../../../views/auth/logout.vue"),
                meta: { auth: "block" },
            },
            {
                path: "/forgot-password",
                name: "auth.forgot-password",
                component: () => import("./../../../views/auth/forgot-password.vue"),
                meta: { auth: "block" },
            },
            {
                path: "/register",
                name: "auth.register",
                component: () => import("./../../../views/auth/register.vue"),
                meta: { auth: "block" },
            },
            {
                path: "/reset-password/:token",
                name: "auth.reset-password",
                component: () => import("./../../../views/auth/reset-password.vue"),
                meta: { auth: "block" },
            },
        ],
    },
];

export default routes;