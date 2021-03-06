/**
 * Base Vuex Store Module
 */

import Collect from "collect.js";

const baseModule = {
    create({ state = {}, getters = {}, mutations = {}, actions = {}, modules = {}, service }) {
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
                fetchAllItems({ commit }, payload = { commit: true }) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            let items = response.data;

                            if(payload.paginated) {
                                items = {
                                    ...response.data,
                                    data: Collect(response.data.data),
                                };
                            } else {
                                items = Collect(response.data.data);
                            }

                            if(payload.commit) {
                                commit("setItems", items);
                            }
                            
                            resolve(items);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        service.fetchAllItems()
                            .then(handleSuccess)
                            .catch(handleFailure);
                    });
                },
                fetchOneItem(context, id) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            let item = response.data.data;
                            resolve(item);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        service.fetchOneItem(id)
                            .then(handleSuccess)
                            .catch(handleFailure);
                    });
                },
                storeItem(context, payload = {}) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            console.log("storeItem", response);
                            let item = response.data;
                            resolve(item);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        service.storeItem(payload)
                            .then(handleSuccess)
                            .catch(handleFailure);
                    });
                },
                updateItem(context, { id, payload = {}}) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            console.log("updateItem", response);
                            let item = response.data;
                            resolve(item);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        service.updateItem(id, payload)
                            .then(handleSuccess)
                            .catch(handleFailure);
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
            modules,
        };
    },
};

export default baseModule;