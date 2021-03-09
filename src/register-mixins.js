/**
 * Global mixin registration handler.
 * 
 * Place and enable global mixins into this file.
 */

import ComponentStatusMixin from "./mixins/component-status-mixin.js";

const registerMixins = (app = null) => {
    app.mixin(ComponentStatusMixin);
};

export default registerMixins;
