/**
 * Vuex Store
 * 
 * Global state management.
 */

import { createStore } from "vuex";
import AuthModule from "./modules/auth-module.js";
import ChannelModule from "./modules/channel-module.js";
import DepartmentModule from "./modules/department-module.js";
import MessageModule from "./modules/message-module.js";
import OrganizationModule from "./modules/organizations-module.js";
import StatusModule from "./modules/status-module.js";
import PriorityModule from "./modules/priority-module.js";
import TicketModule from "./modules/ticket-module.js";
import UserModule from "./modules/user-module.js";

// Create a new store instance.
const store = createStore({
    modules: {
        authModule: AuthModule,
        channelModule: ChannelModule,
        statusModule: StatusModule,
        departmentModule: DepartmentModule,
        messageModule: MessageModule,
        organizationModule: OrganizationModule,
        priorityModule: PriorityModule,
        ticketModule: TicketModule,
        userModule: UserModule
    },
});

export default store;
