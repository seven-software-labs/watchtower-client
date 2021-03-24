<template>
    <x-model-table :model="'channel'" :columns="columns">
        <template v-slot:column_name="{ row: channel }">
            <x-link :to="{ name: 'settings.channels.edit', params: { channel: channel.id } }">
                {{ channel.name }}
            </x-link>
        </template>

        <template v-slot:column_department="{ row: channel, column, columnIndex }">
            <x-link :to="{ name: 'settings.channels.edit', params: { channel: channel.id } }">
                {{ column.parse(channel[columnIndex]) }}
            </x-link>
        </template>

        <template v-slot:column_tickets_count="{ row: channel }">
            <x-badge>
                {{ channel.tickets_count }}
            </x-badge>
        </template>

        <template v-slot:column_is_active="{ row: channel, column, columnIndex }">
            <x-badge :color="channel[columnIndex] ? 'green':'gray'">
                <span v-if="channel[columnIndex]">Active</span>
                <span v-else>Disabled</span>
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
                "service": {
                    "label": "Service",
                    "parse": (service) => service.name,
                },
                "department": {
                    "label": "Department",
                    "parse": (department) => department.name,
                },
                "tickets_count": {
                    "label": "# of Tickets",
                    "parse": (tickets_count) => tickets_count,
                    "align": "right",
                },
                "is_active": {
                    "label": "Status",
                    "parse": (is_active) => is_active,
                    "align": "right",
                },
            },
        };
    },
}
</script>
