/**
 * Ticket Routes
 */

import TicketList from "./../../../views/panel/tickets/list.vue";
import TicketCreate from "./../../../views/panel/tickets/create.vue";
import TicketShow from "./../../../views/panel/tickets/show.vue";

const ticketRoutes = [
    {
        path: "/tickets",
        name: "tickets.list",
        component: TicketList,
    },
    {
        path: "/tickets/create",
        name: "tickets.create",
        component: TicketCreate,
    },
    {
        path: "/tickets/:ticket/show",
        name: "tickets.show",
        component: TicketShow,
    },
];

export default ticketRoutes;