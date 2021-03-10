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
    <span :class="classes" v-bind="attrs" v-else>
        <slot></slot>
    </span>
</template>

<script>
import { computed } from "vue";

export default {
    name: "x-link",
    inheritAttrs: false,
    props: {
        to: {
            type: [Object, String, Boolean],
            required: false,
            default: () => false,
        },
        color: {
            type: String,
            required: false,
            default: () => "primary",
        },
    },
    computed: {
        attrs() {
            return this.$attrs;
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-link cursor-pointer";

        // List of available colors for the component.
        const colors = {
            primary: "text-primary-500 hover:text-primary-600",
            gray: "hover:text-primary-600",
        };

        const compiledClasses = computed(() => {
            return `${baseClasses} ${colors[props.color]}`;
        });

        return {
            classes: compiledClasses,
        };
    },
};
</script>