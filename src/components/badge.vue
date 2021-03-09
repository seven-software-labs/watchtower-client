<template>
    <span :class="classes">
        <slot></slot>
    </span>
</template>

<script>
import { computed } from "vue";

export default {
    name: "x-badge",
    inheritAttrs: false,
    props: {
        color: {
            type: String,
            required: false,
            default: () => "gray",
        },
        size: {
            type: String,
            required: false,
            default: () => "md",
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-badge inline-flex items-center rounded-full";

        // List of available colors for the component.
        const colors = {
            gray: "bg-gray-100 text-gray-800",
            primary: "bg-primary-100 text-primary-800",
            secondary: "bg-secondary-100 text-secondary-800",
            success: "bg-success-100 text-success-800",
            warning: "bg-warning-100 text-warning-800",
            danger: "bg-danger-100 text-danger-800",
            red: "bg-red-100 text-red-800",
            orange: "bg-orange-100 text-orange-800",
            yellow: "bg-yellow-100 text-yellow-800",
            green: "bg-green-100 text-green-800",
            blue: "bg-primary-100 text-primary-800",
            indigo: "bg-indigo-100 text-indigo-800",
            purple: "bg-purple-100 text-purple-800",
            pink: "bg-pink-100 text-pink-800",
        };

        // List of available sizes for the component.
        const sizes = {
            xs: "",
            sm: "px-2.5 py-0.5 text-xs font-medium ",
            md: "px-3 py-0.5 text-sm",
            lg: "px-3 py-0.5 text-sm font-medium",
            xl: "",
        };

        const compiledClasses = computed(() => {
            return `${baseClasses} ${colors[props.color]} ${sizes[props.size]}`;
        });

        return {
            classes: compiledClasses,
        };
    },
};
</script>