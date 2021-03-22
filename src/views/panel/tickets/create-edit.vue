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
                            Status
                            <x-form-select name="status_id" v-model="ticketForm.status_id">
                                <option :value="status.id" v-for="(status, statusIndex) in statuses.data" :key="'status_' + statusIndex">
                                    {{ status.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>

                    <x-table-row>
                        <x-table-data>
                            Priority
                            <x-form-select name="priority_id" v-model="ticketForm.priority_id">
                                <option :value="priority.id" v-for="(priority, priorityIndex) in priorities.data" :key="'priority_' + priorityIndex">
                                    {{ priority.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>
                    
                    <x-table-row>
                        <x-table-data>
                            Department
                            <x-form-select name="department_id" v-model="ticketForm.department_id">
                                <option :value="department.id" v-for="(department, departmentIndex) in departments.data" :key="'department_' + departmentIndex">
                                    {{ department.name }}
                                </option>
                            </x-form-select>
                        </x-table-data>
                    </x-table-row>
                </tbody>

                <thead>
                    <x-table-row>
                        <x-table-header>User Details</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-row>
                            <x-table-data>
                                User
                                <x-form-select name="user_id" v-model="ticketForm.user_id">
                                    <option :value="null">Select User</option>
                                    <option :value="user.id" v-for="(user, userIndex) in users.data" :key="'user_' + userIndex">
                                        {{ user.name }}
                                    </option>
                                </x-form-select>
                            </x-table-data>
                        </x-table-row>

                        <x-table-row>
                            <x-table-data>
                                Channel
                                <x-form-select name="channel_id" v-model="ticketForm.channel_id">
                                    <option :value="null">Select Channel</option>
                                    <option :value="channel.id" v-for="(channel, channelIndex) in channels.data" :key="'channel_' + channelIndex">
                                        {{ channel.name }}
                                    </option>
                                </x-form-select>
                            </x-table-data>
                        </x-table-row>
                    </x-table-row>
                </tbody>
            </x-table>
        </template>

        <template v-slot:default>
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        <template v-if="mode == 'create' || !ticket">
                            Create Ticket
                        </template>

                        <template v-else>
                            {{ ticketForm.subject }}
                        </template>
                    </template>
                </x-section-header>

                <x-section-toolbar>
                    <x-button type="submit" color="primary">
                        Save Ticket
                    </x-button>

                    <x-button type="submit" color="white" :to="{ name: 'tickets.index' }">
                        Cancel
                    </x-button>
                </x-section-toolbar>

                <ticket-message-viewer :ticket="ticket" v-if="ticket"/>
            </x-section>
        </template>
    </x-layouts-panel>
</template>

<script>
import TicketMessageViewer from "./../../../components/application/ticket/ticket-message-viewer.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        TicketMessageViewer,
    },
    data() {
        return {
            mode: "create",
            ticket: null,
            ticketForm: {
                id: "",
                department_id: null,
                status_id: null,
                priority_id: null,
                user_id: null,
            },
            userForm: {
                id: "",
                channel_id: "",
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
        ...mapGetters("userModule", {
            users: "getItems",
        }),
        channels() {
            if(!this.ticketForm.user_id) return [];

            const selectedUser = this.users.data.find((user) => user.id == this.ticketForm.user_id);

            return {
                data: selectedUser.channels
            };
        },
    },
    created() {
        this.$store.dispatch("userModule/fetchAllItems")
            .then(() => {
                // ...
            });

        this.$store.dispatch("departmentModule/fetchAllItems")
            .then((items) => {
                if(!this.$route.params.ticket) {
                    const defaultItem = items.data.find((item) => item.is_default);
                    this.ticketForm.department_id = defaultItem.id;
                }
            });
        this.$store.dispatch("priorityModule/fetchAllItems")
            .then((items) => {
                if(!this.$route.params.ticket) {
                    const defaultItem = items.data.find((item) => item.is_default);
                    this.ticketForm.priority_id = defaultItem.id;
                }
            });
        this.$store.dispatch("statusModule/fetchAllItems")
            .then((items) => {
                if(!this.$route.params.ticket) {
                    const defaultItem = items.data.find((item) => item.is_default);
                    this.ticketForm.status_id = defaultItem.id;
                }
            });

        if(this.$route.params.ticket) {
            this.$store.dispatch("ticketModule/fetchOneItem", this.$route.params.ticket)
                .then((ticket) => {
                    // Populate ticket information.
                    this.ticket = ticket;
                    this.mode = "edit";

                    // Populate ticket form.
                    this.ticketForm.status_id = ticket.status_id;
                    this.ticketForm.priority_id = ticket.priority_id;
                    this.ticketForm.department_id = ticket.department_id;
                    this.ticketForm.user_id = ticket.user_id;
                    this.ticketForm.channel_id = ticket.channel_id;
                    this.ticketForm.subject = ticket.subject;

                    // Subscribe to channel.
                    window.EchoInstance.private(`organization-${ticket.organization_id}-ticket-${ticket.id}-channel`)
                        .listen(".App\\Events\\Ticket\\TicketUpdated", ({ ticket }) => {
                            this.ticket = ticket;
                            this.ticketForm.status_id = ticket.status_id;
                            this.ticketForm.priority_id = ticket.priority_id;
                            this.ticketForm.department_id = ticket.department_id;
                            this.ticketForm.user_id = ticket.user_id;
                            this.ticketForm.channel_id = ticket.channel_id;
                            this.ticketForm.subject = ticket.subject;
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        // ...
    },
};
</script>