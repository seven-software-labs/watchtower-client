<template>
    <form v-bind="attrs" class="w-full">
        <slot></slot>
    </form>
</template>

<script>
export default {
    inheritAttrs: false,
    computed: {
        attrs() {
            return {
                ...this.$attrs,
            };
        },
    },
};
</script>