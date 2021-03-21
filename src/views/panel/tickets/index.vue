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
                <x-vertical-menu-header class="flex items-center justify-between">
                    Priorities

                    <x-link href="#" @click.stop="selectFilter('priority_id', null)" v-if="$route.query.priority_id">
                        Clear
                    </x-link>
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
                <x-vertical-menu-header class="flex items-center justify-between">
                    Departments

                    <x-link href="#" @click.stop="selectFilter('department_id', null)" v-if="$route.query.department_id">
                        Clear
                    </x-link>
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
            <x-section>
                <x-section-header>
                    <template v-slot:title>
                        Tickets
                    </template>
                </x-section-header>

                <x-section-toolbar>
                    <x-button :to="{ name: 'tickets.create' }" color="blue">
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
                        Close
                    </x-button>
                    
                    <x-button color="white">
                        Delete
                    </x-button>
                </x-section-toolbar>

                <ticket-table/>
            </x-section>
        </template>
    </x-layouts-panel>
</template>

<script>
import TicketTable from "./../../../components/application/ticket/ticket-table.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        TicketTable,
    },
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
    },
    created() {
        // Load all of the required data.
        this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
        this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
        this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
        // Set the query settings.
        this.form.department_id = this.$route.query.department_id || null;
        this.form.priority_id = this.$route.query.priority_id || null;
        this.form.status_id = this.$route.query.status_id || null;
    },
    mounted() {
        window.EchoInstance.private("ticket-channel")
            .listen(".App\\Events\\Ticket\\TicketCreated", () => {
                this.$store.dispatch("organizationModule/departmentModule/fetchAllItems");
                this.$store.dispatch("organizationModule/priorityModule/fetchAllItems");
                this.$store.dispatch("organizationModule/statusModule/fetchAllItems");
            });
    },
    methods: {
        selectFilter(filter = "status_id", value = null) {
            if(this.form[filter] == value) {
                this.form[filter] = null;
                return;
            }

            this.form[filter] = value;
        },
    },
};
</script>