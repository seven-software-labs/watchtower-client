<template>
    <router-link :to="to" :class="active ? 'bg-blue-600 text-white':''" class="x-vertical-menu-item block px-4 sm:px-6 py-4 hover:bg-blue-600 hover:text-white text-sm bg-white border-b border-gray-200 whitespace-nowrap truncate">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: "x-vertical-menu-item",
    props: {
        to: {
            type: [Object, String],
            required: false,
            default: () => "#",
        },
        active: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
};
</script>