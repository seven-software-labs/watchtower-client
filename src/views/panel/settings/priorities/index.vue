<template>
    <x-section>
        <x-section-header>
            <template v-slot:title>
                Priorities
            </template>
        </x-section-header>
        
        <x-section-toolbar>
            <x-button :to="{ name: 'settings.priorities.create' }" color="primary">
                Create Priority
            </x-button>
        </x-section-toolbar>

        <x-vertical-scroll>
            <x-priority-table/>
        </x-vertical-scroll>
    </x-section>
</template>

<script>
import PriorityTable from "./../../../../components/application/priority/priority-table.vue";

export default {
    components: {
        "x-priority-table": PriorityTable,
    },
};
</script>