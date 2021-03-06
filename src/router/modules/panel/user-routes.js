/**
 * User Routes
 */

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
];

export default userRoutes;