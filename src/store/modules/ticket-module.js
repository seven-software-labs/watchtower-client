/**
 * Ticket Module
 */

import BaseModule from "./base-module";
import TicketService from "../../services/modules/ticket-service";

/**
 * Generate the default state.
 */
const getDefaultState = () => {
    // ...
};

/**
 * The state for the module.
 */
const state = getDefaultState();

/**
 * The getters available for this module.
 */
const getters = {
    // ...
};

/**
 * The mutations available for this module.
 */
const mutations = {
    // ...
};

/**
 * The actions available for this module.
 */
const actions = {
    // ...
};

const ticketModule = BaseModule.create({
    state,
    getters,
    mutations,
    actions,
    service: TicketService,
});

/**
 * Build and export the created module.
 */
export default ticketModule;
