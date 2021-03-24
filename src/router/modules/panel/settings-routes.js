/**
 * Settings Routes
 */

const organizationRoutes = [
    {
        path: "/settings",
        name: "settings",
        redirect: { name: "settings.channels.index" },
        component: () => import("./../../../views/panel/settings/index.vue"),
        children: [
            {
                path: "channels",
                name: "settings.channels",
                redirect: { name: "settings.channels.index" },
                component: () => import("./../../../components/layouts/utils/container.vue"),
                children: [
                    {
                        path: "browse",
                        name: "settings.channels.index",
                        component: () => import("./../../../views/panel/settings/channels/index.vue"),
                    },
                    {
                        path: "create",
                        name: "settings.channels.create",
                        component: () => import("./../../../views/panel/settings/channels/create-edit.vue"),
                    },
                    {
                        path: ":channel/edit",
                        name: "settings.channels.edit",
                        component: () => import("./../../../views/panel/settings/channels/create-edit.vue"),
                    },
                ],
            },
            {
                path: "departments",
                name: "settings.departments",
                redirect: { name: "settings.departments.index" },
                component: () => import("./../../../components/layouts/utils/container.vue"),
                children: [
                    {
                        path: "browse",
                        name: "settings.departments.index",
                        component: () => import("./../../../views/panel/settings/departments/index.vue"),
                    },
                    {
                        path: "create",
                        name: "settings.departments.create",
                        component: () => import("./../../../views/panel/settings/departments/create-edit.vue"),
                    },
                    {
                        path: ":department/edit",
                        name: "settings.departments.edit",
                        component: () => import("./../../../views/panel/settings/departments/create-edit.vue"),
                    },
                ],
            },
            {
                path: "priorities",
                name: "settings.priorities",
                redirect: { name: "settings.priorities.index" },
                component: () => import("./../../../components/layouts/utils/container.vue"),
                children: [
                    {
                        path: "browse",
                        name: "settings.priorities.index",
                        component: () => import("./../../../views/panel/settings/priorities/index.vue"),
                    },
                    {
                        path: "create",
                        name: "settings.priorities.create",
                        component: () => import("./../../../views/panel/settings/priorities/create-edit.vue"),
                    },
                    {
                        path: ":priority/edit",
                        name: "settings.priorities.edit",
                        component: () => import("./../../../views/panel/settings/priorities/create-edit.vue"),
                    },
                ],
            },
            {
                path: "statuses",
                name: "settings.statuses",
                redirect: { name: "settings.statuses.index" },
                component: () => import("./../../../components/layouts/utils/container.vue"),
                children: [
                    {
                        path: "browse",
                        name: "settings.statuses.index",
                        component: () => import("./../../../views/panel/settings/statuses/index.vue"),
                    },
                    {
                        path: "create",
                        name: "settings.statuses.create",
                        component: () => import("./../../../views/panel/settings/statuses/create-edit.vue"),
                    },
                    {
                        path: ":status/edit",
                        name: "settings.statuses.edit",
                        component: () => import("./../../../views/panel/settings/statuses/create-edit.vue"),
                    },
                ],
            },
        ],
    },
];

export default organizationRoutes;