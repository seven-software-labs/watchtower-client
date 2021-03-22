/**
 * User Routes
 */

const userRoutes = [
    {
        path: "/users",
        name: "users",
        redirect: { name: "users.index" },
        component: () => import("./../../../components/layouts/utils/container.vue"),
        children: [
            {
                path: "browse",
                name: "users.index",
                component: () => import("./../../../views/panel/users/index.vue"),
            },
            {
                path: "create",
                name: "users.create",
                component: () => import("./../../../views/panel/users/create-edit.vue"),
            },
            {
                path: ":user/edit",
                name: "users.edit",
                component: () => import("./../../../views/panel/users/create-edit.vue"),
            },
        ],
    },
    {
        path: "/account",
        name: "account",
        redirect: { name: "account.profile" },
        component: () => import("./../../../views/panel/account/index.vue"),
        children: [
            {
                path: "profile",
                name: "account.profile",
                component: () => import("./../../../views/panel/account/profile.vue"),
            },
            {
                path: "settings",
                name: "account.settings",
                component: () => import("./../../../views/panel/account/settings.vue"),
            }
        ],
    },
];

export default userRoutes;