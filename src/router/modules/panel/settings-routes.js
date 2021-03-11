/**
 * Settings Routes
 */

import LayoutContainer from "./../../../components/layouts/utils/container.vue";
import ChannelsCreateEdit from "./../../../views/panel/settings/channels/create-edit.vue";
import ChannelsIndex from "./../../../views/panel/settings/channels/index.vue";
import DepartmentsCreateEdit from "./../../../views/panel/settings/departments/create-edit.vue";
import DepartmentsIndex from "./../../../views/panel/settings/departments/index.vue";
import PrioritiesCreateEdit from "./../../../views/panel/settings/priorities/create-edit.vue";
import PrioritiesIndex from "./../../../views/panel/settings/priorities/index.vue";
import StatusesCreateEdit from "./../../../views/panel/settings/statuses/create-edit.vue";
import StatusesIndex from "./../../../views/panel/settings/statuses/index.vue";
import SettingsIndex from "./../../../views/panel/settings/index.vue";

const organizationRoutes = [
    {
        path: "/settings",
        name: "settings",
        redirect: { name: "settings.channels.index" },
        component: SettingsIndex,
        children: [
            {
                path: "channels",
                name: "settings.channels",
                redirect: { name: "settings.channels.index" },
                component: LayoutContainer,
                children: [
                    {
                        path: "browse",
                        name: "settings.channels.index",
                        component: ChannelsIndex,
                    },
                    {
                        path: "create",
                        name: "settings.channels.create",
                        component: ChannelsCreateEdit,
                    },
                    {
                        path: ":channel/edit",
                        name: "settings.channels.edit",
                        component: ChannelsCreateEdit,
                    },
                ],
            },
            {
                path: "departments",
                name: "settings.departments",
                redirect: { name: "settings.departments.index" },
                component: LayoutContainer,
                children: [
                    {
                        path: "browse",
                        name: "settings.departments.index",
                        component: DepartmentsIndex,
                    },
                    {
                        path: "create",
                        name: "settings.departments.create",
                        component: DepartmentsCreateEdit,
                    },
                    {
                        path: ":department/edit",
                        name: "settings.departments.edit",
                        component: DepartmentsCreateEdit,
                    },
                ],
            },
            {
                path: "priorities",
                name: "settings.priorities",
                redirect: { name: "settings.priorities.index" },
                component: LayoutContainer,
                children: [
                    {
                        path: "browse",
                        name: "settings.priorities.index",
                        component: PrioritiesIndex,
                    },
                    {
                        path: "create",
                        name: "settings.priorities.create",
                        component: PrioritiesCreateEdit,
                    },
                    {
                        path: ":priority/edit",
                        name: "settings.priorities.edit",
                        component: PrioritiesCreateEdit,
                    },
                ],
            },
            {
                path: "statuses",
                name: "settings.statuses",
                redirect: { name: "settings.statuses.index" },
                component: LayoutContainer,
                children: [
                    {
                        path: "browse",
                        name: "settings.statuses.index",
                        component: StatusesIndex,
                    },
                    {
                        path: "create",
                        name: "settings.statuses.create",
                        component: StatusesCreateEdit,
                    },
                    {
                        path: ":status/edit",
                        name: "settings.statuses.edit",
                        component: StatusesCreateEdit,
                    },
                ],
            },
        ],
    },
];

export default organizationRoutes;