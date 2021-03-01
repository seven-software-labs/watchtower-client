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
                            {{ status.label }}
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ status.count }}</x-badge>
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
                            {{ priority.label }}
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ priority.count }}</x-badge>
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
                                <x-icon name="folder-small"/>
                                {{ department.label }}
                            </div>
                        </x-table-data>

                        <x-table-data align="right">
                            <x-badge>{{ department.count }}</x-badge>
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
export default {
    data() {
        return {
            statuses: [
                {
                    label: "Open",
                    count: 5,
                    color: "success",
                },
                {
                    label: "Pending",
                    count: 2,
                    color: "warning",
                },
                {
                    label: "Closed",
                    count: 0,
                    color: "black",
                },
            ],
            priorities: [
                {
                    label: "Low",
                    count: 5,
                    color: "gray",
                },
                {
                    label: "Medium",
                    count: 5,
                    color: "blue",
                },
                {
                    label: "High",
                    count: 5,
                    color: "warning",
                },
                {
                    label: "Critical",
                    count: 0,
                    color: "danger",
                },
            ],
            departments: [
                {
                    label: "Client Success",
                    count: 5,
                },
                {
                    label: "Technical Support",
                    count: 2,
                },
            ],
        };
    },
};
</script>