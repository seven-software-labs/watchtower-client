<template>
    <x-model-table :model="'status'" :columns="columns">
        <template v-slot:column_name="{ row: status }">
            <x-link class="mr-2" :to="{ name: 'settings.statuses.edit', params: { status: status.id } }">
                {{ status.name }}
            </x-link>

            <x-badge color="green" v-if="status.is_default">
                Default
            </x-badge>
        </template>

        <template v-slot:column_color="{ row: status }">
            <x-badge :color="status.color">
                <x-icon name="circle" :color="status.color"/>
                <span class="capitalize">
                    {{ status.color }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_tickets_count="{ row: status }">
            <x-badge>
                {{ status.tickets_count }}
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
