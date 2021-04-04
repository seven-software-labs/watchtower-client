<template>
    <form v-bind="attributes" class="w-full">
        <slot></slot>
    </form>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    setup(props, { attrs }) {
        /**
         * The component's attributes.
         */
        const attributes = computed(() => attrs);

        return {
            attributes,
        };
    },
});
</script>