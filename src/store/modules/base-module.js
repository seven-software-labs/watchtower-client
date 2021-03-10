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
                    addItem(currentState, item) {
                        if(!currentState.items.data) {
                            currentState.items.data = [];
                        }
                        
                        currentState.items.data.unshift(item);
                    },
                    updateItem(currentState, item) {
                        let currentItem = currentState.items.data.find((currentItem) => currentItem.id == item.id);
                        if(currentItem) currentItem = item;
                    },
                    deleteItem(currentState, item) {
                        let currentItemIndex = currentState.items.data.findIndex((currentItem) => currentItem.id == item.id);
                        delete currentState.items.data[currentItemIndex];
                    },
                },
                ...mutations,
            };
        };
    
        const generateActions = (actions = {}) => {
            return {
                fetchAllItems({ commit }, payload) {
                    return new Promise((resolve, reject) => {
                        const handleSuccess = (response) => {
                            let items = response.data;
                            commit("setItems", items);
                            resolve(items);
                        };
    
                        const handleFailure = (error) => {
                            reject(error);
                        };
    
                        service.fetchAllItems(payload)
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
                            let item = response.data.data;
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
                deleteItem: (context, id) => service.deleteItem(id),
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