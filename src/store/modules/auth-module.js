/**
 * Auth Module
 */

import AuthService from "../../services/modules/auth-service";

/**
 * Generate the default state.
 */
const getDefaultState = () => {
    return {
        user: null,
    };
};

/**
 * The state for the module.
 */
const state = getDefaultState();

/**
 * The getters available for this module.
 */
const getters = {
    getUser(currentState) {
        return currentState.user;
    },
};

/**
 * The mutations available for this module.
 */
const mutations = {
    setUser(currentState, user) {
        currentState.user = user;
    },
};

/**
 * The actions available for this module.
 */
const actions = {
    login(context, payload) {
        return new Promise((resolve, reject) => {
            const handleSuccess = (response) => {
                resolve(response);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            AuthService.login(payload)
                .then(handleSuccess)
                .catch(handleFailure);
        });
    },
    fetchUser({ commit }) {
        return new Promise((resolve, reject) => {
            const handleSuccess = (response) => {
                const user = response.data.data;
                commit("setUser", user);
                resolve(user);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            AuthService.me()
                .then(handleSuccess)
                .catch(handleFailure);
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
