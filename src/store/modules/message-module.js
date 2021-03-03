/**
 * Message Module
 */

import BaseModule from "./base-module";
import MessageService from "../../services/modules/message-service";

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

const messageModule = BaseModule.create({
    state,
    getters,
    mutations,
    actions,
    service: MessageService,
});

/**
 * Build and export the created module.
 */
export default messageModule;
