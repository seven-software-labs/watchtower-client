/**
 * Status Module
 */

const axios = require("axios");

/**
 * Generate the default state.
 */
const getDefaultState = () => {
    return {
        items: [],
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
    getItems(currentState) {
        return currentState.items;
    },
    getItem(currentState, id) {
        return currentState.items.find((item) => item.id == id);
    },
};

/**
 * The mutations available for this module.
 */
const mutations = {
    setItems(currentState, items) {
        currentState.items = items;
    },
};

/**
 * The actions available for this module.
 */
const actions = {
    fetchAllItems({ commit }) {
        return new Promise((resolve, reject) => {
            const handleSuccess = (response) => {
                console.log(response);
                commit("setItems", response.data.data);
                resolve(response);
            };

            const handleFailure = (error) => {
                reject(error);
            };

            const handleFinally = () => {
                // ...
            };

            axios.get("http://127.0.0.1:8000/api/statuses")
                .then(handleSuccess)
                .catch(handleFailure)
                .finally(handleFinally);
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