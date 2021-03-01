<template>
    <router-link :to="to" :class="classes">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: "x-link",
    props: {
        to: {
            type: [Object, String],
            required: false,
            default: () => "#",
        },
        color: {
            type: String,
            required: false,
            default: () => "primary",
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-link";

        // List of available colors for the component.
        const colors = {
            primary: "text-blue-500 hover:text-blue-600",
            gray: "hover:text-primary-600",
        };

        const compiledClasses = () => {
            return `${baseClasses} ${colors[props.color]}`;
        };

        return {
            classes: compiledClasses(),
        };
    },
};
</script>