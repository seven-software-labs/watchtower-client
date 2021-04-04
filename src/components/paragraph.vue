<template>
    <p :class="classes" v-bind="attributes">
        <slot />
    </p>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface componentSizes {
    [property: string]: string;
}

export default defineComponent({
    name: "x-paragraph",
    inheritAttrs: false,
    setup(props, { attrs }) {
        /**
         * The base classes for the component.
         */
        const baseClasses: string = "";

        /**
         * The computed classes for the component.
         */
        const classes = computed(() => `x-paragraph ${baseClasses}` );

        /**
         * The attributes for the component.
         */
        const attributes = computed(() => attrs);

        return {
            attributes,
            classes,
        };
    },
});
</script>