<template>
    <x-model-table :model="'department'" :columns="columns">
        <template v-slot:column_name="{ row: department }">
            <x-link class="mr-2" :to="{ name: 'settings.departments.edit', params: { department: department.id } }">
                {{ department.name }}
            </x-link>

            <x-badge color="green" v-if="department.is_default">
                Default
            </x-badge>
        </template>

        <template v-slot:column_color="{ row: department }">
            <x-badge :color="department.color">
                <x-icon name="folder-small" :color="department.color"/>
                <span class="capitalize">
                    {{ department.color }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_channels_count="{ row: department }">
            <x-badge>
                {{ department.channels_count }}
            </x-badge>
        </template>

        <template v-slot:column_tickets_count="{ row: department }">
            <x-badge>
                {{ department.tickets_count }}
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
                "channels_count": {
                    "label": "# of Channels",
                    "parse": (channels_count) => channels_count,
                    "align": "right",
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
