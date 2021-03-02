/**
 * Vuex Store
 * 
 * Global state management.
 */

import { createStore } from "vuex";
import DepartmentModule from "./modules/department-module.js";
import StatusModule from "./modules/status-module.js";
import PriorityModule from "./modules/priority-module.js";

// Create a new store instance.
const store = createStore({
    modules: {
        statusModule: StatusModule,
        departmentModule: DepartmentModule,
        priorityModule: PriorityModule,
    },
});

export default store;
