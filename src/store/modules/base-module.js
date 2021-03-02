/**
 * Base Vuex Store Module
 */

import Collect from "collect.js";

const baseModule = {
    create({ state = {}, getters = {}, mutations = {}, actions = {} }, service) {
        const generateState = (state = {}) => {
            return {
                ...{
                    items: [],
                    selectedItem: [],
                },
                ...state,
            };
        };
    
        const generateGetters = (getters = {}) => {
            return {
                ...{
                    getItems(currentState) {
                        return currentState.items;
                    },
                    getItem(currentState, id) {
                        return currentState.items.find((item) => item.id == id);
                    },
                },
                ...getters,
            };
        };
    
        const generateMutations = (mutations = {}) => {
            return {
                ...{
                    setItems(currentState, items) {
                        currentState.items = items;
                    },
                },
                ...mutations,
            };
        };
    
        const generateActions = (actions = {}) => {
            return {
                fetchAllItems({ commit }) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            const items = Collect(response.data);
                            commit("setItems", items);
                            resolve(items);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        const handleFinally = () => {
                            // ...
                        };
    
                        service.fetchAllItems()
                            .then(handleSuccess)
                            .catch(handleFailure)
                            .finally(handleFinally);
                    });
                },
                ...actions,
            };
        };
    
        return {
            namespaced: true,
            state: generateState(state),
            getters: generateGetters(getters),
            mutations: generateMutations(mutations),
            actions: generateActions(actions),
        };
    },
};

export default baseModule;