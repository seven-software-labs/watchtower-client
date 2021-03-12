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
                                            <x-form-select name="status_id" v-model="ticket.status_id">
                                                <option :value="status.id" v-for="(status, statusIndex) in statuses.data" :key="'status_' + statusIndex">
                                                    {{ status.name }}
                                                </option>
                                            </x-form-select>
                                        </div>

                                        <div>
                                            Priority
                                            <x-form-select name="priority_id" v-model="ticket.priority_id">
                                                <option :value="priority.id" v-for="(priority, priorityIndex) in priorities.data" :key="'priority_' + priorityIndex">
                                                    {{ priority.name }}
                                                </option>
                                            </x-form-select>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    Department
                                    <x-form-select name="department_id" v-model="ticket.department_id">
                                        <option :value="department.id" v-for="(department, departmentIndex) in departments.data" :key="'department_' + departmentIndex">
                                            {{ department.name }}
                                        </option>
                                    </x-form-select>
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

            <x-form>
                <x-section-toolbar>
                    <x-button type="submit" color="primary">
                        Save Ticket
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'tickets.index' }">
                        Cancel
                    </x-button>
                </x-section-toolbar>

                <x-table>
                    <thead>
                        <x-table-row>
                            <x-table-header colspan="100%">
                                General Information
                            </x-table-header>
                        </x-table-row>
                    </thead>
                    
                    <tbody>
                        <x-table-row>
                            <x-table-data>
                                Subject
                            </x-table-data>

                            <x-table-data>
                                <x-form-input type="text" name="name"/>
                            </x-table-data>
                        </x-table-row>

                        <x-table-row>
                            <x-table-data>
                                Message
                            </x-table-data>

                            <x-table-data>
                                <x-form-input type="text" name="message"/>
                            </x-table-data>
                        </x-table-row>
                    </tbody>
                </x-table>
            </x-form>
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
        ...mapGetters("organizationModule/statusModule", {
            statuses: "getItems",
        }),
        ...mapGetters("organizationModule/priorityModule", {
            priorities: "getItems",
        }),
        ...mapGetters("organizationModule/departmentModule", {
            departments: "getItems",
        }),
    },
    created() {
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
        this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
    },
};
</script>