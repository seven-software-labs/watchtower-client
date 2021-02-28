/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

import Index from "./../../../views/auth/index.vue";
import Login from "./../../../views/auth/login.vue";
import Register from "./../../../views/auth/register.vue";
import ForgotPassword from "./../../../views/auth/forgot-password.vue";
import ResetPassword from "./../../../views/auth/reset-password.vue";

const routes = [
    {
        path: "/auth",
        name: "auth",
        redirect: { name: "auth.login" },
        component: Index,
        children: [
            {
                path: "/login",
                name: "auth.login",
                component: Login,
            },
            {
                path: "/register",
                name: "auth.register",
                component: Register,
            },
            {
                path: "/forgot-password",
                name: "auth.forgot-password",
                component: ForgotPassword,
            },
            {
                path: "/reset-password/:token",
                name: "auth.reset-password",
                component: ResetPassword,
            },
        ],
    },
];

export default routes;