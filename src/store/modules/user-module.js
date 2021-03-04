/**
 * User Module
 */

import BaseModule from "./base-module";
import UserService from "../../services/modules/user-service";

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

const userModule = BaseModule.create({
    state,
    getters,
    mutations,
    actions,
    service: UserService,
});

/**
 * Build and export the created module.
 */
export default userModule;
