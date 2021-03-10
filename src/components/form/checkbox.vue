<template>
    <input type="checkbox" :class="classes">
</template>

<script>
export default {
    name: "x-form-checkbox",
    setup() {
        // Base classes for the component.
        const baseClasses = "x-form-checkbox focus:ring-blue-500 h-4 w-4 text-primary-600 border-gray-300 rounded";

        const compiledClasses = () => {
            return `${baseClasses}`;
        };

        return {
            classes: compiledClasses(),
        };
    },
};
</script>