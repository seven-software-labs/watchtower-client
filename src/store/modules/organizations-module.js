/**
 * Organization Module
 */

import BaseModule from "./base-module";
import OrganizationService from "../../services/modules/organization-service";
import RequestClient from "./../../services/request-client";

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
            actions: {
                attachItem: (context, payload) => new Promise((resolve, reject) => {
                    OrganizationService.channels()
                        .attachItem(payload)
                        .then((response) => {resolve(response);})
                        .catch((error) => {reject(error);});
                }),
                updateAttachedItem: (context, payload) => new Promise((resolve, reject) => {
                    OrganizationService.channels()
                        .updateAttachedItem(payload)
                        .then((response) => {resolve(response);})
                        .catch((error) => {reject(error);});
                }),
                fetchAttachedItem(context, pivot_id) {
                    return new Promise((resolve, reject) => {
                        OrganizationService.channels()
                            .fetchAttachedItem(pivot_id)
                            .then((response) => {resolve(response);})
                            .catch((error) => {reject(error);});
                    });
                },
            },
        }),
        departmentsModule: BaseModule.create({
            service: OrganizationService.departments(),
        }),
        messagesModule: BaseModule.create({
            service: OrganizationService.messages(),
        }),
        organizationsModule: BaseModule.create({
            service: OrganizationService.organizations(),
        }),
        prioritiesModule: BaseModule.create({
            service: OrganizationService.priorities(),
        }),
        statusesModule: BaseModule.create({
            service: OrganizationService.statuses(),
        }),
        ticketsModule: BaseModule.create({
            service: OrganizationService.tickets(),
        }),
        usersModule: BaseModule.create({
            service: OrganizationService.users(),
        }),
    },
    service: OrganizationService,
});

/**
 * Build and export the created module.
 */
export default organizationModule;
