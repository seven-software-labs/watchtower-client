<template>
    <div class="h-screen overflow-hidden bg-gray-100 flex flex-col">
    <!-- Top nav-->
    <header class="flex-shrink-0 relative h-16 bg-white flex items-center">
        <!-- Logo area -->
        <div class="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0 bg-gray-800">
        <a href="#" class="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20">
            <svg class="w-6 h-6 text-white fill-current" fill="currentColor" version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="1104.000000pt" height="1280.000000pt" viewBox="0 0 1104.000000 1280.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="currentColor" stroke="none">
                <path d="M929 12790 c-243 -14 -299 -65 -330 -300 -28 -216 -20 -2185 10
                -2262 16 -43 345 -305 1124 -898 l427 -325 0 -2300 -1 -2300 -296 -310 c-505
                -529 -837 -886 -950 -1022 -101 -122 -97 -91 -103 -738 l-5 -560 -290 -5
                c-332 -6 -330 -5 -441 -100 l-62 -52 -7 -527 c-8 -519 -4 -715 16 -840 21
                -137 87 -209 202 -222 223 -26 1400 -31 5957 -26 l4715 6 56 59 c37 39 60 74
                69 103 10 33 14 185 17 602 7 808 -5 894 -128 955 -50 25 -211 41 -419 42 -58
                0 -135 3 -172 7 l-68 6 0 338 c0 406 -16 780 -35 824 -27 61 -292 358 -922
                1032 l-403 432 0 2298 1 2298 272 205 c881 664 1241 950 1272 1010 32 61 38
                296 31 1215 -6 864 -14 1123 -35 1202 -12 42 -70 106 -113 122 -59 22 -297 31
                -989 37 -808 7 -1025 0 -1106 -36 -84 -37 -119 -85 -149 -202 -13 -49 -17
                -135 -21 -396 l-5 -332 -547 2 -546 3 -11 375 c-7 206 -16 390 -22 407 -27 84
                -87 125 -219 149 -111 20 -641 33 -1393 33 -633 1 -941 -8 -1013 -29 -53 -16
                -111 -71 -137 -132 -39 -91 -50 -186 -57 -505 l-6 -303 -542 0 -542 0 -6 122
                c-4 66 -7 189 -7 272 -1 195 -15 372 -33 416 -30 70 -92 108 -212 130 -33 6
                -186 15 -340 20 -317 10 -1310 10 -1486 0z"/>
                </g>
            </svg>
        </a>
        </div>

        <!-- Picker area -->
        <div class="mx-auto lg:hidden">
        <div class="relative">
            <label for="inbox-select" class="sr-only">Choose inbox</label>
            <select id="inbox-select" class="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-600">
            <option value="/open">Open</option>
            <option value="/archived">Archived</option>
            <option value="/assigned">Assigned</option>
            <option value="/flagged">Flagged</option>
            <option value="/spam">Spam</option>
            <option value="/drafts">Drafts</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
            <!-- Heroicon name: solid/chevron-down -->
            <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            </div>
        </div>
        </div>

        <!-- Menu button area -->
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
        <!-- Mobile menu button -->
        <button type="button" class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Heroicon name: outline/menu -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        </div>

        <!-- Desktop nav area -->
        <div class="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
            <div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
            <label for="search" class="sr-only">Search all inboxes</label>
            <input id="search" type="search" placeholder="Search all inboxes" class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                <!-- Heroicon name: solid/search -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
            </div>
            </div>
        </div>
            <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
                <!-- <nav aria-label="Global" class="flex space-x-10">
                    <a href="#" class="text-sm font-medium text-gray-900">
                        Sign Out
                    </a>
                </nav> -->

                <div class="flex items-center space-x-8">
                    <div class="relative inline-block text-left">
                        <button type="button" class="inline-flex items-center space-x-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" id="menu-2" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
                            <div class="text-sm font-medium text-gray-900">
                                John Doe
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Bottom section -->
    <div class="min-h-0 flex-1 flex overflow-hidden">
        <!-- Narrow sidebar-->
        <nav aria-label="Sidebar" class="hidden lg:block lg:flex-shrink-0 lg:bg-gray-800 lg:overflow-y-auto">
        <div class="relative w-20 flex flex-col p-3 space-y-3">
            <a href="#" class="bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                <span class="sr-only">Tickets</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
            </a>

            <a href="#" class="text-gray-400 hover:bg-gray-900 hover:text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                <span class="sr-only">Users</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </a>

            <a href="#" class="text-gray-400 hover:bg-gray-900 hover:text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                <span class="sr-only">Organizations</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </a>
            
            <a href="#" class="text-gray-400 hover:bg-gray-900 hover:text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                <span class="sr-only">Filters</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            </a>

            <a href="#" class="text-gray-400 hover:bg-gray-900 hover:text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                <span class="sr-only">Settings</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </a>
        </div>
        </nav>

        <!-- Main area -->
        <main class="min-w-0 flex-1 border-gray-200 xl:flex">
            <section aria-labelledby="message-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
                <div class="flex-shrink-0 bg-white border-t border-gray-200">
                    <div class="h-16 bg-white px-8 flex flex-col justify-center">
                        <div class="9le hover:text-whitex items-baseline space-x-3">
                            <h2 class="text-ls font-medium text-gray-900">Tickets</h2>
                        </div>
                    </div>
                </div>

                <div class="flex-shrink-0 bg-white border-t border-gray-200">
                    <!-- Toolbar-->
                    <div class="h-16 flex flex-col justify-center">
                        <x-container>
                            <div class="flex space-x-2">
                                <x-button>
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
                            </div>
                        </x-container>
                    </div>
                </div>

                <div class="min-h-0 flex-1 overflow-y-auto">
                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hiddem">
                                    <x-table>
                                        <thead>
                                            <x-table-row>
                                                <x-table-header>
                                                    <input type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
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
                                                    <input type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                                                </x-table-data>

                                                <x-table-data class="flex flex-col">
                                                    <x-link href="#">This is a random ticket subject.</x-link>
                                                    <x-text color="muted">
                                                        Mark Cuban, Dallas Mavericks, Inc.
                                                    </x-text>
                                                </x-table-data>

                                                <x-table-data>
                                                    Client Success
                                                </x-table-data>

                                                <x-table-data>
                                                    <x-badge color="success">
                                                        Active
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
            </section>

            <!-- Left Column -->
            <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
                <div class="h-full relative w-72 border-r border-gray-200 bg-gray-100">
                    <div class="flex-shrink-0 bg-white border-t border-gray-200">
                        <div class="h-16 bg-white px-8 flex flex-col justify-center">
                            <div class="flex items-baseline space-x-3">
                                <h2 class="text-ls font-medium text-gray-900">Filters</h2>
                            </div>
                        </div>
                    </div>

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
                </div>
            </aside>
        </main>
    </div>
    </div>
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