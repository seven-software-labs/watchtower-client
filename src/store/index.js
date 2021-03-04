/**
 * Vuex Store
 * 
 * Global state management.
 */

import { createStore } from "vuex";
import AuthModule from "./modules/auth-module.js";
import DepartmentModule from "./modules/department-module.js";
import MessageModule from "./modules/message-module.js";
import StatusModule from "./modules/status-module.js";
import PriorityModule from "./modules/priority-module.js";
import TicketModule from "./modules/ticket-module.js";

// Create a new store instance.
const store = createStore({
    modules: {
        authModule: AuthModule,
        statusModule: StatusModule,
        departmentModule: DepartmentModule,
        messageModule: MessageModule,
        priorityModule: PriorityModule,
        ticketModule: TicketModule,
    },
});

export default store;
