<template>
    <x-model-table :model="'priority'" :columns="columns">
        <template v-slot:column_name="{ row: priority }">
            <x-link class="mr-2" :to="{ name: 'settings.priorities.edit', params: { priority: priority.id } }">
                {{ priority.name }}
            </x-link>

            <x-badge color="green" v-if="priority.is_default">
                Default
            </x-badge>
        </template>

        <template v-slot:column_color="{ row: priority }">
            <x-badge :color="priority.color">
                <x-icon name="square" :color="priority.color"/>
                <span class="capitalize">
                    {{ priority.color }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_tickets_count="{ row: priority }">
            <x-badge>
                {{ priority.tickets_count }}
            </x-badge>
        </template>
    </x-model-table>
</template>

<script>
export default {
    data() {
        return {
            columns: {
                "name": {
                    "label": "Name",
                    "parse": (name) => name,
                },
                "color": {
                    "label": "Color",
                    "parse": (color) => color,
                },
                "tickets_count": {
                    "label": "# of Tickets",
                    "parse": (tickets_count) => tickets_count,
                    "align": "right",
                },
            },
        };
    },
}
</script>
