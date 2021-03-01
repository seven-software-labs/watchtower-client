/**
 * User Routes
 */

import UserList from "./../../../views/panel/users/list.vue";
import UserCreateEdit from "./../../../views/panel/users/create-edit.vue";

const userRoutes = [
    {
        path: "/users",
        name: "users.list",
        component: UserList,
    },
    {
        path: "/users/create",
        name: "users.create",
        component: UserCreateEdit,
    },
    {
        path: "/users/:user/edit",
        name: "users.edit",
        component: UserCreateEdit,
    },
];

export default userRoutes;