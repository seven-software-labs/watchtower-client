<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Filters
                </template>
            </x-section-header>

            <div>
                <x-vertical-menu-header>
                    Statuses
                </x-vertical-menu-header>

                <x-vertical-menu-item v-for="(status, statusIndex) in statuses" :key="'status_' + statusIndex">
                    <div class="flex items-center justify-between">
                        <div>
                            <x-icon name="circle" :color="status.color"/>
                            {{ status.name }}
                        </div>

                        <x-badge>
                            {{ status.tickets_count }}
                        </x-badge>
                    </div>
                </x-vertical-menu-item>
            </div>

            <div>
                <x-vertical-menu-header>
                    Priorities
                </x-vertical-menu-header>

                <x-vertical-menu-item v-for="(priority, priorityIndex) in priorities" :key="'priority_' + priorityIndex">
                    <div class="flex items-center justify-between">
                        <div>
                            <x-icon name="square" :color="priority.color"/>
                            {{ priority.name }}
                        </div>

                        <x-badge>
                            {{ priority.tickets_count }}
                        </x-badge>
                    </div>
                </x-vertical-menu-item>
            </div>

            <div>
                <x-vertical-menu-header>
                    Departments
                </x-vertical-menu-header>

                <x-vertical-menu-item :active="false" v-for="(department, departmentIndex) in departments" :key="'department_' + departmentIndex">
                    <div class="flex items-center justify-between">
                        <div>
                            <x-icon name="folder-small" :color="department.color"/>
                            {{ department.name }}
                        </div>

                        <x-badge>
                            {{ department.tickets_count }}
                        </x-badge>
                    </div>
                </x-vertical-menu-item>
            </div>
        </template>

        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Tickets
                </template>
            </x-section-header>

            <x-section-toolbar>
                <x-button :to="{ name: 'tickets.create' }" color="blue">
                    Create Ticket
                </x-button>
            </x-section-toolbar>

            <div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hiddem">
                                <x-table>
                                    <thead>
                                        <x-table-row>
                                            <x-table-header>Subject</x-table-header>
                                            <x-table-header>Department</x-table-header>
                                            <x-table-header>Status</x-table-header>
                                            <x-table-header>Priority</x-table-header>
                                            <x-table-header>Last Reply</x-table-header>
                                        </x-table-row>
                                    </thead>

                                    <tbody>
                                        <x-table-row v-for="(ticket, ticketIndex) in tickets" :key="'ticket_' + ticketIndex">
                                            <x-table-data class="flex flex-col">
                                                <x-link :to="{ name: 'tickets.show', params: { ticket: ticket.id } }" class="font-medium">
                                                    {{ ticket.subject }}
                                                </x-link>

                                                <x-text color="muted">
                                                    {{ ticket.user.name }}<span v-if="ticket.user.primary_organization">, {{ ticket.user.primary_organization.name }}</span>
                                                </x-text>
                                            </x-table-data>

                                            <x-table-data>
                                                {{ ticket.department.name }}
                                            </x-table-data>

                                            <x-table-data>
                                                <x-badge :color="ticket.status.color">
                                                    {{ ticket.status.name }}
                                                </x-badge>
                                            </x-table-data>

                                            <x-table-data>
                                                <x-badge :color="ticket.priority.color">
                                                    {{ ticket.priority.name }}
                                                </x-badge>
                                            </x-table-data>

                                            <x-table-data>
                                                {{ ticket.last_reply }}
                                            </x-table-data>
                                        </x-table-row>
                                    </tbody>
                                </x-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </x-layouts-panel>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("organizationModule/statusModule", {
            statuses: "getItems",
        }),
        ...mapGetters("organizationModule/priorityModule", {
            priorities: "getItems",
        }),
        ...mapGetters("organizationModule/departmentModule", {
            departments: "getItems",
        }),
        ...mapGetters("organizationModule/ticketModule", {
            tickets: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
        this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
        this.$store.dispatch("organizationModule/ticketModule/fetchAllItems");
    },
};
</script>