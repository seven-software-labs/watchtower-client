/**
 * Register Plugins.
 * 
 * Place and enable global plugins into this file.
 */

import ToastPlugin from "./plugins/toast/index.js";
import UtilsPlugin from "./plugins/utils/index.js";

const registerPlugins = (app) => {
    app.use(ToastPlugin);
    app.use(UtilsPlugin);
};

export default registerPlugins;