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
            },
            {
                path: "/logout",
                name: "auth.logout",
                component: Logout,
            },
            {
                path: "/forgot-password",
                name: "auth.forgot-password",
                component: ForgotPassword,
            },
            {
                path: "/register",
                name: "auth.register",
                component: Register,
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