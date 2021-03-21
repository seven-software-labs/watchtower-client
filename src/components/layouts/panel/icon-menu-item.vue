<template>
    <!--
        Return an anchor element if there's an href.
    -->
    <router-link :to="to" :class="classes" v-bind="attrs" v-if="to">
        <slot></slot>
    </router-link>

    <!--
        Return a button element if there's no href.
    -->
    <button :class="classes" v-bind="attrs" v-else>
        <slot></slot>
    </button>
</template>

<script>
import { computed } from "vue";

export default {
    name: "x-icon-menu-item",
    props: {
        to: {
            type: [Object, String, Boolean],
            required: false,
            default: () => false,
        },
        active: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
    computed: {
        attrs() {
            return this.$attrs;
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "w-14 h-14 block hover:bg-gray-200 text-gray-900 hover:text-primary-600 flex items-center justify-center rounded-md text-sm whitespace-nowrap truncate focus:outline-none focus:ring-0 focus:ring-offset-0";

        // List of available modes for the component.
        const modes = {
            button: "x-icon-menu-item-button w-full",
            link: "x-icon-menu-item-link",
        };

        // List of available modes for the component.
        const states = {
            default: "",
            active: "bg-red-200 text-primary-600",
        };
        
        const compiledClasses = computed(() => {
            return `${baseClasses} ${modes[props.to ? "link":"button"]} ${states[props.active ? "active":"default"]}`;
        });

        return {
            classes: compiledClasses,
        };
    },
};
</script>

<style>
    .x-icon-menu-item-link.router-link-active {
        @apply bg-gray-200 text-primary-600;
    }
</style>