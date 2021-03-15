/**
 * User Routes
 */

import AccountIndex from "./../../../views/panel/account/index.vue";
import AccountProfile from "./../../../views/panel/account/profile.vue";
import AccountSettings from "./../../../views/panel/account/settings.vue";
import UserIndex from "./../../../views/panel/users/index.vue";
import UserCreateEdit from "./../../../views/panel/users/create-edit.vue";
import LayoutContainer from "./../../../components/layouts/utils/container.vue";

const userRoutes = [
    {
        path: "/users",
        name: "users",
        redirect: { name: "users.index" },
        component: LayoutContainer,
        children: [
            {
                path: "browse",
                name: "users.index",
                component: UserIndex,
            },
            {
                path: "create",
                name: "users.create",
                component: UserCreateEdit,
            },
            {
                path: ":user/edit",
                name: "users.edit",
                component: UserCreateEdit,
            },
        ],
    },
    {
        path: "/account",
        name: "account",
        redirect: { name: "account.profile" },
        component: AccountIndex,
        children: [
            {
                path: "profile",
                name: "account.profile",
                component: AccountProfile,
            },
            {
                path: "settings",
                name: "account.settings",
                component: AccountSettings,
            }
        ],
    },
];

export default userRoutes;