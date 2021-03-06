<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Details
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Ticket Details</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data>
                            <ul class="space-y-4">
                                <li>
                                    <div class="grid grid-cols-2 gap-2">
                                        <div>
                                            Status
                                            <select class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" v-model="ticket.status_id">
                                                <option :value="status.id" v-for="(status, statusIndex) in statuses" :key="'status_' + statusIndex">
                                                    {{ status.name }}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            Priority
                                            <select class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" v-model="ticket.priority_id">
                                                <option :value="priority.id" v-for="(priority, priorityIndex) in priorities" :key="'priority_' + priorityIndex">
                                                    {{ priority.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    Department
                                    <select class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" v-model="ticket.department_id">
                                        <option :value="department.id" v-for="(department, departmentIndex) in departments" :key="'department_' + departmentIndex">
                                            {{ department.name }}
                                        </option>
                                    </select>
                                </li>
                            </ul>
                        </x-table-data>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>

        <template v-slot:default>
            <x-section-header>
                <template v-slot:title>
                    Create Ticket
                </template>
            </x-section-header>
        </template>
    </x-layouts-panel>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            ticket: {
                department_id: null,
                status_id: null,
                priority_id: null,
            },
            messageForm: {
                content: "",
                channel_id: null,
                ticket_id: null,
                message_type_id: 1,
                user_id: 1, // Replace this with logged in user later on.
            },
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