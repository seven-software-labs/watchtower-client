<template>
    <x-model-table :model="'ticket'" :columns="columns">
        <template v-slot:column_subject="{ row: ticket }">
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
                    {{ ticket.department.name }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_status="{ row: ticket }">
            <x-badge :color="ticket.status.color">
                <x-icon name="circle" :color="ticket.status.color"/>
                <span class="capitalize">
                    {{ ticket.status.name }}
                </span>
            </x-badge>
        </template>

        <template v-slot:column_priority="{ row: ticket }">
            <x-badge :color="ticket.priority.color">
                <x-icon name="square" :color="ticket.priority.color"/>
                <span class="capitalize">
                    {{ ticket.priority.name }}
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
                    parse: (subject) => subject,
                },
                "department": {
                    "label": "Department",
                    parse: (department) => department,
                },
                "status": {
                    "label": "Status",
                    parse: (status) => status,
                },
                "priority": {
                    "label": "Priority",
                    parse: (Priority) => priority,
                },
                "last_replied_at": {
                    "label": "Last Reply",
                    parse: (last_replied_at) => last_replied_at,
                    "align": "right",
                },
            },
        };
    },
}
</script>
