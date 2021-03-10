<template>
    <input v-bind="attrs" v-model="value">
</template>

<script>
export default {
    props: ["modelValue", "error"],
    emits: ["update:modelValue"],
    computed: {
        attrs() {
            return {
                ...this.$attrs,
                ...{
                    class: "x-form-input block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed max-w-md",
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