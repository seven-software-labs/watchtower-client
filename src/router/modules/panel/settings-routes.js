/**
 * Settings Routes
 */

import ChannelsList from "./../../../views/panel/settings/channels/list.vue";
import ChannelsCreateEdit from "./../../../views/panel/settings/channels/create-edit.vue";
import SettingsIndex from "./../../../views/panel/settings/index.vue";

const organizationRoutes = [
    {
        path: "/settings",
        name: "settings",
        redirect: { name: "settings.channels.list" },
        component: SettingsIndex,
        children: [
            {
                path: "channels",
                name: "settings.channels.list",
                component: ChannelsList,
            },
            {
                path: "channels/create",
                name: "settings.channels.create",
                component: ChannelsCreateEdit,
            },
            {
                path: "channels/:pivot_id/edit",
                name: "settings.channels.edit",
                component: ChannelsCreateEdit,
            },
        ],
    },
];

export default organizationRoutes;