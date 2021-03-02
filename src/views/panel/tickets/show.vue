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
                                                <option value="" v-for="(status, statusIndex) in statuses" :key="'status_' + statusIndex">
                                                    {{ status.name }}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            Priority
                                            <select class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" v-model="ticket.priority_id">
                                                <option value="" v-for="(priority, priorityIndex) in priorities" :key="'priority_' + priorityIndex">
                                                    {{ priority.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    Department
                                    <select class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" v-model="ticket.department_id">
                                        <option value="" v-for="(department, departmentIndex) in departments" :key="'department_' + departmentIndex">
                                            {{ department.name }}
                                        </option>
                                    </select>
                                </li>
                            </ul>
                        </x-table-data>
                    </x-table-row>
                </tbody>

                <thead>
                    <x-table-row>
                        <x-table-header>Custom Fields</x-table-header>
                    </x-table-row>
                </thead>

                <thead>
                    <x-table-row>
                        <x-table-header>Time Tracking</x-table-header>
                    </x-table-row>
                </thead>
            </x-table>
        </template>

        <template v-slot:default>
            <x-section-header>
                <template v-slot:toolbar>
                    <x-button color="white">
                        Note
                    </x-button>
                </template>
            </x-section-header>

            <x-section-header v-if="ticket.user">
                <template v-slot:title>
                    #{{ ticket.id }} - {{ ticket.subject }}
                </template>

                <template v-slot:description>
                    <x-link :to="{ name: 'users.edit', params: { user: ticket.user.id } }">{{ ticket.user.name }}</x-link>, <x-link :to="{ name: 'organizations.edit', params: { organization: ticket.user.primary_organization.id } }">{{ ticket.user.primary_organization.name }}</x-link>
                </template>
            </x-section-header>

            <div class="max-h-full border-b border-gray-200 overflow-x-hidden overflow-y-auto">

            <ul class="py-4 space-y-2 sm:px-6 sm:space-y-4">
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6 max-w-prose mr-auto">
                    <div class="sm:flex sm:justify-between sm:items-baseline">
                        <h3 class="text-base font-medium">
                            <span class="text-gray-900">Mark Cuban</span>
                        </h3>

                        <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                            <time datetime="2021-01-28T19:24">Yesterday at 7:24am</time>
                        </p>
                    </div>

                    <div class="mt-4 space-y-6 text-sm text-gray-800">
                        <p>Sweat equity is the most valuable equity there is. Know your business and industry better than anyone else in the world. Love what you do or don't do it.</p>
                        
                    </div>
                </li>
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6 max-w-prose ml-auto">
                    <div class="sm:flex sm:justify-between sm:items-baseline">
                        <h3 class="text-base font-medium">
                            <span class="text-gray-900">Monica White</span>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                            <time datetime="2021-01-27T16:35">Wednesday at 4:35pm</time>
                        </p>
                    </div>
                    <div class="mt-4 space-y-6 text-sm text-gray-800">
                        
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.
                        </p>
            
                    </div>
                </li>

                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6 max-w-prose mr-auto">
                    <div class="sm:flex sm:justify-between sm:items-baseline">
                        <h3 class="text-base font-medium">
                            <span class="text-gray-900">Mark Cuban</span>
                        </h3>

                        <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                            <time datetime="2021-01-28T19:24">Wednesday at 6:09pm</time>
                        </p>
                    </div>

                    <div class="mt-4 space-y-6 text-sm text-gray-800">
                        <p>You just got to stay focused and believe in yourself and trust your own ability and judgment.</p>
                    </div>
                </li>
              
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6 max-w-prose ml-auto">
                    <div class="sm:flex sm:justify-between sm:items-baseline">
                        <h3 class="text-base font-medium">
                            <span class="text-gray-900">Monica White</span>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                            <time datetime="2021-01-27T16:35">Wednesday at 4:35pm</time>
                        </p>
                    </div>
                    <div class="mt-4 space-y-6 text-sm text-gray-800">
                        
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies.
                        </p>
            
                    </div>
                </li>

                <li class="bg-yellow-100 px-4 py-6 shadow sm:rounded-lg sm:px-6 max-w-prose ml-auto">
                    <div class="sm:flex sm:justify-between sm:items-baseline">
                        <h3 class="text-base font-medium">
                            <span class="text-gray-900">Monica White</span>
                        </h3>
                        <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                            Noted on <time datetime="2021-01-27T16:35">Wednesday at 4:35pm</time>
                        </p>
                    </div>
                    <div class="mt-4 space-y-6 text-sm text-gray-800">
                        
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.
                        </p>
            
                    </div>
                </li>
            </ul>
            </div>

            <div class="py-4 bg-white">
                <x-container>
                    <div class="flex flex-col space-y-2">
                        <textarea rows="5" class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"></textarea>
                        <div class="flex items-center justify-between flex-shrink-0">
                            <x-text color="muted">
                                <span class="text-sm italic">
                                    &check; Draft Saved at 2:00PM
                                </span>
                            </x-text>

                            <div class="space-x-2">
                                <x-button color="white">
                                    Send Note
                                </x-button>

                                <x-button color="blue">
                                    Send Reply
                                </x-button>
                            </div>
                        </div>
                    </div>
                </x-container>
            </div>
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
                statis_id: null,
                priority_id: null,
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
        this.$store.dispatch("ticketModule/fetchOneItem", this.$route.params.ticket)
            .then((response) => {
                const ticket = response;
                this.ticket = ticket;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>