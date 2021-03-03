<template>
    <!--
        Return an anchor element if there's an href.
    -->
    <a :href="href" :class="classes" v-bind="attrs" v-if="href">
        <slot></slot>
    </a>

    <!--
        Return a button element if there's no href.
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
            default: () => "",
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
        const baseClasses = "x-button inline-flex items-center border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

        // List of available colors for the component.
        const colors = {
            primary: "border-primary-500 text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-secondary-500 focus:ring-primary-500",
            blue: "border-blue-500 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus:ring-blue-600",
            white: "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-900",
        };

        // List of available sizes for the component.
        const sizes = {
            xs: "px-2.5 py-1.5 text-xs font-medium",
            sm: "px-3 py-2 text-sm font-medium",
            md: "px-4 py-2 text-sm font-medium",
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