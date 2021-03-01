/**
 * Vuex Store
 * 
 * Global state management.
 */

import { createStore } from "vuex";
import StatusModule from "./modules/status-module.js";

// Create a new store instance.
const store = createStore({
    modules: {
        statusModule: StatusModule,
    }
});

export default store;
