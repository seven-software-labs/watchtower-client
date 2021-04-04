<template>
    <component :is="component" :class="classes" v-bind="attributes">
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface componentSizes {
    [property: string]: string;
}

export default defineComponent({
    name: "x-heading",
    inheritAttrs: false,
    props: {
        size: {
            type: [String, Number],
            required: false,
            default: () => "1",
        },
    },
    setup(props, { attrs }) {
        /**
         * The component element to be used.
         */
        const component = computed(() => `h${props.size}`);

        /**
         * The base classes for the component.
         */
        const baseClasses: string = "font-montserrat";

        /**
         * The available sizes for the component.
         */
        const sizes: componentSizes = {
            1: "text-4xl leading-8 font-extrabold tracking-tight",
            2: "text-3xl font-extrabold",
            3: "text-2xl font-bold",
            4: "text-xl font-medium",
            5: "text-lg font-medium",
            6: "text-base font-normal",
        };

        /**
         * The computed classes for the component.
         */
        const classes = computed(() => `x-heading ${baseClasses} ${sizes[props.size]}` );

        /**
         * The attributes for the component.
         */
        const attributes = computed(() => attrs);

        return {
            attributes,
            classes,
            component,
        };
    },
});
</script>