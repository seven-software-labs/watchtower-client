/**
 * Ticket Routes
 */

import TicketsIndex from "./../../../views/panel/tickets/index.vue";
import TicketsCreateEdit from "./../../../views/panel/tickets/create-edit.vue";
import TicketsShow from "./../../../views/panel/tickets/show.vue";
import LayoutContainer from "./../../../components/layouts/utils/container.vue";

const ticketRoutes = [
    {
        path: "/tickets",
        name: "tickets",
        redirect: { name: "tickets.index" },
        component: LayoutContainer,
        children: [
            {
                path: "browse",
                name: "tickets.index",
                component: TicketsIndex,
            },
            {
                path: "create",
                name: "tickets.create",
                component: TicketsCreateEdit,
            },
            {
                path: ":ticket/edit",
                name: "tickets.edit",
                component: TicketsCreateEdit,
            },
            {
                path: ":ticket/show",
                name: "tickets.show",
                component: TicketsShow,
            },
        ],
    },
];

export default ticketRoutes;