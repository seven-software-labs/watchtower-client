<template>
    <x-vertical-scroll>
        <x-table>
            <thead>
                <x-table-row>
                    <x-table-header>
                        <div class="px-4">
                            <x-form-checkbox v-model="selectedAllTickets" @click.stop="toggleAllSelectedTickets"/>
                        </div>
                    </x-table-header>

                    <x-table-header>Subject</x-table-header>
                    <x-table-header>Department</x-table-header>
                    <x-table-header>Status</x-table-header>
                    <x-table-header>Priority</x-table-header>
                    <x-table-header>Last Reply</x-table-header>
                </x-table-row>
            </thead>

            <tbody>
                <x-table-row :class="selectedTickets.includes(ticket.id) ? 'bg-gray-100':''" v-for="(ticket, ticketIndex) in tickets.data" :key="'ticket_' + ticketIndex">
                    <x-table-data>
                        <div class="px-4">
                            <x-form-checkbox :id="'ticket_' + ticket.id" :value="ticket.id" v-model="selectedTickets"/>
                        </div>
                    </x-table-data>

                    <x-table-data>
                        <div class="w-96 truncate">
                            <x-link :to="{ name: 'tickets.edit', params: { ticket: ticket.id } }" class="font-medium">
                                {{ ticket.subject }}
                            </x-link>
                        </div>

                        <x-text color="muted">
                            {{ ticket.user.name }}<span v-if="ticket.user.organization">, {{ ticket.user.organization.name }}</span>
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
        
        <div class="w-full pb-6 flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                Previous
                </a>
                <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                Next
                </a>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">1</span>
                    to
                    <span class="font-medium">10</span>
                    of
                    <span class="font-medium">97</span>
                    results
                </p>
                </div>
                <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Previous</span>
                    <!-- Heroicon name: solid/chevron-left -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                    </a>
                    <a href="#" class="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                    </a>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                    </span>
                    <a href="#" class="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    9
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    10
                    </a>
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Next</span>
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </nav>
                </div>
            </div>
        </div>

    </x-vertical-scroll>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            channel: `organization-${this.$me.user().master_organization_id}-ticket-channel`,
            selectedTickets: [],
            selectedAllTickets: false,
        };
    },
    computed: {
        ...mapGetters("ticketModule", {
            tickets: "getItems",
        }),
    },
    watch: {
        "$route.query": {
            handler(query) {
                this.toggleLoading();

                this.$store.dispatch("ticketModule/fetchAllItems", query)
                    .finally(() => {
                        this.toggleLoading();
                    });
            },
            immediate: true,
        },
        "selectedTickets": {
            handler() {
                if(this.selectedAllTickets && (this.tickets.data.length != this.selectedTickets.length)) {
                    this.selectedAllTickets = false;
                }

                if(!this.selectedAllTickets && (this.tickets.data.length == this.selectedTickets.length)) {
                    this.selectedAllTickets = true;
                }
            },
        },
    },
    mounted() {
        window.EchoInstance.private(this.channel)
            .listen(".App\\Events\\Ticket\\TicketCreated", ({ ticket }) => {
                this.$store.commit("ticketModule/addItem", ticket);
            })
            .listen(".App\\Events\\Ticket\\TicketUpdated", ({ ticket }) => {
                this.$store.commit("ticketModule/updateItem", ticket);
            });
    },
    beforeUnmount() {
        window.EchoInstance.leave(this.channel);
    },
    methods: {
        toggleAllSelectedTickets() {
            this.selectedTickets = [];

            if(!this.selectedAllTickets) {
                this.tickets.data.forEach((ticket) => {
                    this.selectedTickets.push(ticket.id);
                });    
            }
        },
    },
};
</script>