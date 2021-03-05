<template>
    <input v-bind="attrs" v-model="value">
</template>

<script>
export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    computed: {
        attrs() {
            return {
                ...this.$attrs,
                ...{
                    class: "x-form-input block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md",
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