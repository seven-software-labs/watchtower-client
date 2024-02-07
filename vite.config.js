const path = require('path');
import vue from "@vitejs/plugin-vue"

/**
 * @type { import("vite").UserConfig }
 */
export default {
    resolve: {
        alias: [
            {
                find: "@/",
                replacement: path.resolve(__dirname, "./src"),
            },
        ],
    },
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
    },
    plugins: [vue()]
}