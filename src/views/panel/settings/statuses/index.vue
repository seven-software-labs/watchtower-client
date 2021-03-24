<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Statuses
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.statuses.create' }" color="primary">
                Create Status
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-status-table/>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import StatusTable from "./../../../../components/application/status/status-table.vue";

export default {
    components: {
        "x-status-table": StatusTable,
    },
};
</script>