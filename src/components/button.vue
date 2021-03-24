<template>
    <!--
        Return an href element if there's an href.
    -->
    <a :href="href" :class="classes" v-bind="attrs" v-if="href">
        <slot></slot>
    </a>

    <!--
        Return an anchor element if there's a to.
    -->
    <router-link :to="to" :class="classes" v-bind="attrs" v-else-if="to">
        <slot></slot>
    </router-link>

    <!--
        Return a button element if there's no href or to.
    -->
    <button :class="classes" v-bind="attrs" v-else>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "x-button",
    inheritAttrs: false,
    props: {
        href: {
            type: String,
            required: false,
            default: () => null,
        },
        to: {
            type: [Object, String],
            required: false,
            default: () => null,
        },
        color: {
            type: String,
            required: false,
            default: () => "primary",
        },
        size: {
            type: String,
            required: false,
            default: () => "md",
        },
        style: {
            type: String,
            required: false,
            default: () => "rounded",
        },
    },
    computed: {
        attrs() {
            return this.$attrs;
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-button inline-flex items-center border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-4";

        // List of available colors for the component.
        const colors = {
            primary: "border-primary-500 text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 focus:ring-primary-500",
            success: "border-success-500 text-white bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 focus:ring-success-500",
            danger: "border-red-500 text-white bg-red-500 hover:bg-red-600 focus:ring-red-600",
            white: "bg-white border-gray-300 text-gray-900 hover:bg-gray-200 focus:ring-gray-900",
            blue: "border-blue-500 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus:ring-blue-600",
        };

        // List of available sizes for the component.
        const sizes = {
            xs: "px-2.5 py-1.5 text-xs font-medium",
            sm: "px-3 py-2 text-sm font-medium",
            md: "px-4 py-2 text-sm",
            lg: "px-4 py-2 text-base font-medium",
            xl: "px-6 py-3 text-base font-medium",
        };

        // List of available styles for the component.
        const styles = {
            none: "",
            rounded: "rounded-md",
        };

        const compiledClasses = () => {
            return `${baseClasses} ${colors[props.color]} ${sizes[props.size]} ${styles[props.style]}`;
        };

        return {
            classes: compiledClasses(),
        };
    },
};
</script>