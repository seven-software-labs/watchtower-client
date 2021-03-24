<template>
    <x-layouts-panel>
        <template v-slot:default>
            <create-edit-form/>
        </template>
    </x-layouts-panel>
</template>

<script>
import CreateEditForm from "./fragments/create-edit-form.vue";

export default {
    components: {
        CreateEditForm,
    },
}
</script>