<template>
    <x-model-table :model="'ticket'" :columns="columns">
        <template v-slot:column_name="{ row: ticket }">
            <div class="w-96 truncate">
                <x-link :to="{ name: 'tickets.edit', params: { ticket: ticket.id } }" class="font-medium">
                    {{ ticket.subject }}
                </x-link>
            </div>

            <x-text color="muted">
                {{ ticket.user.name }}<span v-if="ticket.user.organization">, {{ ticket.user.organization.name }}</span>
            </x-text>
        </template>
        
        <template v-slot:column_department="{ row: ticket }">
            <x-badge :color="ticket.department.color">
                <x-icon name="folder-small" :color="ticket.department.color"/>
                <span class="capitalize">
                    {{ ticket.department.color }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_status="{ row: ticket }">
            <x-badge :color="ticket.status.color">
                <x-icon name="circle" :color="ticket.status.color"/>
                <span class="capitalize">
                    {{ ticket.status.color }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_priority="{ row: ticket }">
            <x-badge :color="ticket.priority.color">
                <x-icon name="square" :color="ticket.priority.color"/>
                <span class="capitalize">
                    {{ ticket.priority.color }}
                </span>
            </x-badge>
        </template>
    </x-model-table>
</template>

<script>
export default {
    data() {
        return {
            columns: {
                "subject": {
                    "label": "Subject",
                },
                "department": {
                    "label": "Department",
                },
                "status": {
                    "label": "Status",
                },
                "Priority": {
                    "label": "Priority",
                },
                "last_replied_at": {
                    "label": "Last Reply",
                    "align": "right",
                },
            },
        };
    },
}
</script>
