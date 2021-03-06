<template>
    <div class="h-screen overflow-hidden bg-gray-100 flex flex-col">
        <!-- Bottom section -->
        <div class="min-h-0 flex-1 flex overflow-hidden">
            <!-- Narrow sidebar-->
            <nav aria-label="Sidebar" class="hidden lg:block lg:flex-shrink-0 lg:bg-gray-800 lg:overflow-y-auto">
                <div class="relative w-20 flex flex-col p-3 space-y-3">
                    <router-link :to="{ name: 'tickets' }" :class="$route.name == 'tickets' ? 'bg-gray-900':'text-gray-50'" class="text-gray-300 hover:bg-gray-900 hover:text-gray-50 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                        <span class="sr-only">Tickets</span>
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </router-link>

                    <router-link :to="{ name: 'users' }" :class="$route.name == 'users' ? 'bg-gray-900':'text-gray-50'" class="text-gray-300 hover:bg-gray-900 hover:text-gray-50 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                        <span class="sr-only">Users</span>
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </router-link>

                    <router-link :to="{ name: 'organizations' }" :class="$route.name == 'organizations' ? 'bg-gray-900':'text-gray-50'" class="text-gray-300 hover:bg-gray-900 hover:text-gray-50 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                        <span class="sr-only">Organizations</span>
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </router-link>

                    <router-link :to="{ name: 'settings' }" :class="$route.name == 'settings' ? 'bg-gray-900':'text-gray-50'" class="text-gray-300 hover:bg-gray-900 hover:text-gray-50 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
                        <span class="sr-only">Settings</span>
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </router-link>
                </div>
            </nav>

            <!-- Main area -->
            <main class="min-w-0 flex-1 border-gray-200 xl:flex">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>
