<template>
    <select v-bind="attrs" v-model="value">
        <slot></slot>
    </select>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ["modelValue"],
    emits: ["update:modelValue"],
    computed: {
        attrs() {
            return {
                ...this.$attrs,
                ...{
                    class: "x-form-select block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
                },
            };
        },
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            }
        }
    },
};
</script>