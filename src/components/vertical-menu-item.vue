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
    name: "x-vertical-menu-item",
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
        const baseClasses = "text-gray-900 rounded-md block mb-1 last-child:mb-0 px-4 py-2 hover:bg-gray-200 hover:text-primary-600 text-sm whitespace-nowrap truncate focus:outline-none focus:ring-0 focus:ring-offset-0";

        // List of available modes for the component.
        const modes = {
            button: "x-vertical-menu-item-button w-full",
            link: "x-vertical-menu-item-link",
        };

        // List of available modes for the component.
        const states = {
            default: "",
            active: "bg-gray-200 text-primary-600",
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
    .x-vertical-menu-item-link.router-link-active {
        @apply bg-gray-200 text-primary-600;
    }
</style>