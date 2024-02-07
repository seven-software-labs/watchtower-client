<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Filters
                </template>
            </x-section-header>

            <div>
                <x-vertical-menu-header class="flex items-center justify-between">
                    Statuses

                    <x-link href="#" @click.stop="selectFilter('status_id', null)" v-if="$route.query.status_id">
                        Clear
                    </x-link>
                </x-vertical-menu-header>

                <x-vertical-menu-item :active="filters.status_id == status.id" v-for="(status, statusIndex) in statuses.data" :key="'status_' + statusIndex" @click.stop="selectFilter('status_id', status.id)">
                    <div class="flex items-center justify-between">
                        <div class="truncate">
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
                <x-vertical-menu-header class="flex items-center justify-between">
                    Priorities

                    <x-link href="#" @click.stop="selectFilter('priority_id', null)" v-if="$route.query.priority_id">
                        Clear
                    </x-link>
                </x-vertical-menu-header>

                <x-vertical-menu-item :active="filters.priority_id == priority.id" v-for="(priority, priorityIndex) in priorities.data" :key="'priority_' + priorityIndex" @click.stop="selectFilter('priority_id', priority.id)">
                    <div class="flex items-center justify-between">
                        <div class="truncate">
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
                <x-vertical-menu-header class="flex items-center justify-between">
                    Departments

                    <x-link href="#" @click.stop="selectFilter('department_id', null)" v-if="$route.query.department_id">
                        Clear
                    </x-link>
                </x-vertical-menu-header>
                
                <x-vertical-menu-item :active="filters.department_id == department.id" v-for="(department, departmentIndex) in departments.data" :key="'department_' + departmentIndex" @click.stop="selectFilter('department_id', department.id)">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-center truncate">
                            <x-icon name="folder-small" :color="department.color"/>
                            {{ department.name }}
                        </div>

                        <x-badge>
                            {{ department.tickets_count }}
                        </x-badge>
                    </div>
                </x-vertical-menu-item>
            </div>

            <div v-if="channels.data && channels.data.length">
                <x-vertical-menu-header class="flex items-center justify-between">
                    Channels

                    <x-link href="#" @click.stop="selectFilter('channel_id', null)" v-if="$route.query.channel_id">
                        Clear
                    </x-link>
                </x-vertical-menu-header>
                
                <x-vertical-menu-item :active="filters.channel_id == channel.id" v-for="(channel, channelIndex) in channels.data" :key="'channel_' + channelIndex" @click.stop="selectFilter('channel_id', channel.id)">
                    <div class="flex items-center justify-between">
                        <div class="truncate">
                            <!-- <x-icon name="folder-small" :color="channel.color"/> -->
                            {{ channel.name }}
                        </div>

                        <x-badge>
                            {{ channel.tickets_count }}
                        </x-badge>
                    </div>
                </x-vertical-menu-item>
            </div>
        </template>

        <template v-slot:default>
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        Tickets
                    </template>
                </x-section-header>

                <x-section-toolbar>
                    <x-button :to="{ name: 'tickets.create' }" color="primary">
                        Create Ticket
                    </x-button>
                </x-section-toolbar>

                <x-vertical-scroll>
                    <x-ticket-table :filters="filters"/>
                </x-vertical-scroll>
            </x-section>
        </template>
    </x-layouts-panel>
</template>

<script>
import TicketTable from "../../../components/application/ticket/ticket-table.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        "x-ticket-table": TicketTable,
    },
    data() {
        return {
            filters: {
                status_id: null,
                priority_id: null,
                department_id: null,
                channel_id: null,
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
        ...mapGetters("channelModule", {
            channels: "getItems",
        }),
    },
    watch: {
        filters: {
            handler(filters) {
                let query = {};

                Object.keys(filters).forEach((key) => {
                    let filter = filters[key];

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
    },
    created() {
        // Load all of the required data.
        this.$store.dispatch("departmentModule/fetchAllItems");
        this.$store.dispatch("priorityModule/fetchAllItems");
        this.$store.dispatch("statusModule/fetchAllItems");
        this.$store.dispatch("channelModule/fetchAllItems");
        // Set the query settings.
        this.filters.department_id = this.$route.query.department_id || null;
        this.filters.priority_id = this.$route.query.priority_id || null;
        this.filters.status_id = this.$route.query.status_id || null;
        this.filters.channel_id = this.$route.query.channel_id || null;
    },
    mounted() {
        window.EchoInstance.private("ticket-channel")
            .listen(".App\\Events\\Ticket\\TicketCreated", () => {
                this.$store.dispatch("departmentModule/fetchAllItems");
                this.$store.dispatch("priorityModule/fetchAllItems");
                this.$store.dispatch("statusModule/fetchAllItems");
                this.$store.dispatch("channelModule/fetchAllItems");
            });
    },
    methods: {
        selectFilter(filter = "status_id", value = null) {
            if(this.filters[filter] == value) {
                this.filters[filter] = null;
                return;
            }

            this.filters[filter] = value;
        },
    },
};
</script>