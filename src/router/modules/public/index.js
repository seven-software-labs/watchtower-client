/**
 * Authentication Routes.
 * 
 * Routes that are available to the public.
 */

import KitchenIndex from "./../../../views/kitchen/index.vue";

const routes = [
    {
        path: "/kitchen",
        name: "kitchen",
        component: KitchenIndex,
    },
];

export default routes;