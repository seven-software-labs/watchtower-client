<template>
    <span :class="classes">
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: "x-text",
    inheritAttrs: false,
    props: {
        color: {
            type: String,
            required: false,
            default: () => "default",
        },
    },
    setup(props) {
        // Base classes for the component.
        const baseClasses = "x-text";

        // List of available colors for the component.
        const colors = {
            default: "",
            muted: "text-gray-500",
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