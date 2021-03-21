/**
 * Authentication Routes.
 * 
 * Routes that are related to the authentication process.
 */

import ForgotPassword from "./../../../views/auth/forgot-password.vue";
import LayoutContainer from "./../../../components/layouts/utils/container.vue";
import Login from "./../../../views/auth/login.vue";
import Logout from "./../../../views/auth/logout.vue";
import Register from "./../../../views/auth/register.vue";
import ResetPassword from "./../../../views/auth/reset-password.vue";

const routes = [
    {
        path: "/auth",
        name: "auth",
        redirect: { name: "auth.login" },
        component: LayoutContainer,
        children: [
            {
                path: "/login",
                name: "auth.login",
                component: Login,
                meta: { auth: "block" },
            },
            {
                path: "/logout",
                name: "auth.logout",
                component: Logout,
                meta: { auth: "block" },
            },
            {
                path: "/forgot-password",
                name: "auth.forgot-password",
                component: ForgotPassword,
                meta: { auth: "block" },
            },
            {
                path: "/register",
                name: "auth.register",
                component: Register,
                meta: { auth: "block" },
            },
            {
                path: "/reset-password/:token",
                name: "auth.reset-password",
                component: ResetPassword,
                meta: { auth: "block" },
            },
        ],
    },
];

export default routes;