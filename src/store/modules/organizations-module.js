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
    modules: {
        channelModule: BaseModule.create({
            service: OrganizationService.channels(),
        }),
        departmentModule: BaseModule.create({
            service: OrganizationService.departments(),
        }),
        messageModule: BaseModule.create({
            service: OrganizationService.messages(),
        }),
        organizationModule: BaseModule.create({
            service: OrganizationService.organizations(),
        }),
        prioritieModule: BaseModule.create({
            service: OrganizationService.priorities(),
        }),
        statusModule: BaseModule.create({
            service: OrganizationService.statuses(),
        }),
        ticketModule: BaseModule.create({
            service: OrganizationService.tickets(),
        }),
        userModule: BaseModule.create({
            service: OrganizationService.users(),
        }),
    },
    service: OrganizationService,
});

/**
 * Build and export the created module.
 */
export default organizationModule;
