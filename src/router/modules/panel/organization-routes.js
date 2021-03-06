/**
 * Organization Routes
 */

import OrganizationIndex from "./../../../views/panel/organizations/index.vue";
import OrganizationCreateEdit from "./../../../views/panel/organizations/create-edit.vue";
import LayoutContainer from "./../../../components/layouts/utils/container.vue";

const organizationRoutes = [
    {
        path: "/organizations",
        name: "organizations",
        redirect: { name: "organizations.index" },
        component: LayoutContainer,
        children: [
            {
                path: "browse",
                name: "organizations.index",
                component: OrganizationIndex,
            },
            {
                path: "create",
                name: "organizations.create",
                component: OrganizationCreateEdit,
            },
            {
                path: ":organization/edit",
                name: "organizations.edit",
                component: OrganizationCreateEdit,
            },
        ],
    },
];

export default organizationRoutes;