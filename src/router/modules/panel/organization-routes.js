/**
 * Organization Routes
 */

const organizationRoutes = [
    {
        path: "/organizations",
        name: "organizations",
        redirect: { name: "organizations.index" },
        component: () => import("./../../../components/layouts/utils/container.vue"),
        children: [
            {
                path: "browse",
                name: "organizations.index",
                component: () => import("./../../../views/panel/organizations/index.vue"),
            },
            {
                path: "create",
                name: "organizations.create",
                component: () => import("./../../../views/panel/organizations/create-edit.vue"),
            },
            {
                path: ":organization/edit",
                name: "organizations.edit",
                component: () => import("./../../../views/panel/organizations/create-edit.vue"),
            },
        ],
    },
];

export default organizationRoutes;