<template>
    <form v-bind="attrs">
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
                ...{
                    class: "x-form",
                },
            };
        },
    },
};
</script>