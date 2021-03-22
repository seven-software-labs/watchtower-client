/**
 * Ticket Routes
 */

const ticketRoutes = [
    {
        path: "/tickets",
        name: "tickets",
        redirect: { name: "tickets.index" },
        component: () => import("./../../../components/layouts/utils/container.vue"),
        children: [
            {
                path: "browse",
                name: "tickets.index",
                component: () => import("./../../../views/panel/tickets/index.vue"),
            },
            {
                path: "create",
                name: "tickets.create",
                component: () => import("./../../../views/panel/tickets/create-edit.vue"),
            },
            {
                path: ":ticket/edit",
                name: "tickets.edit",
                component: () => import("./../../../views/panel/tickets/create-edit.vue"),
            },
            {
                path: ":ticket/show",
                name: "tickets.show",
                component: () => import("./../../../views/panel/tickets/show.vue"),
            },
        ],
    },
];

export default ticketRoutes;