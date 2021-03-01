/**
 * Organization Routes
 */

import OrganizationList from "./../../../views/panel/organizations/list.vue";
import OrganizationCreateEdit from "./../../../views/panel/organizations/create-edit.vue";

const organizationRoutes = [
    {
        path: "/organizations",
        name: "organizations.list",
        component: OrganizationList,
    },
    {
        path: "/organizations/create",
        name: "organizations.create",
        component: OrganizationCreateEdit,
    },
    {
        path: "/organizations/:organization/edit",
        name: "organizations.edit",
        component: OrganizationCreateEdit,
    },
];

export default organizationRoutes;