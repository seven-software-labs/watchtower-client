/**
 * Department Module
 */

import BaseModule from "./base-module";
import DepartmentService from "../../services/modules/department-service";

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

const departmentModule = BaseModule.create({
    state,
    getters,
    mutations,
    actions,
    service: DepartmentService,
});

/**
 * Build and export the created module.
 */
export default departmentModule;
