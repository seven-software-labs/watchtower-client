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

                <x-vertical-menu-item :active="form.status_id == status.id" v-for="(status, statusIndex) in statuses.data" :key="'status_' + statusIndex" @click.stop="selectFilter('status_id', status.id)">
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

                <x-vertical-menu-item :active="form.priority_id == priority.id" v-for="(priority, priorityIndex) in priorities.data" :key="'priority_' + priorityIndex" @click.stop="selectFilter('priority_id', priority.id)">
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
                
                <x-vertical-menu-item :active="form.department_id == department.id" v-for="(department, departmentIndex) in departments.data" :key="'department_' + departmentIndex" @click.stop="selectFilter('department_id', department.id)">
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
                                        <x-table-row v-for="(ticket, ticketIndex) in tickets.data" :key="'ticket_' + ticketIndex">
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
                                                {{ ticket.last_replied_at }}
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
    data() {
        return {
            form: {
                status_id: null,
                priority_id: null,
                department_id: null,
            },
        };
    },
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
    watch: {
        form: {
            handler(form) {
                let query = {};

                Object.keys(form).forEach((key) => {
                    let filter = form[key];

                    if(!filter) {
                        delete query[key];
                        return;
                    }

                    query[key] = filter;
                });

                this.$router.replace({ query });
            },
            deep: true,
        },
        "$route.query": {
            handler(query) {
                this.$store.dispatch("organizationModule/ticketModule/fetchAllItems", query);
            },
        },
    },
    created() {
        // Load all of the required data.
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
        this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
        this.$store.dispatch("organizationModule/ticketModule/fetchAllItems");
        // Set the query settings.
        this.form.department_id = this.$route.query.department_id || null;
        this.form.priority_id = this.$route.query.priority_id || null;
        this.form.status_id = this.$route.query.status_id || null;
    },
    methods: {
        selectFilter(filter = "status_id", value = null) {
            console.log("Selecting Filter", filter, value);
            if(this.form[filter] == value) {
                this.form[filter] = null;
                return;
            }

            this.form[filter] = value;
        },
    },
};
</script>