/**
 * Organization Module
 */

import BaseModule from "./base-module";
import OrganizationService from "../../services/modules/organization-service";

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

const organizationModule = BaseModule.create({
    state,
    getters,
    mutations,
    actions,
    service: OrganizationService,
});

/**
 * Build and export the created module.
 */
export default organizationModule;
