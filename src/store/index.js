/**
 * Vuex Store
 * 
 * Global state management.
 */

import { createStore } from "vuex";
import AuthService from "./../services/modules/auth-service";
import ChannelModule from "./modules/channel-module.js";
import DepartmentModule from "./modules/department-module.js";
import MessageModule from "./modules/message-module.js";
import OrganizationModule from "./modules/organizations-module.js";
import StatusModule from "./modules/status-module.js";
import PriorityModule from "./modules/priority-module.js";
import ServiceModule from "./modules/service-module.js";
import TicketModule from "./modules/ticket-module.js";
import UserModule from "./modules/user-module.js";

const auth = new AuthService();

const getDefaultState = () => ({
    user: null,
});

// Create a new store instance.
const store = createStore({
    state: getDefaultState(),

    getters: {
        getUser(currentState) {
            return currentState.user;
        },
    },

    mutations: {
        resetState(currentState) {
            currentState = getDefaultState();
        },
        setUser(currentState, user) {
            currentState.user = user;
        },
    },

    actions: {
        RESET_MODULE({ commit }) {
            return new Promise((resolve, reject) => {
                try {
                    commit("resetState");
                } catch(err) {
                    reject(err);
                }
            });
        },
        fetchUser({ commit }) {
            return new Promise((resolve, reject) => {
                const handleSuccess = (response) => {
                    commit("setUser", response.data.data);
                }

                const handleFailure = (error) => {
                    reject(error);
                }

                auth.fetchUser()
                    .then(handleSuccess)
                    .catch(handleFailure);
            });
        },
    },

    modules: {
        channelModule: ChannelModule,
        statusModule: StatusModule,
        departmentModule: DepartmentModule,
        messageModule: MessageModule,
        organizationModule: OrganizationModule,
        priorityModule: PriorityModule,
        serviceModule: ServiceModule,
        ticketModule: TicketModule,
        userModule: UserModule
    },
});

export default store;
