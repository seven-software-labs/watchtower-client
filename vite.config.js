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
    plugins: [vue()]
}