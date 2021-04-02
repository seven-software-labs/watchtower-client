/**
 * User Routes
 */

const userRoutes = [
    {
        path: "/users",
        name: "users",
        redirect: { name: "users.index" },
        component: () => import("./../../../views/panel/users/container.vue"),
        children: [
            {
                path: "browse",
                name: "users.index",
                component: () => import("./../../../views/panel/users/index.vue"),
            },
            {
                path: "create",
                name: "users.create",
                component: () => import("./../../../views/panel/users/create.vue"),
            },
            {
                path: ":user/edit",
                name: "users.edit",
                redirect: { name: "users.edit.general" },
                component: () => import("./../../../views/panel/users/edit/index.vue"),
                children: [
                    {
                        path: "general",
                        name: "users.edit.general",
                        component: () => import("./../../../views/panel/users/edit/general.vue"),
                    },
                    {
                        path: "channels",
                        name: "users.edit.channels",
                        redirect: { name: "users.edit.channels.index" },
                        component: () => import("./../../../views/panel/users/edit/channels/container.vue"),
                        children: [
                            {
                                path: "browse",
                                name: "users.edit.channels.index",
                                component: () => import("./../../../views/panel/users/edit/channels/index.vue"),
                            },
                            {
                                path: "add",
                                name: "users.edit.channels.add",
                                component: () => import("./../../../views/panel/users/edit/channels/add.vue"),
                            },
                        ],
                    },
                    {
                        path: "tickets",
                        name: "users.edit.tickets",
                        component: () => import("./../../../views/panel/users/edit/tickets.vue"),
                    },
                ],
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