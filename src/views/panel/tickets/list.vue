<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Filters
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>
                            Statuses
                        </x-table-header>

                        <x-table-header>
                            <span class="sr-only">Count</span>
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="(status, statusIndex) in statuses" :key="'status_' + statusIndex">
                        <x-table-data>
                            <x-icon name="circle" :color="status.color"/>
                            {{ status.name }}
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ status.tickets_count }}</x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
                
                <thead>
                    <x-table-row>
                        <x-table-header>
                            Priorities
                        </x-table-header>

                        <x-table-header>
                            <span class="sr-only">Count</span>
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="(priority, priorityIndex) in priorities" :key="'priority_' + priorityIndex">
                        <x-table-data>
                            <x-icon name="square" :color="priority.color"/>
                            {{ priority.name }}
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ priority.tickets_count }}</x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
                
                <thead>
                    <x-table-row>
                        <x-table-header>
                            Departments
                        </x-table-header>

                        <x-table-header>
                            <span class="sr-only">Count</span>
                        </x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row v-for="(department, departmentIndex) in departments" :key="'department_' + departmentIndex">
                        <x-table-data>
                            <div class="flex items-center">
                                <x-icon name="folder-small" :color="department.color"/>
                                {{ department.name }}
                            </div>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ department.tickets_count }}</x-badge>
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>

        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Tickets
                </template>
            </x-section-header>

            <x-section-header>
                <template v-slot:toolbar>
                    <x-button color="blue">
                        Create Ticket
                    </x-button>

                    <x-button color="white">
                        Status
                    </x-button>

                    <x-button color="white">
                        Priority
                    </x-button>

                    <x-button color="white">
                        Department
                    </x-button>

                    <x-button color="white">
                        Assign
                    </x-button>

                    <x-button color="white">
                        Close
                    </x-button>
                </template>
            </x-section-header>

            <div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hiddem">
                                <x-table>
                                    <thead>
                                        <x-table-row>
                                            <x-table-header>
                                                <x-form-checkbox/>
                                            </x-table-header>
                                            <x-table-header>Subject</x-table-header>
                                            <x-table-header>Department</x-table-header>
                                            <x-table-header>Status</x-table-header>
                                            <x-table-header>Priority</x-table-header>
                                            <x-table-header>Last Reply</x-table-header>
                                        </x-table-row>
                                    </thead>

                                    <tbody>
                                        <x-table-row>
                                            <x-table-data>
                                                <x-form-checkbox/>
                                            </x-table-data>

                                            <x-table-data class="flex flex-col">
                                                <x-link :to="{ name: 'tickets.show', params: { ticket: 1 } }" class="font-medium">This is a random ticket subject.</x-link>
                                                <x-text color="muted">
                                                    Mark Cuban, Dallas Mavericks, Inc.
                                                </x-text>
                                            </x-table-data>

                                            <x-table-data>
                                                Client Success
                                            </x-table-data>

                                            <x-table-data>
                                                <x-badge color="success">
                                                    Open
                                                </x-badge>
                                            </x-table-data>

                                            <x-table-data>
                                                <x-badge color="warning">
                                                    High
                                                </x-badge>
                                            </x-table-data>

                                            <x-table-data>
                                                2 hours ago
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
        };
    },
    computed: {
        ...mapGetters("statusModule", {
            statuses: "getItems",
        }),
        ...mapGetters("priorityModule", {
            priorities: "getItems",
        }),
        ...mapGetters("departmentModule", {
            departments: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("departmentModule/fetchAllItems");
        this.$store.dispatch("priorityModule/fetchAllItems");
        this.$store.dispatch("statusModule/fetchAllItems");
    },
};
</script>