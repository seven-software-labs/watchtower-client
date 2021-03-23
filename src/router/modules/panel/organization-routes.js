/**
 * Organization Routes
 */

const organizationRoutes = [
    {
        path: "/organizations",
        name: "organizations",
        redirect: { name: "organizations.index" },
        component: () => import("./../../../views/panel/organizations/container.vue"),
        children: [
            {
                path: "browse",
                name: "organizations.index",
                component: () => import("./../../../views/panel/organizations/index.vue"),
            },
            {
                path: "create",
                name: "organizations.create",
                component: () => import("./../../../views/panel/organizations/create.vue"),
            },
            {
                path: ":organization/edit",
                name: "organizations.edit",
                redirect: { name: "organizations.edit.general" },
                component: () => import("./../../../views/panel/organizations/edit/index.vue"),
                children: [
                    {
                        path: "general",
                        name: "organizations.edit.general",
                        component: () => import("./../../../views/panel/organizations/edit/general.vue"),
                    },
                    {
                        path: "tickets",
                        name: "organizations.edit.tickets",
                        component: () => import("./../../../views/panel/organizations/edit/tickets.vue"),
                    },
                    {
                        path: "users",
                        name: "organizations.edit.users",
                        component: () => import("./../../../views/panel/organizations/edit/users.vue"),
                    },
                ],
            },
        ],
    },
];

export default organizationRoutes;